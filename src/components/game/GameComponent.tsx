import StartGame from "./StartGame";
import StartLevel from "./StartLevel";
import Game from "./Game";
import {useState} from "react";
import FirstComplete from "./FirstComplete";
import {LevelItems} from "../../data/LevelItems";
import FinishGame from "./FinishGame";
import {useCounter} from "../../common/ context/CounterProvider";


function GameComponent() {
    const {starCounter} = useCounter();

    const [start, setStart] = useState<boolean>(false);
    const [levelIndex, setLevelIndex] = useState<number>(0);
    const [levelComplete, setLevelComplete] = useState<boolean>(false);

    const levelCompleteHandler = () => {
        setLevelComplete(true);
        setStart(false);
    };
    const levelStartHandler = () => {
        setStart(true);
        setLevelComplete(false);
        setLevelIndex(prevState => prevState + 1);
    };

    return (
        <>
            {!start && levelIndex === 0 && !levelComplete && <StartGame start={() => setStart(true)}/>}
            {!start && levelComplete && levelIndex > 0 && levelIndex > 14 &&
            <StartLevel currentLevel={LevelItems[levelIndex].id} onPress={levelStartHandler}/>}
            {start && <Game levelItems={LevelItems[levelIndex]} levelComplete={levelCompleteHandler}/>}
            {!start && levelComplete && levelIndex === 0 &&
            <FirstComplete currentLevel={LevelItems[levelIndex].id} onPress={levelStartHandler}/>}
            {!start && levelIndex === 14 && levelComplete && <FinishGame star={starCounter} onPress={() => {
                setStart(true);
                setLevelComplete(false);
                setLevelIndex(0);
            }}/>}
        </>
    );
}

export default GameComponent;
