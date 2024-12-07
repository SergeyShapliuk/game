import onion from "../assets/onion.webp";
import redPepper from "../assets/red-pepper.webp";
import tomato from "../assets/tomato.webp";
import meatball from "../assets/meatball.webp";
import pumpkin from "../assets/pumpkin.webp";
import carrot from "../assets/carrot.webp";
import broccoli from "../assets/broccoli.webp";
import chicken from "../assets/chicken.webp";
import chillPepper from "../assets/chill-pepper.webp";
import rice from "../assets/rice.webp";
import shrimp from "../assets/shrimp.webp";
import shroom from "../assets/shroom.webp";
import potato from "../assets/potato.webp";

export type LeveItems = {
    id: number,
    levelItems: { item: string, amount: number, icon: string }[]
}

export const Foods = [
    {name: "onion", icon: onion},
    {name: "redPepper", icon: redPepper},
    {name: "tomato", icon: tomato},
    {name: "meatball", icon: meatball},
    {name: "pumpkin", icon: pumpkin},
    {name: "carrot", icon: carrot},
    {name: "broccoli", icon: broccoli},
    {name: "chicken", icon: chicken},
    {name: "chillPepper", icon: chillPepper},
    {name: "rice", icon: rice},
    {name: "shrimp", icon: shrimp},
    {name: "shroom", icon: shroom},
    {name: "potato", icon: potato}
];

export const LevelItems: LeveItems[] = [
    {
        id: 1,
        levelItems: [
            {item: "redPepper", amount: 2, icon: redPepper},
            {item: "carrot", amount: 1, icon: carrot},
            {item: "rice", amount: 2, icon: rice}
        ]
    },
    {
        id: 2,
        levelItems: [
            {item: "broccoli", amount: 2, icon: broccoli},
            {item: "tomato", amount: 2, icon: tomato},
            {item: "rice", amount: 1, icon: rice}
        ]
    },
    {
        id: 3,
        levelItems: [
            {item: "pumpkin", amount: 1, icon: pumpkin},
            {item: "shroom", amount: 1, icon: shroom},
            {item: "tomato", amount: 2, icon: tomato},
            {item: "broccoli", amount: 3, icon: broccoli}
        ]
    },
    {
        id: 4,
        levelItems: [
            {item: "tomato", amount: 2, icon: tomato},
            {item: "onion", amount: 2, icon: onion},
            {item: "meatball", amount: 2, icon: meatball},
            {item: "redPepper", amount: 3, icon: redPepper}
        ]
    },
    {
        id: 5,
        levelItems: [
            {item: "shroom", amount: 2, icon: shroom},
            {item: "rice", amount: 3, icon: rice},
            {item: "onion", amount: 2, icon: onion},
            {item: "chicken", amount: 1, icon: chicken}
        ]
    },
    {
        id: 6,
        levelItems: [
            {item: "rice", amount: 2, icon: rice},
            {item: "onion", amount: 2, icon: onion},
            {item: "shrimp", amount: 1, icon: shrimp},
            {item: "redPepper", amount: 4, icon: redPepper},
            {item: "pumpkin", amount: 3, icon: pumpkin}
        ]
    },
    {
        id: 7,
        levelItems: [
            {item: "carrot", amount: 3, icon: carrot},
            {item: "chicken", amount: 1, icon: chicken},
            {item: "rice", amount: 4, icon: rice},
            {item: "chillPepper", amount: 2, icon: chillPepper},
            {item: "shroom", amount: 1, icon: shroom}
        ]
    },
    {
        id: 8,
        levelItems: [
            {item: "shroom", amount: 2, icon: shroom},
            {item: "tomato", amount: 3, icon: tomato},
            {item: "chicken", amount: 3, icon: chicken},
            {item: "meatball", amount: 3, icon: meatball},
            {item: "shrimp", amount: 3, icon: shrimp}
        ]
    },
    {
        id: 9,
        levelItems: [
            {item: "chicken", amount: 2, icon: chicken},
            {item: "broccoli", amount: 1, icon: broccoli},
            {item: "meatball", amount: 4, icon: meatball},
            {item: "onion", amount: 3, icon: onion},
            {item: "tomato", amount: 5, icon: tomato}
        ]
    },
    {
        id: 10,
        levelItems: [
            {item: "shroom", amount: 5, icon: shroom},
            {item: "pumpkin", amount: 1, icon: pumpkin},
            {item: "shrimp", amount: 4, icon: shrimp},
            {item: "carrot", amount: 5, icon: carrot},
            {item: "tomato", amount: 2, icon: tomato}
        ]
    },
    {
        id: 11,
        levelItems: [
            {item: "onion", amount: 5, icon: onion},
            {item: "tomato", amount: 4, icon: tomato},
            {item: "carrot", amount: 4, icon: carrot},
            {item: "broccoli", amount: 4, icon: broccoli},
            {item: "meatball", amount: 2, icon: meatball}
        ]
    },
    {
        id: 12,
        levelItems: [
            {item: "tomato", amount: 1, icon: tomato},
            {item: "carrot", amount: 5, icon: carrot},
            {item: "redPepper", amount: 2, icon: redPepper},
            {item: "rice", amount: 3, icon: rice},
            {item: "shrimp", amount: 3, icon: shrimp}
        ]
    },
    {
        id: 13,
        levelItems: [
            {item: "shroom", amount: 2, icon: shroom},
            {item: "carrot", amount: 5, icon: carrot},
            {item: "tomato", amount: 4, icon: tomato},
            {item: "pumpkin", amount: 1, icon: pumpkin},
            {item: "shrimp", amount: 4, icon: shrimp}
        ]
    },
    {
        id: 14,
        levelItems: [
            {item: "redPepper", amount: 4, icon: redPepper},
            {item: "chillPepper", amount: 3, icon: chillPepper},
            {item: "carrot", amount: 3, icon: carrot},
            {item: "broccoli", amount: 4, icon: broccoli},
            {item: "chicken", amount: 6, icon: chicken}
        ]
    },
    {
        id: 15,
        levelItems: [

            {item: "redPepper", amount: 1, icon: redPepper},
            {item: "chillPepper", amount: 5, icon: chillPepper},
            {item: "tomato", amount: 2, icon: tomato},
            {item: "meatball", amount: 1, icon: meatball},
            {item: "shroom", amount: 7, icon: shroom}
        ]
    }
];

