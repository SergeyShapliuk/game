import classes from "./GameComponent.module.css";
import image from "../../assets/main-image.webp";
import useScreenSize from "../../hooks/useScreenSize";
import Score from "../ui/Score";
import Button from "../ui/Button";


function StartGame({start}: { start: () => void }) {
    const {responseSize} = useScreenSize();
    return (
        <div className={classes.container}>
            <header>
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
            <img src={image} alt={"Картинка"} style={{width: responseSize(238)}}/>
            <div className={classes.description}
                 style={{fontSize: responseSize(18), lineHeight: responseSize(25)}}>
                Я покажу тебе рецепт Деда Мороза,
                если ты соберешь для меня
                эти ингредиенты
            </div>
            <div style={{padding: "30px 23px 23px 16px"}}>
                <Score/>
            </div>
            <Button text={"Начать"} onPress={start}/>
        </div>
    );
}

export default StartGame;
