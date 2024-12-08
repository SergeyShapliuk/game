import classes from "./GameComponent.module.css";
import recipe from "../../assets/small-recipe.webp";
import useScreenSize from "../../hooks/useScreenSize";
import Button from "../ui/Button";
import Panel from "../ui/Panel";
import MemoMagnifierIcon from "../svg/SearchIcon";
import {LevelImage} from "../../common/levelImage";
import {motion} from "motion/react";


function GamePause({star, level, resume}: { star: number, level: number, resume: () => void }) {
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
            zIndex: 10
        }}>
            <header style={{marginTop: responseSize(17)}}>
                <Panel count={star}/>
            </header>
            <div className={classes.title}
                 style={{fontSize: responseSize(40), lineHeight: responseSize(63), marginTop: responseSize(25)}}>
                Пауза
            </div>
            <img src={LevelImage[level - 1]} alt={"Картинка"}
                 style={{width: responseSize(166), marginTop: responseSize(18)}}/>
            <div className={classes.title}
                 style={{fontSize: responseSize(40), lineHeight: responseSize(63), marginTop: responseSize(18)}}>
                Уровень
                <div style={{
                    fontFamily: "Modak",
                    fontSize: responseSize(68),
                    lineHeight: responseSize(71)
                }}>{level}</div>
            </div>
            <div style={{
                position: "relative",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: responseSize(20)
            }}>
                <img src={recipe} alt={"Картинка"}
                     style={{width: responseSize(70), transform: "rotate(31deg)"}}/>
                <MemoMagnifierIcon style={{position: "absolute"}}/>
            </div>

            <div className={classes.description}
                 style={{
                     fontSize: responseSize(20),
                     lineHeight: responseSize(29),
                     fontWeight: "900",
                     marginTop: responseSize(20)
                 }}>
                Посмотреть Рецепт
            </div>
            <div style={{marginTop: "auto", marginBottom: responseSize(42)}}>
                <Button text={"Продолжить"} onPress={resume}/>
            </div>
        </motion.div>
    );
}

export default GamePause;
