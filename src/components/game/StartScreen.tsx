import classes from "./StartScreen.module.css";
import image from "../../assets/main-image.webp";
import useScreenSize from "../../hooks/useScreenSize";
import MemoPepperIcon from "../svg/PepperIcon";
import MemoTomatoIcon from "../svg/TomatoIcon";
import MemoOnoionIcon from "../svg/OnionIcon";

function StartScreen() {
    const {responseFontSize} = useScreenSize();
    return (
        <div className={classes.container}>
            <header>
                <div className={classes.title}
                     style={{fontSize: responseFontSize(40), lineHeight: responseFontSize(47)}}>
                    Привет!
                </div>
                <div className={classes.subTitle}
                     style={{fontSize: responseFontSize(24), lineHeight: responseFontSize(32.74)}}>
                    Добро пожаловать
                    в СупПространство!
                </div>
            </header>
            <img src={image} alt={"Картинка"} style={{width: responseFontSize(238)}}/>
            <div className={classes.description}
                 style={{fontSize: responseFontSize(18), lineHeight: responseFontSize(25)}}>
                Я покажу тебе рецепт Деда Мороза,
                если ты соберешь для меня
                эти ингредиенты
            </div>
            <div>
                <MemoPepperIcon/>
                <MemoTomatoIcon/>
                <MemoOnoionIcon/>
            </div>
        </div>
    );
}

export default StartScreen;
