import React from "react";
import ngslPosToJapanesePos from "../util/ngslPosToJapanesePos";

const Play = ({
    typeMissCount,
    typedWords,
    currentNGSL,
    position,
    isTypeMiss,
    isMaskMode,
}) => {
    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ textAlign: "right" }}>
                <span style={{ marginRight: "1em" }}>
                    入力ミス:{typeMissCount}
                </span>
                <span>単語数:{typedWords}</span>
            </div>
            <div style={{ padding: "5em" }}>
                <p style={{ fontSize: "40px" }}>
                    <span>{currentNGSL && currentNGSL["J Translation"]}</span>
                </p>
                <p>
                    <span>
                        {currentNGSL &&
                            ngslPosToJapanesePos[currentNGSL["POS"]]}
                    </span>
                </p>
                <p
                    style={{
                        fontSize: "38px",
                        fontWeight: "bold",
                        letterSpacing: "0.1em",
                    }}
                >
                    <span style={{ color: "black" }}>
                        {currentNGSL &&
                            currentNGSL.Meanings.toLowerCase().slice(
                                0,
                                position
                            )}
                    </span>
                    <span
                        style={{
                            color: isTypeMiss ? "red" : "blue",
                        }}
                    >
                        {currentNGSL &&
                            currentNGSL.Meanings.toLowerCase().charAt(position)}
                    </span>
                    <span style={{ color: "#ccc" }}>
                        {currentNGSL && isMaskMode
                            ? "".padStart(
                                  currentNGSL.Meanings.toLowerCase().slice(
                                      position + 1
                                  ).length,
                                  "_"
                              )
                            : currentNGSL.Meanings.toLowerCase().slice(
                                  position + 1
                              )}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Play;
