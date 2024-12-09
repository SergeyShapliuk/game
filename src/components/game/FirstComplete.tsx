import {useState} from "react";
import classes from "./GameComponent.module.css";
import useScreenSize from "../../hooks/useScreenSize";
import Score from "../ui/Score";
import Button from "../ui/Button";
import recipe from "../../assets/small-recipe.webp";
import fullRecipe from "../../assets/recipe.webp";
import {LevelImage} from "../../common/levelImage";
import {motion} from "motion/react";


function FirstComplete({currentLevel, onPress}: { currentLevel: number, onPress: () => void }) {
    const {responseSize} = useScreenSize();

    const [openRecipe, setOpenRecipe] = useState<boolean>(false);

    return (
        <motion.div initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 20}}
                    transition={{duration: 0.5}} className={classes.container}>
            {!openRecipe ? (<>
                <header style={{paddingTop: responseSize(38)}}>
                    <div className={classes.title}
                         style={{fontSize: responseSize(40), lineHeight: responseSize(47)}}>
                        Спасибо!
                    </div>
                    <div className={classes.subTitle}
                         style={{fontSize: responseSize(24), lineHeight: responseSize(32.74)}}>
                        Нажми на рецепт,
                        чтобы увеличить.
                    </div>
                </header>
                <img onClick={() => setOpenRecipe(true)} src={recipe} alt={"Картинка"}
                     style={{width: responseSize(182)}}/>
                <div className={classes.description}
                     style={{
                         display: "flex",
                         flexDirection: "row",
                         fontSize: responseSize(18),
                         lineHeight: responseSize(25),
                         textAlign: "left",
                         marginTop: responseSize(45),
                         paddingLeft: responseSize(33),
                         paddingRight: responseSize(33),
                         gap: responseSize(6)
                     }}>
                    <img src={LevelImage[1]} alt={"Картинка"}
                         style={{width: responseSize(88), height: responseSize(76)}}/>
                    СупПространственные
                    существа еще нуждаются
                    в твоей помощи.
                    Вот новый заказ.
                </div>

                <div style={{
                    marginTop: "auto",
                    alignSelf: "stretch",
                    // padding: "30px 23px 0px 16px",
                    paddingTop: responseSize(30),
                    paddingRight: responseSize(23),
                    paddingLeft: responseSize(16),
                    paddingBottom: responseSize(23)
                }}>
                    <Score/>
                </div>
            </>) : (
                <img src={fullRecipe} alt=""
                     style={{
                         height: responseSize(680),
                         paddingTop: responseSize(35),
                         paddingBottom: responseSize(30),
                     }}/>
            )}
            <div style={{marginBottom: responseSize(42)}}>
                <Button text={!openRecipe ? `Уровень ${currentLevel + 1}` : "Закрыть"} icon={!openRecipe}
                        onPress={!openRecipe ? onPress : () => setOpenRecipe(false)}/>
            </div>
        </motion.div>
    );
}

export default FirstComplete;
