import React from "react";

const Result = ({ typeMissCount, typedWords }) => {
    return (
        <div style={{ padding: "5em", textAlign:"center" }}>
            <p style={{ fontSize: "40px" }}>
                <span>入力ミス：{typeMissCount}回</span>
            </p>
            <p
                style={{
                    fontSize: "38px",
                }}
            >
                <span>入力した単語：{typedWords}個</span>
            </p>
            <p style={{ fontSize: "20px", marginTop: "30px" }}>[スペースキー]で続ける</p>
        </div>
    );
};

export default Result;
