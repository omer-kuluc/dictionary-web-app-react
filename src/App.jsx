import { useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [wordInfo, setWordInfo] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    async function getData() {
      if (searchInput) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`);
        if (response.ok) {
          const data = await response.json();
          setWordInfo(data); // Başarılı olursa state'e yaz
        } else {
          setWordInfo(null); // Başarısız olursa null ata
        }
      }
    }
    getData(); // Veriyi çek
  }, [searchInput]);



  async function handleSubmit(e) {
    e.preventDefault();
    setSearchInput(inputValue)
  }

  return (
    <>
      <div className="container">
        <div className="inner-container">
          <Header inputValue={inputValue} setInputValue={setInputValue} handleSubmit={handleSubmit} />
          <Word wordInfo={wordInfo} searchInput={searchInput} setSearchInput={setSearchInput}
            setInputValue={setInputValue} />
        </div>
      </div>

    </>
  )
}

function Header({ inputValue, setInputValue, handleSubmit }) {
  const [fontType, setFontType] = useState('Inter');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

          <input className="switch" type="checkbox" id="themeChange" />
          <span><img src="./img/dark-theme.svg" alt="Dark Mode Icon" /></span>
        </div>
      </div>

      <form onSubmit={handleSubmit} autoComplete='off'>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          className="inputSearch"
          type="text"
          placeholder="aranacak kelime"
          name="filteredWord"
          value={inputValue}
        />
      </form>
    </>
  );
}

function Word({ wordInfo, setSearchInput, setInputValue }) {
  return (
    <>
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
