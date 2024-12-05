import classes from "./GameComponent.module.css";
import useScreenSize from "../../hooks/useScreenSize";
import Button from "../ui/Button";


function GameError({icon, resume}: { icon: string, resume: () => void }) {
    const {responseSize} = useScreenSize();
    return (
        <div style={{
            position: "fixed",
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
                 style={{fontSize: responseSize(40), lineHeight: responseSize(63), marginTop: 25}}>
                Упс...
            </div>
            <img src={icon} alt={"Картинка"} style={{width: responseSize(70)}}/>

            <div className={classes.description}
                 style={{
                     fontSize: responseSize(24),
                     lineHeight: responseSize(32),
                     fontWeight: "900",
                     textAlign: "center"
                 }}>
                Этого ингредиента<br/> здесь быть не должно
            </div>
            <div style={{marginTop: 28}}>
                <Button text={"Начать уровень сначала"} onPress={resume} width={303}/>
            </div>
        </div>
    );
}

export default GameError;
