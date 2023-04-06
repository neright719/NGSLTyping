import React from "react";
import { Tooltip } from '@mui/material';


const Standby = () => {
    const tooltip = <div>
        <p>NGSL単語リストとは、New General Service Listと呼ばれ、2013年3月に発表された英語の中核語彙2818語のリストです。</p>
        <p>NGSLの単語は英語の第二言語学習者にとって最も重要な高頻度単語を表しており、一般的な英語の文章で使用される英単語の90%以上をカバーできます。</p>
    </div>
    return (
        <div>
            <div style={{fontSize: "16px", padding:"2em"}}>
                <p>このサイトでは英単語の記憶を目的とし、<Tooltip title={tooltip} placement="top"><a href="#">NGSL単語リスト</a></Tooltip>からランダムで選択された英単語のタイピングを行います。</p>
                <p>タイピング画面では、日本語訳が表示されており、入力する英単語は入力中の1文字以降は伏せられています。</p>
                <p>そのため、入力する英単語を知らない場合は1文字ずつ確認しながら打つことになります。</p>
                <p>「素早く入力できる=英単語を覚えている」ということですので、素早く入力できるよう繰り返し練習しましょう。</p>
                <p>左下の「発音を聴く」を押すと単語が切り替わるたびに音声が再生され、リスニングも同時学習が可能です。</p>
                <p style={{ textAlign: "center", fontSize: "20px", marginTop: "30px" }}>[スペースキー]で始める</p>
            </div>
        </div>
    );
};

export default Standby;
