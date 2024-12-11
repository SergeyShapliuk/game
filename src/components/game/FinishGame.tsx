import classes from "./GameComponent.module.css";
import useScreenSize from "../../hooks/useScreenSize";
import Button from "../ui/Button";
import {motion} from "motion/react";
import image from "../../assets/finish-image.webp";
import Panel from "../ui/Panel";
import recipe from "../../assets/small-recipe.webp";
import {useState} from "react";
import fullRecipe from "../../assets/recipe.webp";


function FinishGame({star, onPress}: { star: number, onPress: () => void }) {
    const {responseSize} = useScreenSize();

    const [openRecipe, setOpenRecipe] = useState<boolean>(false);

    return (
        <motion.div initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 20}}
                    transition={{duration: 0.5}} className={classes.container}
                    style={{position: "relative", overflow: "hidden"}}>
            {!openRecipe ? (<>
                <header style={{paddingTop: responseSize(17)}}>
                    <img onClick={() => setOpenRecipe(true)} src={recipe} alt={"Картинка"}
                         style={{
                             position: "absolute",
                             width: responseSize(70),
                             top: -30,
                             right: 0,
                             transform: "rotate(31deg)"
                         }}/>
                    <Panel count={star}/>
                </header>
                <div className={classes.title}
                     style={{fontSize: responseSize(40), lineHeight: responseSize(47), marginTop: responseSize(43)}}>
                    Ничего<br/>
                    себе!
                </div>
                <div className={classes.subTitle}
                     style={{
                         fontSize: responseSize(24),
                         lineHeight: responseSize(32.74),
                         paddingTop: responseSize(10)
                     }}>
                    Ты прошел<br/>
                    все уровни!
                </div>
                <div className={classes.subTitle}
                     style={{
                         fontSize: responseSize(24),
                         lineHeight: responseSize(32.74),
                         paddingTop: responseSize(10)
                     }}>
                    И накормил
                    всех обитателей
                    СупПространства!
                </div>
                <img src={image} alt={"Картинка"}
                     style={{width: responseSize(230), paddingTop: 15, paddingBottom: responseSize(55)}}/>
            </>) : (
                <img src={fullRecipe} alt=""
                     style={{
                         height: responseSize(680),
                         paddingTop: responseSize(35),
                         paddingBottom: responseSize(30)
                     }}/>
            )}
            <div style={{marginTop: "auto", marginBottom: responseSize(42)}}>
                <Button text={!openRecipe ? "Начать сначала" : "Закрыть"}
                        onPress={!openRecipe ? onPress : () => setOpenRecipe(false)}/>
            </div>
        </motion.div>
    );
}

export default FinishGame;
