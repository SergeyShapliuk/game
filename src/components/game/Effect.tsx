import {motion} from "motion/react";
import stars from "../../assets/stars.webp";
import bowl2 from "../../assets/bowl2.webp";
import bowl1 from "../../assets/bowl1.webp";
import tomato from "../../assets/bg-tomato.webp";
import carrot from "../../assets/bg-carrot.webp";
import useScreenSize from "../../hooks/useScreenSize";
import {useService} from "../../common/ context/ServiceProvider";

function Effect() {
    const {isAnimation} = useService();
    const {screenSize, responseSize} = useScreenSize();
    // const x = useMotionValue(0)
    // console.log(x)
    // const handleAnimationComplete = (latest) => {
    //     console.log({ x: latest.x, y: latest.y });
    // };
    return (
        <>
            {isAnimation ? (
                <>
                    <motion.div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100vh",
                            backgroundImage: `url(${stars})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "repeat-y"
                        }}
                        animate={{backgroundPositionY: ["0%", "-100%"]}}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "linear"
                        }}
                    />
                    <motion.img src={bowl2} alt={""}
                        // initial={{x: 0, y: 0}}
                                animate={{
                                    x: ["0%", "-10%", "10%", "-10%", "0%"],
                                    y: [Math.floor(Math.random() * -100), screenSize.height]
                                }}
                                transition={{
                                    duration: 15,
                                    repeat: Infinity,
                                    repeatType: "loop"
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
                                    y: [Math.floor(Math.random() * -300), screenSize.height]
                                }}
                                transition={{
                                    duration: 25,
                                    repeat: Infinity,
                                    repeatType: "loop"
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
                                    x: ["0%", "-10%", "10%", "-10%", "0%"],
                                    y: [Math.floor(Math.random() * -400), screenSize.height]
                                }}
                                transition={{
                                    duration: 30,
                                    repeat: Infinity,
                                    repeatType: "loop"
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
                                    y: [Math.floor(Math.random() * -500), screenSize.height]
                                }}
                                transition={{
                                    duration: 35,
                                    repeat: Infinity,
                                    repeatType: "loop"
                                }}
                                style={{
                                    position: "absolute",
                                    width: responseSize(151),
                                    left: responseSize(45),
                                    zIndex: 0
                                }}/>
                </>) : (
                <>
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
