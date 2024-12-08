import {motion} from "motion/react";
import stars1 from "../../assets/stars1.webp";


function Stars() {
    // const [currentImageIndex, setCurrentImageIndex] = useState<number>(1);


    return (
        <>
            <motion.div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100vh",
                    backgroundImage: `url(${stars1})`,
                    backgroundSize: "100% 200%",
                    backgroundRepeat: "repeat-y"
                }}
                animate={{backgroundPositionY: ["100%", "-100%"]}}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear"
                }}
                // onAnimationComplete={() => setCurrentImageIndex(2)}
            />
            {/*<motion.div*/}
            {/*    style={{*/}
            {/*        position: "absolute",*/}
            {/*        top: 0,*/}
            {/*        left: 0,*/}
            {/*        width: "100%",*/}
            {/*        height: "100vh",*/}
            {/*        backgroundImage: `url(${stars2})`,*/}
            {/*        backgroundSize: "100% 200%",*/}
            {/*        backgroundRepeat: "repeat-y"*/}
            {/*    }}*/}
            {/*    animate={{backgroundPositionY: currentImageIndex === 2 ? ["100%", "-100%"] : undefined}}*/}
            {/*    transition={{*/}
            {/*        duration: 10,*/}
            {/*        repeat: Infinity,*/}
            {/*        repeatType: "loop",*/}
            {/*        ease: "linear"*/}
            {/*    }}*/}
            {/*    onAnimationComplete={() => setCurrentImageIndex(1)}*/}
            {/*/>*/}
        </>
    );
}

export default Stars;
