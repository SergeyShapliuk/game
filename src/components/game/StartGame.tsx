import classes from "./GameComponent.module.css";
import useScreenSize from "../../hooks/useScreenSize";
import Score from "../ui/Score";
import Button from "../ui/Button";
import recipe from "../../assets/recipe-shadow.webp";
import {LevelImage} from "../../common/levelImage";
import {motion} from "motion/react";


function StartGame({start}: { start: () => void }) {
    const {responseSize} = useScreenSize();
    return (
        <motion.div initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 20}}
                    transition={{duration: 0.5}} className={classes.container}>
            <header style={{paddingTop: responseSize(38)}}>
                <div className={classes.title}
                     style={{fontSize: responseSize(40), lineHeight: responseSize(47)}}>
                    Привет!
                </div>
                <div className={classes.subTitle}
                     style={{fontSize: responseSize(24), lineHeight: responseSize(32.74)}}>
                    Добро пожаловать
                    в СупПространство!
                </div>
            </header>
            <div style={{position: "relative", paddingBottom: responseSize(36)}}>
                <img src={LevelImage[0]} alt={"Картинка"} style={{width: responseSize(238), zIndex: 3}}/>
                <img src={recipe} alt={"Картинка"}
                     style={{
                         position: "absolute",
                         width: responseSize(100),
                         left: "50%",
                         transform: "translateX(87%)",
                         bottom: "38%",
                         zIndex: 1
                     }}/>
            </div>
            <div className={classes.description}
                 style={{
                     fontSize: responseSize(18),
                     lineHeight: responseSize(25),
                     paddingLeft: responseSize(33),
                     paddingRight: responseSize(33)
                 }}>
                Я покажу тебе рецепт Деда Мороза,
                если ты соберешь для меня
                эти ингредиенты
            </div>
            <div style={{
                alignSelf: "stretch",
                marginTop: "auto",
                marginBottom: responseSize(42)
            }}>
                <div style={{
                    // padding: "30px 23px 23px 16px",
                    paddingTop: responseSize(30),
                    paddingRight: responseSize(23),
                    paddingLeft: responseSize(16),
                    paddingBottom: responseSize(23)
                }}>
                    <Score/>
                </div>
                <Button text={"Начать"} onPress={start}/>
            </div>
        </motion.div>
    );
}

export default StartGame;
