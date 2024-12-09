import {motion} from "motion/react";
import stars from "../../assets/stars1.webp";
import bowl2 from "../../assets/bowl2.webp";
import bowl1 from "../../assets/bowl1.webp";
import tomato from "../../assets/bg-tomato.webp";
import carrot from "../../assets/bg-carrot.webp";
import useScreenSize from "../../hooks/useScreenSize";
import {useService} from "../../common/ context/ServiceProvider";
import Stars from "./Stars";


function Effect() {
    const {isAnimation} = useService();
    const {screenSize, responseSize} = useScreenSize();


    return (
        <>
            {isAnimation ? (
                <>
                    <Stars/>
                    <motion.img src={bowl2} alt={""}
                        // initial={{x: responseSize(-185), y: responseSize(73)}}
                                animate={{
                                    x: ["0%", "-10%", "10%", "-10%", "0%"],
                                    y: [-screenSize.height / 4, screenSize.height]
                                }}
                                transition={{
                                    duration: 35,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    delay: 10,
                                    ease: "linear"
                                }}
                        // onAnimationComplete={handleAnimationComplete}
                                style={{
                                    position: "absolute",
                                    width: responseSize(298),
                                    left: responseSize(-185),
                                    zIndex: 0
                                }}/>
                    <motion.img src={bowl1} alt={""}
                        // initial={{x: 0, y: 0}}
                                animate={{
                                    x: ["0%", "-10%", "10%", "-10%", "0%"],
                                    y: [-screenSize.height / 4, screenSize.height]
                                }}
                                transition={{
                                    duration: 30,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    delay: 5,
                                    ease: "linear"
                                }}
                                style={{
                                    position: "absolute",
                                    width: responseSize(253),
                                    right: responseSize(-112),
                                    zIndex: 0
                                }}/>
                    <motion.img src={tomato} alt={""}
                        // initial={{x: 0, y: 0}}
                                animate={{
                                    x: ["0%", "-15%", "15%", "-15%", "0%"],
                                    y: [-screenSize.height / 4, screenSize.height],
                                    rotate: [0, 360]
                                }}
                                transition={{
                                    x: {
                                        duration: 25,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        ease: "linear"
                                    },
                                    y: {
                                        duration: 20,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        ease: "linear"
                                    },
                                    rotate: {
                                        duration: 50,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }
                                }}
                                style={{
                                    position: "absolute",
                                    width: responseSize(98),
                                    left: responseSize(242),
                                    zIndex: 0
                                }}/>
                    <motion.img src={carrot} alt={""}
                        // initial={{x: 0, y: 0}}
                                animate={{
                                    x: ["0%", "-10%", "10%", "-10%", "0%"],
                                    y: [-screenSize.height / 4, screenSize.height],
                                    rotate: [0, 360]
                                }}
                                transition={{
                                    x: {
                                        duration: 20,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        ease: "linear"
                                    },
                                    y: {
                                        duration: 25,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        ease: "linear"
                                    },
                                    rotate: {
                                        duration: 50,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }
                                }}
                                style={{
                                    position: "absolute",
                                    width: responseSize(151),
                                    left: responseSize(45),
                                    zIndex: 0
                                }}/>
                </>) : (
                <>
                    <div style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${stars})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        zIndex: 0
                    }}/>
                    <img src={bowl2} alt={""}
                         style={{
                             position: "absolute",
                             width: responseSize(298),
                             top: responseSize(73),
                             left: responseSize(-185),
                             zIndex: 0
                         }}/>
                    <img src={bowl1} alt={""}
                         style={{
                             position: "absolute",
                             width: responseSize(253),
                             top: responseSize(605),
                             right: responseSize(-112),
                             zIndex: 0
                         }}/>
                    <img src={tomato} alt={""}
                         style={{
                             position: "absolute",
                             width: responseSize(98),
                             top: responseSize(111),
                             left: responseSize(242),
                             zIndex: 0
                         }}/>
                    <img src={carrot} alt={""}
                         style={{
                             position: "absolute",
                             width: responseSize(151),
                             top: responseSize(379),
                             left: responseSize(45),
                             zIndex: 0
                         }}/>
                </>
            )}
        </>
    );
}

export default Effect;
