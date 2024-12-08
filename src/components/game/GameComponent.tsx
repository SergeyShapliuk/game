import StartGame from "./StartGame";
import StartLevel from "./StartLevel";
import Game from "./Game";
import {useState} from "react";
import FirstComplete from "./FirstComplete";
import {LevelItems} from "../../data/LevelItems";
import FinishGame from "./FinishGame";
import {useCounter} from "../../common/ context/CounterProvider";
import {useService} from "../../common/ context/ServiceProvider";


function GameComponent() {
    const {starCounter} = useCounter();
    const {setAnimation} = useService();

    const [start, setStart] = useState<boolean>(false);
    const [levelIndex, setLevelIndex] = useState<number>(0);
    const [levelComplete, setLevelComplete] = useState<boolean>(false);

    const levelCompleteHandler = () => {
        setLevelComplete(true);
        setStart(false);
        setAnimation(false);
    };
    const levelStartHandler = () => {
        if (levelIndex === 0 && !levelComplete) setStart(true);
        if (levelIndex >= 0 && levelComplete && levelIndex < LevelItems.length - 1) {
            setStart(true);
            setLevelComplete(false);
            setLevelIndex(prevState => prevState + 1);
        }
        if (levelIndex === LevelItems.length - 1) {
            setStart(true);
            setLevelComplete(false);
            setLevelIndex(0);
        }
        setAnimation(true);
    };
// console.log(levelIndex)
    return (
        <>
            {!start && levelIndex === 0 && !levelComplete && <StartGame start={levelStartHandler}/>}
            {!start && levelComplete && levelIndex > 0 && levelIndex < 14 &&
            <StartLevel currentLevel={LevelItems[levelIndex].id} onPress={levelStartHandler}/>}
        {start && <Game levelItems={LevelItems[levelIndex]} levelComplete={levelCompleteHandler}/>}
            {!start && levelComplete && levelIndex === 0 &&
            <FirstComplete currentLevel={LevelItems[levelIndex].id} onPress={levelStartHandler}/>}
            {!start && levelIndex === 14 && levelComplete &&
            <FinishGame star={starCounter} onPress={levelStartHandler}/>}
        </>
    );
}

export default GameComponent;
