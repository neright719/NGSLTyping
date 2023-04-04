import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// 英単語を喋らせる関数
function speakWord(word) {
  const synth = window.speechSynthesis;
  // 音声合成のための発言オブジェクトを作成
  const utterance = new SpeechSynthesisUtterance(word);

  // 音声合成の設定を変更する
  utterance.lang = 'en-US';

  // 発言を実行する
  synth.speak(utterance);
}

function App() {
    const [NGSLData, setNGSLData] = useState();
    const [currentNGSL, setCurrentNGSL] = useState();
    const [word, setWord] = useState("Loading...");
    const [position, setPosition] = useState(0);
    const [isTypeMiss, setIsTypeMiss] = useState(false);
    const [typeMissCount, setTypeMissCount] = useState(0);
    const [isStart, setIsStart] = useState(false);

    const NGSLChoise = (NGSL) => {
      setCurrentNGSL(NGSL[Math.floor(Math.random() * 2857)])
    }

    const handleKeyUp = (e) => {
        if (e.key === currentNGSL.Meanings.charAt(position)) {
            setPosition((prev) => {
                setIsTypeMiss(false);
                const newPosition = prev + 1;
                if (currentNGSL.Meanings.length <= newPosition) {
                    NGSLChoise(NGSLData);
                    return 0;
                }
                return newPosition;
            });
        } else {
            setTypeMissCount((prev) => {
                setIsTypeMiss(true);
                return prev + 1;
            });
        }
    };

    useEffect(() => {
        fetch("/nsgl.json")
            .then((response) => response.json())
            .then((data) => {
                setNGSLData(data);
                NGSLChoise(data);
            });
    }, []);

    useEffect(() => {
      if (currentNGSL !== undefined) {
        // speakWord(currentNGSL.Meanings)
      }
    }, [currentNGSL]);

    return (
        <div className="App">
            <div onKeyUp={(e) => handleKeyUp(e)} tabIndex={0}>
                <p><span>{currentNGSL && currentNGSL.japanese}</span></p>
                <span style={{ color: "black" }}>
                    {currentNGSL && currentNGSL.Meanings.slice(0, position)}
                </span>
                <span style={{ color: isTypeMiss ? "red" : "blue" }}>
                    {currentNGSL && currentNGSL.Meanings.charAt(position)}
                </span>
                <span style={{ color: "#ccc" }}>
                    {currentNGSL && currentNGSL.Meanings.slice(position + 1)}
                </span>
            </div>
            <div>
                <span>miss:{typeMissCount}</span>
            </div>
        </div>
    );
}

export default App;
