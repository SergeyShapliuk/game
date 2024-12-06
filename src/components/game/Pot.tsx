import flame1 from "../../assets/flame1.webp";
import flame2 from "../../assets/flame2.webp";
import {motion} from "motion/react";
import {useEffect, useState} from "react";
import potTop from "../../assets/pot-top.webp";
import classes from "./Game.module.css";
import potBottom from "../../assets/pot-bottom.webp";
import * as React from "react";
import useScreenSize from "../../hooks/useScreenSize";

const Pot = React.forwardRef<HTMLDivElement, { row: number, collectedPot: string | undefined }>(({
                                                                                                     row,
                                                                                                     collectedPot
                                                                                                 }, ref) => {
    const {responseSize} = useScreenSize();
    const images = [
        flame1,
        flame2
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length); // Зацикливание индексов
        }, 100);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <motion.div ref={ref} animate={{left: `${row - 2.5}%`}} transition={{type: "tween"}}
                    className={classes.plane} style={{width: responseSize(70), height: responseSize(39)}}>
            <img src={potTop} alt=""
                 className={classes.plane}
                 style={{width: "100%"}}/>
            <img src={potBottom} alt="" className={classes.plane}
                 style={{width: "100%", zIndex: 2}}/>
            <motion.img src={collectedPot} alt="" className={classes.plane}
                        transition={{type: "tween"}}
                        style={{
                            width: responseSize(38),
                            bottom: responseSize(15),
                            left: "50%",
                            transform: "translateX(-50%)",
                            visibility: collectedPot ? "visible" : "hidden",
                            zIndex: 1
                        }}/>
            <motion.div className={classes.plane}
                        key={currentImageIndex}
                // animate={{left: `${row}%`}}
                        style={{
                            width: responseSize(45),
                            height: responseSize(55),
                            left: responseSize(12),
                            bottom: responseSize(-40),
                            backgroundImage: `url(${images[currentImageIndex]})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}
                        transition={{type: "tween", duration: 1}}
            />
        </motion.div>
    );
});

export default Pot;
