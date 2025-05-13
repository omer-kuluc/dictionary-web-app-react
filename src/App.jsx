import { useEffect, useState, useRef, createContext, useContext } from 'react'
import './App.css'



function App() {
  const [searchInput, setSearchInput] = useState('');
  const [wordInfo, setWordInfo] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);


  useEffect(() => {
    async function getData() {
      if (searchInput) {
        try {
          const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`);
          if (response.ok) {
            const data = await response.json();
            setWordInfo(data);
          } else {
            setWordInfo(null);
          }
        } catch (error) {
          console.error("Fetch error:", error);
          setWordInfo(null);
        }
      }
    }
    getData();
  }, [searchInput]);



  async function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim() === "") {
      setIsEmpty(true);
      return;
    }
    setIsEmpty(false);
    setSearchInput(inputValue)
  }

  return (
    <>
      <div className="container">
        <div className="inner-container">
          <Header inputValue={inputValue} setInputValue={setInputValue} handleSubmit={handleSubmit}
            isEmpty={isEmpty} />
          <Word wordInfo={wordInfo} searchInput={searchInput} setSearchInput={setSearchInput}
            setInputValue={setInputValue} />
        </div>
      </div>

    </>
  )
}

function Header({ inputValue, setInputValue, handleSubmit, isEmpty }) {
  const [fontType, setFontType] = useState('Inter');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [darkMode, setDarkMode] = useState(localStorage.theme === "true" ? true : false);

  useEffect(() => {
    localStorage.theme = darkMode;
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.removeAttribute("class");
    }
  }, [darkMode]);



  useEffect(() => {
    document.body.style.fontFamily = fontType;
  }, [fontType]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="header">
        <img className='book-icon' src="./img/book-icon.svg" alt="" />
        <div className="header-right">
          <div className="dropdown-area" ref={dropdownRef}>
            <button className='dropdown-button' onClick={() => setIsOpen(prev => !prev)}>
              <span>
                {fontType === 'Inter' ? 'Sans Serif' :
                  fontType === 'Lora' ? 'Serif' :
                    fontType === 'Inconsolata' ? 'Mono' : 'Sans Serif'
                }
              </span>
              <img src="./img/arrow-icon.svg" alt="Arrow" />
            </button>

            {isOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-option" onClick={() => { setFontType('Inter'); setIsOpen(false); }}>Sans Serif</div>
                <div className="dropdown-option" onClick={() => { setFontType('Lora'); setIsOpen(false); }}>Serif</div>
                <div className="dropdown-option" onClick={() => { setFontType('Inconsolata'); setIsOpen(false); }}>Mono</div>
              </div>
            )}
          </div>

          <input className="switch" type="checkbox" id="themeChange" checked={darkMode}
            onChange={() => setDarkMode(!darkMode)} />
          <span onClick={() => setDarkMode(!darkMode)}>
            <img className='moon-icon' src={darkMode ? "./img/light-moon.svg" : "/img/dark-moon.svg"}
              alt="Theme Mode Icon" /></span>
        </div>
      </div>

      <form onSubmit={handleSubmit} autoComplete='off'>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          className={`inputSearch ${isEmpty ? 'input-error' : ''}`}
          type="text"
          placeholder="aranacak kelime"
          name="filteredWord"
          value={inputValue}
        />
        {isEmpty && <p className='error-message'>Whoops, can’t be empty…</p>}
      </form>
    </>
  );
}

function Word({ wordInfo, setSearchInput, setInputValue }) {
  return (
    <>
      {wordInfo === null && (
        <div className="not-found-container">
          <p className='not-found-emoji'>🙄</p>
          <h2 className="not-found-title">No Definitions Found</h2>
          <p className="not-found-message">
            Sorry pal, we couldn't find definitions for the word you were looking for.
            You can try the search again at later time or head to the web instead.
          </p>
        </div>
      )}
      {wordInfo?.length > 0 && (
        <div className="word-container">
          <div className="word-pronounciation">
            <div className="pronounciation-text">
              <h3 className="word-text">{wordInfo[0]?.word}</h3>
              <p className="word-pron-text">{wordInfo[0]?.phonetics[1]?.text}</p>
            </div>
            <img
              onClick={() => {
                const audioUrl = wordInfo[0]?.phonetics?.find(phonetic => phonetic.audio)?.audio;
                const fullAudioUrl = audioUrl?.startsWith("//") ? `https:${audioUrl}` : audioUrl;
                if (fullAudioUrl) {
                  const audio = new Audio(fullAudioUrl);
                  audio.play();
                }
              }}
              src="./img/play-icon.svg"
              alt="Play Icon"
            />
          </div>

          {wordInfo[0]?.meanings.map((meaning, index) => (
            <div key={index} className={`word-meanings-${index + 1}`}>
              <div className="word-type">
                <h1>{meaning.partOfSpeech}</h1>
                <span></span>
              </div>
              <p className="meaning-text">Meaning</p>
              <div className="meaning-items-section">
                <ul className='meaning-items'>
                  {meaning.definitions.map((def, i) => (
                    <li className='meaning-item' key={i}>
                      <p className='word-definition'>{def.definition}</p>
                      {def.example && (
                        <p className='example-sentence'>&#8220;{def.example}&#8221;</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {meaning.synonyms && meaning.synonyms.length > 0 && (
                <div className='synonym-section'>
                  <p>Synonyms</p>
                  <ul className='synonym-words-area'>
                    {meaning.synonyms.map((synonym, i) => (
                      <li
                        key={i}
                        className="synonym-link"
                        onClick={() => {
                          setSearchInput(synonym);
                          setInputValue(synonym);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        {synonym}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
          <span className='end-of-line'></span>
          <div className="footer-part">
            <p>Source</p>
            <div className="source-link-section">
              <a href={`https://en.wiktionary.org/wiki/${wordInfo[0]?.word}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {`https://en.wiktionary.org/wiki/${wordInfo[0]?.word}`}
                <img src="/img/source-link-icon.svg" alt="source icon" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}



export default App;
