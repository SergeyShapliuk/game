import onion from "../assets/onion.webp";
import redPepper from "../assets/red-pepper.webp";
import tomato from "../assets/tomato.webp";
import meatball from "../assets/meatball.webp";
import pumpkin from "../assets/pumpkin.webp";

export type LeveItems = {
    id: number,
    levelItems: { item: string, amount: number, icon: string }[]
}
export const LevelItems: LeveItems[] = [
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
