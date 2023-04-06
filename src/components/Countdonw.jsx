import React, { useEffect, useState } from "react";

const Countdown = ({ setGameState }) => {
    const [count, setCount] = useState(3);
    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        const timerID = setInterval(() => {
            setCount((count) => {
                if (count - 1 <= 0) {
                    clearInterval(timerID);
                    setIsReady(true);
                }
                return count - 1;
            });
        }, 1000);
    }, []);

    useEffect(() => {
        if (isReady === true) {
            setGameState("play");
        }
    }, [isReady]);

    return (
        <div>
            <p
                style={{
                    textAlign: "center",
                    padding: "2em",
                    fontSize: "30px",
                    fontWeight: "bold",
                }}
            >
                {count}
            </p>
        </div>
    );
};

export default Countdown;
