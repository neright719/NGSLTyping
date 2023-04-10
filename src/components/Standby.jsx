import React, { useEffect, useState } from "react";
import { Tooltip, Button } from "@mui/material";

const Standby = ({ setGameState }) => {
    const [isEnter, setIsEnter] = useState(false);
    useEffect(() => {
        if (isEnter) {
            setGameState("settings");
        }
    }, [isEnter]);

    const tooltip = (
        <div>
            <p>
                NGSL単語リストとは、New General Service
                Listと呼ばれ、2013年3月に発表された英語の中核語彙2818語のリストです。
            </p>
            <p>
                NGSLの単語は英語の第二言語学習者にとって最も重要な高頻度単語を表しており、一般的な英語の文章の中でよく使われる英単語の90%以上をカバーできます。
            </p>
        </div>
    );
    return (
        <div>
            <div style={{ fontSize: "16px", lineHeight: "1.7em" }}>
                <p>
                    このサイトでは、
                    <Tooltip title={tooltip} placement="top">
                        <a href="#">NGSL単語リスト</a>
                    </Tooltip>
                    からランダムで選ばれた英単語をタイピングすることで、英単語の記憶を目的としています。
                </p>
                <p>
                    タイピング画面では、日本語訳と英単語の最初の1文字が表示されます。
                </p>
                <p>
                    英単語は最初の1文字以降は伏せられており、入力すると次に入力する1文字が表示されます。
                </p>
                <p>
                    そのため、日本語訳に対応する英単語を知らない場合は1文字ずつ確認しながら打つ必要があります。
                </p>
                <p>
                    「素早く入力できる＝英単語を覚えている」状態を目指し、繰り返し練習して、素早く入力できるようになりましょう。
                </p>
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "20px",
                        marginTop: "30px",
                    }}
                >
                    <Button
                        onClick={(e) => {
                            setIsEnter(true);
                        }}
                    >
                        進む
                    </Button>
                </p>
            </div>
        </div>
    );
};

export default Standby;
