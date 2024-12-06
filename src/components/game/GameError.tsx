import classes from "./GameComponent.module.css";
import useScreenSize from "../../hooks/useScreenSize";
import Button from "../ui/Button";
import {motion} from "motion/react";


function GameError({icon, resume}: { icon: string | undefined, resume: () => void }) {
    const {responseSize} = useScreenSize();
    return (
        <motion.div initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.3}} style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000000D9",
            paddingTop: "35%",
            zIndex: 3
        }}>
            <div className={classes.title}
                 style={{fontSize: responseSize(40), lineHeight: responseSize(63)}}>
                Упс...
            </div>
            <img src={icon} alt={"Картинка"}
                 style={{width: responseSize(70), paddingTop: responseSize(20), paddingBottom: responseSize(10)}}/>

            <div className={classes.description}
                 style={{
                     fontSize: responseSize(24),
                     lineHeight: responseSize(32),
                     fontWeight: "900",
                     textAlign: "center",
                     paddingTop: responseSize(21)
                 }}>
                Этого ингредиента<br/> здесь быть не должно
            </div>
            <div style={{marginTop: responseSize(28)}}>
                <Button text={"Начать уровень сначала"} onPress={resume} width={303}/>
            </div>
        </motion.div>
    );
}

export default GameError;
