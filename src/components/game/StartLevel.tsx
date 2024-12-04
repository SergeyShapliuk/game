import classes from "./GameComponent.module.css";
import image from "../../assets/image-level.webp";
import useScreenSize from "../../hooks/useScreenSize";
import Score from "../ui/Score";
import Button from "../ui/Button";


function StartLevel() {
    const {responseSize} = useScreenSize();
    return (
        <div className={classes.container}>
            <header>
                <div className={classes.title}
                     style={{fontSize: responseSize(40), lineHeight: responseSize(47)}}>
                    Поздрав
                    лямба!
                </div>
                <div className={classes.subTitle}
                     style={{fontSize: responseSize(24), lineHeight: responseSize(32.74)}}>
                    Вы переходите
                    на новый уровень!
                </div>
            </header>
            <img src={image} alt={"Картинка"} style={{width: responseSize(238)}}/>
            <div className={classes.description}
                 style={{fontSize: responseSize(24), lineHeight: responseSize(29), fontWeight: "900"}}>
                Новый заказ
            </div>
            <div style={{padding: "7px 23px 23px 16px"}}>
                <Score/>
            </div>
            <Button text={`Уровень ${2}`} icon={true}/>
        </div>
    );
}

export default StartLevel;
