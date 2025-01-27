import { useEffect, useState } from 'react'
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
          <Header inputValue = {inputValue} setInputValue = {setInputValue} handleSubmit = {handleSubmit} />
          <Word wordInfo={wordInfo} searchInput = {searchInput}/>
        </div>

    </>
  )
}

function Header({inputValue, setInputValue, handleSubmit}) {
  const [fontType, setFontType] = useState('Inter');

  useEffect(()=> {
    document.body.style.fontFamily = fontType;
  },[fontType])
  return (
    <>
    <div className="header">

      <img src="./img/book-icon.svg" alt="" />
      <div className="header-right">

        <div className="dropdown-area">

          <button className='dropdown-button'>
            {fontType ==='Inter' ? 'Sans Serif' : 
              fontType ==='Lora' ? 'Serif' :
              fontType ==='Inconsolata' ? 'Mono' : 'Sans Serif' 
            }
            <img src="./img/arrow-icon.svg" alt="Arrow" />
          </button>

          <div className="dropdown-menu">
            <div className="dropdown-option" onClick={() => setFontType('Inter')}>Sans Serif</div>
            <div className="dropdown-option" onClick={() => setFontType('Lora')}>Serif</div>
            <div className="dropdown-option" onClick={() => setFontType('Inconsolata')}>Mono</div>
          </div>

        </div>
          <input className="switch" type="checkbox" id="themeChange" />
          <span><img src="./img/dark-theme.svg" alt="Dark Mode Icon" /></span>

      </div>
    </div>
      <form onSubmit= {handleSubmit} autoComplete='off'>
        <input onChange={(e) => setInputValue(e.target.value)} className="inputSearch" type="text" placeholder="aranacak kelime" name="filteredWord" value={inputValue} />
      </form>
    </>
  )
}

function Word({wordInfo}) {
  return(
    <>
      {wordInfo?.length > 0 && 
        <div className="word-container">
          <div className="word-pronounciation">
            <div className="pronounciation-text">
              <h3 className='word-text'>{wordInfo[0]?.word}</h3>
              <p className='word-pron-text'>{wordInfo[0]?.phonetics[1]?.text}</p>
            </div>
            <img onClick={() => {
                const audioUrl = wordInfo[0]?.phonetics?.find(phonetic => phonetic.audio)?.audio;
                const fullAudioUrl = audioUrl?.startsWith("//") ? `https:${audioUrl}` : audioUrl;
                if (fullAudioUrl) {
                  const audio = new Audio(fullAudioUrl);
                  audio.play();
                }
              }} src="./img/play-icon.svg" alt="Play Icon" />
          </div>
          <div className="word-meanings-first">
            {wordInfo[0]?.meanings[0] &&
            (
              <>
                <div className="word-type">
                  <h1>{wordInfo[0]?.meanings[0].partOfSpeech}</h1>
                  <span></span>
                </div>
                  <p className='meaning-text'>Meaning</p>  
                <ul>
                  {wordInfo[0]?.meanings[0]?.definitions.map((x,i) => (
                  <li key={i}>{x.definition}</li>
              ))}
                </ul>
                <p>Synonyms</p>
             
              </>
            )
            }
          </div>
          <div className="word-meanings-second">
            {wordInfo[0]?.meanings[1] &&
            (
              <>
                 <div className="word-type">
                  <h1>{wordInfo[0]?.meanings[0].partOfSpeech}</h1>
                  <span></span>
                </div>
                <p className='meaning-text'>Meaning</p>  

                <ul>
                  {wordInfo[0]?.meanings[1]?.definitions.map((x,i) => (
                  <li key={i}>{x.definition}</li>
              ))}
                </ul>
                <p>Synonyms</p>
                
          
              </>
            )
            }
          </div>
          <div className="word-meanings-third">
            {wordInfo[0]?.meanings[2] &&
            (
              <>
                 <div className="word-type">
                  <h1>{wordInfo[0]?.meanings[0].partOfSpeech}</h1>
                  <span></span>
                </div>
                <p className='meaning-text'>Meaning</p>  

                <ul>
                  {wordInfo[0]?.meanings[2]?.definitions.map((x,i) => (
                  <li key={i}>{x.definition}</li>
              ))}
                </ul>
                <p>Synonyms</p>
          
              </>
            )
            }
          </div>
        </div>          


      
      }
    
    </>
  )
}


export default App;
