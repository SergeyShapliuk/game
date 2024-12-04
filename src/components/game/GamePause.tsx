import classes from "./GameComponent.module.css";
import image from "../../assets/image-level.webp";
import recipe from "../../assets/small-recipe.webp";
import useScreenSize from "../../hooks/useScreenSize";
import Score from "../ui/Score";
import Button from "../ui/Button";
import Panel from "../ui/Panel";
import MemoMagnifierIcon from "../svg/SearchIcon";


function GamePause({resume}: { resume: () => void }) {
    const {responseSize} = useScreenSize();
    return (
        <div style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000000D9",
            zIndex: 3
        }}>
            <header>
                <Panel/>
            </header>
            <div className={classes.title}
                 style={{fontSize: responseSize(40), lineHeight: responseSize(63), marginTop: 25}}>
                Пауза
            </div>
            <img src={image} alt={"Картинка"} style={{width: responseSize(122), marginTop: 18}}/>
            <div className={classes.title}
                 style={{fontSize: responseSize(40), lineHeight: responseSize(63), marginTop: 5}}>
                Уровень
                <div style={{
                    fontFamily: "Modak",
                    fontSize: responseSize(68),
                    lineHeight: responseSize(71)
                }}>2</div>
            </div>
            <div style={{
                position: "relative",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20
            }}>
                <img src={recipe} alt={"Картинка"}
                     style={{width: responseSize(70), transform: "rotate(31deg)"}}/>
                <MemoMagnifierIcon style={{position: "absolute"}}/>
            </div>

            <div className={classes.description}
                 style={{fontSize: responseSize(20), lineHeight: responseSize(29), fontWeight: "900"}}>
                Посмотреть Рецепт
            </div>
            <div style={{marginTop: 35}}>
                <Button text={"Продолжить"} onPress={resume}/>
            </div>
        </div>
    );
}

export default GamePause;
