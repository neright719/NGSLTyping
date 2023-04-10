import React, { useEffect, useState } from "react";
import { Tooltip, Button } from "@mui/material";

const Standby = ({ setGameState }) => {

    const [isEnter, setIsEnter] = useState(false);
    useEffect(() => {
        if (isEnter) {
            setGameState("settings");
        }
    }, [isEnter])

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
            <div style={{ fontSize: "16px" }}>
                <p>
                    このサイトでは英単語の記憶を目的とし、
                    <Tooltip title={tooltip} placement="top">
                        <a href="#">NGSL単語リスト</a>
                    </Tooltip>
                    からランダムで選択された英単語のタイピングを行います。
                </p>
                <p>
                    タイピング画面では日本語訳と、訳に当てはまる英単語の最初の1文字が表示されています。
                </p>
                <p>
                    英単語は1文字入力するごとに、その次の1文字が表示されていく仕組みです。
                </p>
                <p>
                    そのため、入力する英単語を知らない場合は1文字ずつ確認しながら打つことになります。
                </p>
                <p>
                    「素早く入力できる=英単語を覚えている」状態を目指し、素早く入力できるよう繰り返し練習しましょう。
                </p>
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "20px",
                        marginTop: "30px",
                    }}
                >
                    <Button onClick={(e) => {
                        setIsEnter(true);
                    }}>進む</Button>
                </p>
            </div>
        </div>
    );
};

export default Standby;
