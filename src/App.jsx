import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Grid, Paper, Button, Stack } from "@mui/material";
import Play from "./components/Play";
import Standby from "./components/Standby";
import Result from "./components/Result";
import Countdown from "./components/Countdonw";
import ProgressBar from "./components/ProgressBar";
import Settings from "./components/Settings";
import json from "./assets/ngsl.json";

function App() {
    const [NGSLData, setNGSLData] = useState(json); // 単語一覧
    const [currentNGSL, setCurrentNGSL] = useState(); // ランダムに選択された単語の情報
    const [position, setPosition] = useState(0); // 入力位置
    const [isTypeMiss, setIsTypeMiss] = useState(false); // タイプミスのフラグ
    const [typeMissCount, setTypeMissCount] = useState(0); // タイプミスした回数
    const [gameState, setGameState] = useState("standby"); // ゲームの状態
    const [playTime, setPlayTime] = useState(60 * 3); // ゲームのプレイ時間
    const [isVoicePlay, setIsVoicePlay] = useState(false); // 音声を再生するかのフラグ
    const [volume, setVolume] = useState(0.3); // 音声のボリューム
    const [isMaskMode, setMaskMode] = useState(true); // 文字伏せを行うかどうかのフラグ
    const [typedWords, setTypedWords] = useState(0); // 入力を終えた単語の数

    const [height, setHeight] = useState(0);

    //keyupイベントを監視している要素にフォーカスを当てるための参照
    const Ref = useRef();
    //高さアニメーション用のref
    const HRef = useRef();

    // 単語一覧からランダムに単語を選択する
    const NGSLChoise = (NGSL) => {
        setCurrentNGSL(NGSL[Math.floor(Math.random() * NGSL.length)]);
    };

    const initGameState = () => {
        setGameState("settings");
        setTypeMissCount(0);
        setTypedWords(0);
        setPosition(0);
        setIsTypeMiss(false);
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
            initGameState();
            return;
        }

        if (e.key === " ") {
            if (gameState === "standby") {
                setGameState("settings");
                return;
            }
            if (gameState === "result") {
                initGameState();
                return;
            }
        }

        if (gameState === "play") {
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

    //初回読み込み時、単語データが入ったjsonファイルを取得する
    useEffect(() => {
        //jsonファイルを取得し、jsonをstateへ格納
        // fetch("./src/assets/ngsl.json")
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setNGSLData(data);
        //         NGSLChoise(data);
        //     });
        NGSLChoise(json);
    }, []);

    //単語の切り替わり時、ゲーム開始時に音声を再生する
    useEffect(() => {
        if (gameState === "play" && isVoicePlay) {
            speakWord(currentNGSL.Meanings);
        }
        //keyupを監視している要素にフォーカスする
        Ref.current.focus();
    }, [gameState, isVoicePlay, currentNGSL]);

    useEffect(() => {
        setHeight(HRef.current.offsetHeight);
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
                            {gameState === "play" &&
                                playTime !== "infinity" && (
                                    <ProgressBar
                                        timer={playTime}
                                        callback={() => {
                                            setGameState("result");
                                        }}
                                    />
                                )}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Paper
                            sx={{
                                overflow: "hidden",
                                transition: "all 0.3s ease-in-out",
                                height: `${height}px`,
                                minHeight: `${height}px`,
                                maxHeight: `${height}px`,
                            }}
                        >
                            <div ref={HRef} style={{ padding: "2em" }}>
                                {gameState === "standby" && (
                                    <Standby setGameState={setGameState} />
                                )}
                                {gameState === "settings" && (
                                    <Settings
                                        speakWord={speakWord}
                                        setGameState={setGameState}
                                        isVoicePlay={isVoicePlay}
                                        setIsVoicePlay={setIsVoicePlay}
                                        setVolume={setVolume}
                                        setPlayTime={setPlayTime}
                                        setMaskMode={setMaskMode}
                                    />
                                )}
                                {gameState === "ready" && (
                                    <Countdown setGameState={setGameState} />
                                )}
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
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container item justifyContent="space-between">
                    <Stack xs={2} spacing={2}>
                        <Stack direction="row" spacing={2}>
                            {gameState === "play" && (
                                <Button
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
                            )}
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default App;
