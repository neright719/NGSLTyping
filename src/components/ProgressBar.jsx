import React, { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";

// 残り時間をhh:mm:ss形式で返す関数
const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
    const seconds = timeInSeconds - hours * 3600 - minutes * 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const ProgressBar = ({ timer, callback }) => {
    const [countdown, setCountdown] = useState(timer);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        const timerID = setInterval(() => {
            setCountdown((t) => {
                if (t > 0) {
                    return t - 1;
                } else {
                    clearInterval(timerID);
                    setIsEnd(true);
                }
            });
        }, 1000);

        return () => clearInterval(timerID);
    }, []);

    useEffect(() => {
        if (isEnd) {
            callback();
        }
    }, [isEnd]);

    return (
        <div>
            <div style={{ textAlign: "right" }}>{formatTime(countdown)}</div>
            <LinearProgress
                variant="determinate"
                value={(countdown / timer) * 100}
            />
        </div>
    );
};
