import React, { useState, useEffect } from "react";

export default function Dictionary() {
  const [word, setWord] = useState("");
  const [data, setData] = useState(null);
  const [audio, setAudio] = useState(null);
  const [infoText, setInfoText] = useState("Enter a word to search");

  const fetchData = (word) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        if (result.title) {
          setInfoText(`Oops :o we can't find "${word}".`);
          setData(null);
        } else {
          setInfoText("Word found!");
          setData(result[0]);
          setAudio(new Audio(result[0].phonetics[0].audio));
        }
      })
      .catch(() => {
        setInfoText(`Oops :o we can't find "${word}".`);
        setData(null);
      });
  };

  const playSound = () => {
    if (audio) {
      audio.play();
    }
  };

  useEffect(() => {
    if (word) {
      fetchData(word);
    }
  }, [word]);

  return (
    <div className="container">
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Search for a word..."
        className="search"
      />
     
      <div className="info-text">{infoText}</div>
      {data && (
        <div className="results">
          <div className="word">
            <span id="sound" className="sound" onClick={playSound}>
        🔊 {data.word}
      </span>
      <p></p>
            <span className="type">{data.meanings[0].partOfSpeech}</span>
          </div>
          <div className="meaning">
            <span>{data.meanings[0].definitions[0].definition}</span>
          </div>
        </div>
      )}
    </div>
  );
}