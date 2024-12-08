import classes from "./GameComponent.module.css";
import useScreenSize from "../../hooks/useScreenSize";
import Score from "../ui/Score";
import Button from "../ui/Button";
import {LevelImage} from "../../common/levelImage";
import {motion} from "motion/react";
import recipe from "../../assets/small-recipe.webp";
import Panel from "../ui/Panel";
import {useCounter} from "../../common/ context/CounterProvider";


function StartLevel({currentLevel, onPress}: { currentLevel: number, onPress: () => void }) {
    const {responseSize} = useScreenSize();
    const {starCounter} = useCounter();
    return (
        <motion.div initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 20}}
                    transition={{duration: 0.5}} className={classes.container}
                    style={{position: "relative", overflow: "hidden"}}>
            <header style={{paddingTop: responseSize(17)}}>
                <img src={recipe} alt={"Картинка"}
                     style={{
                         position: "absolute",
                         width: responseSize(70),
                         top: -30,
                         right: 0,
                         transform: "rotate(31deg)"
                     }}/>
                <Panel count={starCounter}/>
            </header>
            <div className={classes.title}
                 style={{fontSize: responseSize(40), lineHeight: responseSize(47), marginTop: responseSize(43)}}>
                Поздрав<br/>
                лямба!
            </div>
            <div className={classes.subTitle}
                 style={{fontSize: responseSize(24), lineHeight: responseSize(32.74)}}>
                Вы переходите
                на новый уровень!
            </div>
            <img src={LevelImage[currentLevel]} alt={"Картинка"} style={{width: responseSize(238)}}/>
            <div className={classes.description}
                 style={{
                     fontSize: responseSize(24),
                     lineHeight: responseSize(29),
                     fontWeight: "900",
                     marginTop: responseSize(30)
                 }}>
                Новый заказ
            </div>
            <div style={{
                alignSelf: "stretch",
                marginTop: "auto",
                marginBottom: responseSize(42)
            }}>
                <div style={{
                    // alignSelf: "stretch",
                    // padding: "30px 23px 23px 16px",
                    paddingTop: responseSize(7),
                    paddingRight: responseSize(23),
                    paddingLeft: responseSize(16),
                    paddingBottom: responseSize(23)
                }}>
                    <Score/>
                </div>
                <Button text={`Уровень ${currentLevel + 1}`} icon={true} onPress={onPress}/>
            </div>
        </motion.div>
    );
}

export default StartLevel;
