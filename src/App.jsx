import { useEffect, useRef, useState } from "react";
import "./App.css";
import {
    Grid,
    Paper,
    Button,
    Stack,
    Slider,
    LinearProgress,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import Play from "./components/Play";
import Standby from "./components/Standby";
import Result from "./components/Result";
import Countdown from "./components/Countdonw";

function App() {
    const [NGSLData, setNGSLData] = useState();
    const [currentNGSL, setCurrentNGSL] = useState();
    const [position, setPosition] = useState(0);
    const [isTypeMiss, setIsTypeMiss] = useState(false);
    const [typeMissCount, setTypeMissCount] = useState(0);
    const [isVoicePlay, setIsVoicePlay] = useState(false);
    const [isMaskMode, setMaskMode] = useState(true);
    const [volume, setVolume] = useState(0.3);
    const [typedWords, setTypedWords] = useState(0);
    const [progress, setProgress] = useState(0);
    const [timelimit, setTimelimit] = useState(60 * 1); //1分
    const [gameState, setGameState] = useState("standby"); // play standby pause result ready

    //keyupイベントを監視している要素にフォーカスを当てるための参照
    const Ref = useRef();

    const NGSLChoise = (NGSL) => {
        setCurrentNGSL(NGSL[Math.floor(Math.random() * NGSL.length)]);
    };

    const initGameState = () => {
        setGameState("standby");
        setTypeMissCount(0);
        setTypedWords(0);
        setPosition(0);
        setProgress(0);
        NGSLChoise(NGSLData);
    };

    // 英単語を喋らせる関数
    const speakWord = (word) => {
        const synth = window.speechSynthesis;
        // 音声合成のための発言オブジェクトを作成
        const utterance = new SpeechSynthesisUtterance(word);

        // 音声合成の設定を変更する
        utterance.lang = "en-US";
        utterance.volume = volume;

        // 発言を実行する
        synth.speak(utterance);
    };

    const handleKeyUp = (e) => {
        if (e.key === "Escape") {
            setGameState("standby");
        }
        //開始判定
        if (gameState === "standby" && e.key === " ") {
            setGameState("ready");
        } else if (gameState === "result" && e.key === " ") {
            initGameState();
            setGameState("standby");
        } else if (gameState === "play") {
            if (e.key === currentNGSL.Meanings.charAt(position)) {
                //入力位置を加算する(もし文字数を入力位置が超えていたら0をsetし、currentNGSLに新たな単語をsetする)
                setPosition((prev) => {
                    setIsTypeMiss(false);
                    const newPosition = prev + 1;
                    if (currentNGSL.Meanings.length <= newPosition) {
                        setTypedWords((prevWords) => prevWords + 1);
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
        }
    };

    // 音声を聴くボタンのイベント
    const voicePlayOnClick = (e) => {
        Ref.current.focus();
        setIsVoicePlay(!isVoicePlay);
    };

    // 音量スライダーのイベント
    const sliderOnChange = (e) => {
        setVolume(e.target.value / 100);
    };

    //初回読み込み時、単語データが入ったjsonファイルを取得する
    useEffect(() => {
        //jsonファイルを取得し、jsonをstateへ格納
        fetch("/nsgl.json")
            .then((response) => response.json())
            .then((data) => {
                setNGSLData(data);
                NGSLChoise(data);
            });
        //keyupを監視している要素にフォーカスする
        Ref.current.focus();
    }, []);

    //ゲーム開始時、発音を聴くボタンが押されたとき、次の単語へ進んだ時、音声を再生する
    useEffect(() => {
        if (gameState === "play") {
            if (isVoicePlay === true) {
                speakWord(currentNGSL.Meanings);
            }
        } else {
        }
    }, [gameState, isVoicePlay, currentNGSL]);

    useEffect(() => {
        //制限時間
        if (gameState === "play") {
            let counter = 0;
            const timerID = setInterval(() => {
                counter++;
                if (counter >= timelimit) {
                    clearInterval(timerID);
                    setGameState("result");
                }
                console.log(counter)
                setProgress((counter / timelimit) * 100);
            }, 1000);
        }

        if (gameState === "ready") {
            
        }
    }, [gameState]);

    return (
        <Grid
            onKeyUp={(e) => handleKeyUp(e)}
            tabIndex={0}
            ref={Ref}
            container
            justifyContent="center"
            spacing={2}
        >
            <Grid item container direction="column" xs={8} spacing={2}>
                <Grid item container direction="column" spacing={1}>
                    <Grid item container justifyContent="right">
                        <Grid item xs={3}>
                            <LinearProgress
                                variant="determinate"
                                value={progress}
                            />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Paper>
                            {gameState === "ready" && <Countdown setGameState={setGameState}/>}
                            {gameState === "standby" && <Standby />}
                            {gameState === "play" && (
                                <Play
                                    typeMissCount={typeMissCount}
                                    typedWords={typedWords}
                                    currentNGSL={currentNGSL}
                                    position={position}
                                    isTypeMiss={isTypeMiss}
                                    isMaskMode={isMaskMode}
                                />
                            )}
                            {gameState === "result" && (
                                <Result
                                    typeMissCount={typeMissCount}
                                    typedWords={typedWords}
                                />
                            )}
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container item justifyContent="space-between">
                    <Stack xs={2} spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <Button
                                sx={{
                                    minWidth: "10em",
                                }}
                                variant="contained"
                                onClick={voicePlayOnClick}
                            >
                                {isVoicePlay ? (
                                    <StopCircleIcon />
                                ) : (
                                    <PlayCircleIcon />
                                )}
                                {isVoicePlay ? "停止する" : "発音を聴く"}
                            </Button>
                            <Button
                                disabled={gameState === "play" ? false : true}
                                variant="contained"
                                onClick={(e) => {
                                    if (gameState === "play") {
                                        Ref.current.focus();
                                        speakWord(currentNGSL.Meanings);
                                    }
                                }}
                            >
                                発音を確認する
                            </Button>
                        </Stack>
                        <Stack direction="row" xs={2} alignItems="center">
                            <VolumeDownIcon />
                            <Slider
                                defaultValue={30}
                                onChange={sliderOnChange}
                                aria-label="Volume"
                            />
                            <VolumeUpIcon />
                        </Stack>
                    </Stack>
                    <Stack>
                        <Button
                            onClick={(e) => setMaskMode(!isMaskMode)}
                            variant="contained"                        >
                            {isMaskMode ? "マスクを外す" : "マスクモード"}
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default App;
