import classes from "./GameComponent.module.css";

import StartGame from "./StartGame";
import StartLevel from "./StartLevel";
import Game from "./Game";
import redPepper from "../../assets/red-pepper.webp";
import tomato from "../../assets/tomato.webp";
import meatball from "../../assets/meatball.webp";
import onion from "../../assets/onion.webp";
import pumpkin from "../../assets/pumpkin.webp";

export type LeveItems = {
    id: number,
    levelItems: { item: string, amount: number }[]
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
    }
];

function GameComponent() {
    return (
        <>
            {false && <StartGame/>}
            {false && <StartLevel/>}
            <Game levelItems={levelItems[0]}/>
        </>
    );
}

export default GameComponent;
