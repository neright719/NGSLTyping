import React, { useEffect, useState } from "react";
import {
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Checkbox,
    Button,
    FormGroup,
    Slider,
    Stack,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";

const Settings = ({
    speakWord,
    setGameState,
    isVoicePlay,
    setIsVoicePlay,
    setVolume,
    setPlayTime,
    setMaskMode,
    isShowJapanese,
    setIsShowJapanese,
}) => {
    const changeVoicePlay = (e) => {
        setIsVoicePlay((v) => !v);
    };

    const changePlayTime = (e) => {
        setPlayTime(e.target.value);
    };

    const changeHideWord = (e) => {
        setMaskMode(e.target.checked);
    };

    // 音量スライダーのイベント
    const sliderOnChange = (e) => {
        setVolume(e.target.value / 100);
    };

    const changeGameState = () => {
        setGameState("ready");
    };

    return (
        <div>
            <h3 style={{ marginBottom: "1em" }}>設定</h3>
            <Grid container direction="column" gap={3}>
                <Grid container>
                    <Grid item xs={6}>
                        <h4>プレイ時間</h4>
                        <FormControl>
                            <RadioGroup
                                defaultValue={60 * 3}
                                onChange={(e) => changePlayTime(e)}
                            >
                                <FormControlLabel
                                    value={60 * 1}
                                    control={<Radio />}
                                    label="1分"
                                />
                                <FormControlLabel
                                    value={60 * 3}
                                    control={<Radio />}
                                    label="3分"
                                />
                                <FormControlLabel
                                    value={60 * 5}
                                    control={<Radio />}
                                    label="5分"
                                />
                                <FormControlLabel
                                    value="infinity"
                                    control={<Radio />}
                                    label="制限時間なし(Escキーで中断)"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid container item xs={6}>
                        <Grid container direction="column">
                            <Grid item>
                                <FormGroup>
                                    <h4>音声</h4>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isVoicePlay}
                                                onChange={changeVoicePlay}
                                            />
                                        }
                                        label="音声を再生する"
                                    />
                                    <Stack direction="row">
                                        <VolumeDownIcon />
                                        <Slider
                                            defaultValue={30}
                                            onChange={sliderOnChange}
                                            aria-label="Volume"
                                        />
                                        <VolumeUpIcon />
                                    </Stack>
                                    <p style={{ textAlign: "right" }}>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                speakWord("test");
                                            }}
                                        >
                                            音量を確認する
                                        </a>
                                    </p>
                                </FormGroup>
                            </Grid>
                            <Grid item>
                                <h4>タイピング</h4>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                defaultChecked
                                                onChange={changeHideWord}
                                            />
                                        }
                                        label="入力文字以外を隠す"
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <div>
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "20px",
                        marginTop: "30px",
                    }}
                >
                    <Button variant="contained" onClick={changeGameState}>
                        始める
                    </Button>
                </p>
            </div>
        </div>
    );
};

export default Settings;
