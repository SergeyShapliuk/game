import StartGame from "./StartGame";
import StartLevel from "./StartLevel";
import Game from "./Game";
import redPepper from "../../assets/red-pepper.webp";
import tomato from "../../assets/tomato.webp";
import meatball from "../../assets/meatball.webp";
import onion from "../../assets/onion.webp";
import pumpkin from "../../assets/pumpkin.webp";
import {useState} from "react";

export type LeveItems = {
    id: number,
    levelItems: { item: string, amount: number, icon: string }[]
}
const levelItems: LeveItems[] = [
    {
        id: 1,
        levelItems: [{item: "onion", amount: 3, icon: onion}, {
            item: "redPepper",
            amount: 1,
            icon: redPepper
        }, {item: "tomato", amount: 3, icon: tomato}, {
            item: "meatball",
            amount: 6,
            icon: meatball
        }, {item: "pumpkin", amount: 1, icon: pumpkin}]
    }, {
        id: 2,
        levelItems: [{item: "onion", amount: 3, icon: onion}, {
            item: "redPepper",
            amount: 2,
            icon: redPepper
        }, {item: "tomato", amount: 4, icon: tomato}, {
            item: "meatball",
            amount: 7,
            icon: meatball
        }, {item: "pumpkin", amount: 2, icon: pumpkin}]
    }
];

function GameComponent() {
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
            {!start && levelComplete &&
            <StartLevel currentLevel={levelItems[levelIndex].id} onPress={levelStartHandler}/>}
            {start && <Game levelItems={levelItems[levelIndex]} levelComplete={levelCompleteHandler}/>}
        </>
    );
}

export default GameComponent;
