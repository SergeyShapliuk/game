import classes from "./GameComponent.module.css";
import useScreenSize from "../../hooks/useScreenSize";
import Score from "../ui/Score";
import Button from "../ui/Button";
import {LevelImage} from "../../common/levelImage";


function StartLevel({currentLevel, onPress}: { currentLevel: number, onPress: () => void }) {
    const {responseSize} = useScreenSize();
    return (
        <div className={classes.container}>
            <header>
                <div className={classes.title}
                     style={{fontSize: responseSize(40), lineHeight: responseSize(47)}}>
                    Поздрав<br/>
                    лямба!
                </div>
                <div className={classes.subTitle}
                     style={{fontSize: responseSize(24), lineHeight: responseSize(32.74)}}>
                    Вы переходите
                    на новый уровень!
                </div>
            </header>
            <img src={LevelImage[currentLevel + 1]} alt={"Картинка"} style={{width: responseSize(238)}}/>
            <div className={classes.description}
                 style={{fontSize: responseSize(24), lineHeight: responseSize(29), fontWeight: "900"}}>
                Новый заказ
            </div>
            <div style={{padding: "7px 23px 23px 16px"}}>
                <Score/>
            </div>
            <Button text={`Уровень ${currentLevel + 1}`} icon={true} onPress={onPress}/>
        </div>
    );
}

export default StartLevel;
