import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Countdown = ({ setGameState }) => {
    const [count, setCount] = useState(3);
    const [isReady, setIsReady] = useState(false);

    const countdownVariants = {
        start: { y: "-20px" },
        end: { y: "20px" },
    };

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
        <motion.div
            variants={countdownVariants}
            initial="start"
            animate="end"
            key={count}
        >
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
        </motion.div>
    );
};

export default Countdown;
