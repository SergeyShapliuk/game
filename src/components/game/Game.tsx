import * as React from "react";
import {useCallback, useEffect, useRef, useState} from "react";
import classes from "./Game.module.css";

import image from "../../assets/small-image.webp";
import star from "../../assets/star.webp";
import potTop from "../../assets/pot-top.webp";
import potBottom from "../../assets/pot-bottom.webp";
import carrot from "../../assets/carrot.webp";
import broccoli from "../../assets/broccoli.webp";
import chicken from "../../assets/chicken.webp";
import chillPepper from "../../assets/chill-pepper.webp";
import rice from "../../assets/rice.webp";
import shrimp from "../../assets/shrimp.webp";
import shroom from "../../assets/shroom.webp";
import {motion} from "motion/react";
import Score from "../ui/Score";
import useScreenSize from "../../hooks/useScreenSize";
import Pause from "../ui/Pause";
import Panel from "../ui/Panel";
import GamePause from "./GamePause";
import {LeveItems} from "./GameComponent";
import {useCounter} from "../../common/ context/CounterProvider";
import GameError from "./GameError";


const otherIngredients = [
    {name: "carrot", icon: carrot},
    {name: "chicken", icon: chicken},
    {name: "chillPepper", icon: chillPepper},
    {name: "shrimp", icon: shrimp},
    {name: "rice", icon: rice},
    {name: "shroom", icon: shroom},
    {name: "broccoli", icon: broccoli}
];

const ROWS = [10, 35, 60, 80];
const swipeThreshold = 70; // Минимальная длина свайпа для срабатывания
const minSwipeSpeed = 3;

type GameProps = {
    levelItems: LeveItems;
    levelComplete: () => void;
}

function Game({levelItems, levelComplete}: GameProps) {
    const {screenSize, responseSize, responseFontSize} = useScreenSize();
    const {starCounter, setStarCounter} = useCounter();

    const constraintsRef = useRef<any>(null);
    const planeRef = useRef<HTMLImageElement | null>(null);
    const startTouchX = useRef<number>(0);
    const startTouchTime = useRef<number>(0);
    const [fallingItems, setFallingItems] = useState<{ id: number, item: string, amount: number, x: number, y: number, icon: string }[]>([]);
    const [collected, setCollected] = useState<LeveItems>(levelItems);
    const [collectedPot, setCollectedPot] = useState<{ id: number, item: string, amount: number, x: number, y: number, icon: string }>();
    const [countStar, setCountStar] = useState<number>(starCounter);
    const [planeRowIndex, setPlaneRowIndex] = useState(1);
    const [fallingSpeed] = useState(0.2);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    // console.log("targetPosition", planeRef.current?.getBoundingClientRect());
    // console.log("fallingItems", fallingItems);
    const generateFallingItems = () => {
        const xPosition = ROWS[Math.floor(Math.random() * ROWS.length)];
        // const randomItem = levelItems.levelItems[Math.floor(Math.random() * levelItems.levelItems.length)];
        const itemsToAdd: any[] = [];
        const randomChoice = Math.random(); // Генерация случайного числа от 0 до 1
        if (randomChoice < 0.7) {
            // Вероятность 50% для звезды
            const random = Math.random();
            if (random < 0.5) {
                itemsToAdd.push({
                    item: "star", // Уникальное имя звезды
                    id: new Date().getTime(), // Уникальный ID
                    x: xPosition, // Позиция по оси X
                    y: 0, // Начальная позиция Y
                    icon: star // Иконка для звезды
                });
            } else {
                const randomIndex = Math.floor(Math.random() * otherIngredients.length);
                const randomItem = otherIngredients[randomIndex];
                itemsToAdd.push({
                    item: randomItem.name, // Уникальное имя звезды
                    id: new Date().getTime(), // Уникальный ID
                    x: xPosition, // Позиция по оси X
                    y: 0, // Начальная позиция Y
                    icon: randomItem.icon // Иконка для звезды
                });
            }
        } else {
            // Вероятность 90% для обычного предмета
            const randomIngredient =
                levelItems.levelItems[Math.floor(Math.random() * levelItems.levelItems.length)];
            itemsToAdd.push({
                ...randomIngredient,
                id: new Date().getTime(), // Уникальный ID
                x: xPosition, // Позиция по оси X
                y: 0 // Начальная позиция Y
            });
        }
        // const randomIngredient =
        //     levelItems.levelItems[Math.floor(Math.random() * levelItems.levelItems.length)];
        // itemsToAdd.push({
        //     ...randomIngredient,
        //     id: new Date().getTime(), // Уникальный id
        //     x: xPosition, // Позиция по оси X
        //     y: 0 // Начальная позиция по оси Y с задержкой
        //     // rowDelay
        //     // speed:2
        // });
        setFallingItems((prevItems) => [...prevItems, ...itemsToAdd]);
    };

    // Добавляем падающие предметы
    useEffect(() => {
        const isComplete = collected.levelItems.some(item => item.amount > 0);
        if (!isComplete) {
            levelComplete();
            setStarCounter(countStar);
            sessionStorage.setItem("star", countStar.toString());
        }
    }, [collected]);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(generateFallingItems, 1000); // Интервал от 1 до 3 секунд

        return () => clearInterval(interval);
    }, [isPaused]);

    useEffect(() => {
        if (collectedPot) {
            const find = collectedPot.item === "star" || levelItems.levelItems.find(item => item.item === collectedPot.item);
            if (!find) {
                setIsError(true);
                setIsPaused(true);
                return;
            }
            const timer = setTimeout(() => {
                setCollectedPot(null);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [collectedPot]);

    useEffect(() => {
        let animationFrame: number;

        const animate = () => {
            if (!isPaused) {
                setFallingItems((items) =>
                    items
                        .map((item) => ({
                            ...item,
                            y: item.y + fallingSpeed // Увеличиваем позицию по вертикали
                        }))
                        .filter((item) => {
                            // Получаем размеры
                            const planeRect = planeRef.current && planeRef.current!.getBoundingClientRect();
                            if (!planeRect) return true;

                            const planeX = planeRect.left;
                            const planeY = planeRect.top;
                            const planeWidth = planeRect.width;
                            const planeHeight = planeRect.height;

                            // Преобразуем координаты предмета в пиксели
                            const itemX = (item.x / 100) * screenSize.width;
                            const itemY = (item.y / 100) * screenSize.height;


                            // Проверяем столкновение с самолетом
                            const isCollected =
                                itemX >= planeX && // Предмет должен быть правее левого края
                                itemX <= planeX + planeWidth && // Предмет должен быть левее правого края
                                itemY >= planeY && // Предмет ниже верхнего края
                                itemY <= planeY + planeHeight; // Предмет выше нижнего края

                            if (isCollected) {
                                if (item.item === "star") {
                                    setCountStar(prevCount => prevCount + 1);
                                } else {
                                    setCollected((prev) => ({
                                        ...prev, // Оставляем остальные свойства объекта, включая id
                                        levelItems: prev.levelItems.map((collectedItem) =>
                                            collectedItem.item === item.item && collectedItem.amount > 0
                                                ? {...collectedItem, amount: collectedItem.amount - 1} // Уменьшаем количество
                                                : collectedItem // Оставляем без изменений, если не совпало
                                        )

                                    }));
                                }
                                setCollectedPot(item);
                                return false; // Удаляем предмет, если он собран
                            }

                            return item.y < screenSize.height; // Оставляем предмет, если он не собран и не вышел за нижний край
                        })
                );
            }
            animationFrame = requestAnimationFrame(animate);
        };

        if (!isPaused) {
            animationFrame = requestAnimationFrame(animate);
        }

        return () => cancelAnimationFrame(animationFrame);
    }, [fallingSpeed, isPaused]);

    // Управление самолетом через мышь
    // const handleMouseMove = useCallback((e) => {
    //     const container = e.target.getBoundingClientRect();
    //     const x = ((e.clientX - container.left) / container.width) * 100;
    //     // Находим ближайший ряд
    //     const closestRow = ROWS.reduce(
    //         (closest, row, idx) =>
    //             Math.abs(row - x) < Math.abs(ROWS[closest] - x) ? idx : closest,
    //         0
    //     );
    //     setPlaneRow(closestRow); // Устанавливаем целевой ряд
    // }, []);

    const movePlane = (direction: number) => {
        setPlaneRowIndex((prevIndex) => {
            const newIndex = prevIndex + direction;
            if (newIndex < 0 || newIndex >= ROWS.length) return prevIndex; // Ограничиваем движение
            return newIndex;
        });
    };

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.code === "ArrowLeft" || event.code === "KeyA") {
                movePlane(-1); // Влево
            } else if (event.code === "ArrowRight" || event.code === "KeyD") {
                movePlane(1); // Вправо
            }
        },
        []
    );

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const touchX = e.touches[0].clientX; // Сохраняем начальную точку свайпа
        startTouchX.current = touchX;
        startTouchTime.current = Date.now();
    };

    // Движение пальца
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        const touchX = "touches" in e ? e.touches[0].clientX : e.clientX; // Получаем X-координату свайпа или мыши
        if (startTouchX.current === 0) {
            startTouchX.current = touchX; // Сохраняем начальную точку
        }
        const deltaX = touchX - startTouchX.current; // Считаем смещение
        const elapsedTime = (Date.now() - startTouchTime.current) / 1000; // Время свайпа в секундах
        const swipeSpeed = Math.abs(deltaX) / elapsedTime; // Скорость свайпа
        console.log("delta", deltaX);
        console.log("swipeSpeed", swipeSpeed);

        if (Math.abs(deltaX) > swipeThreshold && swipeSpeed > minSwipeSpeed) {
            if (deltaX > 0) {
                movePlane(1); // Свайп вправо (переместить влево)
            } else if (deltaX < 0) {
                movePlane(-1); // Свайп влево (переместить вправо)
            }
            // setPlaneX((prevX) => prevX + deltaX); // Обновляем положение самолета по оси X
            // startTouchX.current = touchX; // Обновляем начальную точку для следующего движения
            startTouchX.current = 0;
            startTouchTime.current = 0;
        }
    };

    // Завершение жеста
    // const handleTouchEnd = () => {
    //     startTouchX.current = null; // Сбрасываем начальную точку
    // };

    // Добавляем обработку событий для мыши и свайпов
    useEffect(() => {
        // Добавление обработчика события нажатия клавиш
        window.addEventListener("keydown", handleKeyDown);

        // Удаление обработчика при размонтировании компонента
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    const resumeGame = () => {
        setFallingItems([]);
        setCollected(levelItems);
        setCollectedPot(undefined);
        setCountStar(starCounter);
        setIsPaused(false);
        setIsError(false);
    };

    return (
        <div>
            <div className={classes.container}>
                {isPaused && !isError&& <GamePause star={countStar} level={collected.id} resume={() => setIsPaused(false)}/>}
                {isError && <GameError icon={collectedPot?.icon} resume={resumeGame}/>}
                <header className={classes.header}>
                    <Pause onPress={() => setIsPaused(true)}/>
                    <Panel count={countStar}/>
                    <div className={classes.level}>
                    <span style={{
                        color: "#6CA2FF",
                        fontFamily: "Modak",
                        fontSize: responseFontSize(16),
                        lineHeight: responseFontSize(24)
                    }}>{`Yp.${collected.id}`}</span>
                        <div style={{
                            width: 58,
                            height: 58,
                            display: "inline-flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "#6CA2FF solid 3px",
                            borderRadius: 50
                        }}>
                            <img src={image} alt="" style={{marginBottom: 15}}/>
                        </div>
                    </div>
                </header>
                <div ref={constraintsRef}
                     onTouchStart={handleTouchStart}
                     onTouchMove={handleTouchMove}
                    // onTouchEnd={handleTouchEnd}
                     className={classes.gameContainer}>

                    <motion.img ref={planeRef} src={potTop} alt="" className={classes.plane}
                                animate={{left: `${ROWS[planeRowIndex] - 2}%`}}
                                transition={{type: "tween"}}
                                style={{width: responseSize(70)}}/>
                    <motion.img ref={planeRef} src={potBottom} alt="" className={classes.plane}
                                animate={{left: `${ROWS[planeRowIndex] - 2}%`}}
                                transition={{type: "tween"}}
                                style={{width: responseSize(70), zIndex: 2}}/>
                    <motion.img src={collectedPot?.icon} alt="" className={classes.plane}
                                animate={{left: `${ROWS[planeRowIndex]}%`}}
                                transition={{type: "tween"}}
                                style={{width: responseSize(38), bottom: 45, zIndex: 1}}/>
                    {fallingItems.map((item) => (
                        <FallingItem key={item.id} item={item}/>
                    ))}
                </div>

                <div style={{padding: "7px 23px 23px 16px"}}>
                    <Score items={collected.levelItems}/>
                </div>

            </div>
        </div>
    );
}

export default Game;

const FallingItem = ({item}: any) => {
    const {responseSize} = useScreenSize();
    return (
        <div
            key={item.id}
            className={classes.fallingItem}
            style={{
                left: `${item.x}%`,
                top: `${item.y}%`
            }}
            // animate={{
            //     top: `${item.y}%`
            // }}
            // transition={{
            //     type: "tween"
            //     // duration: 1// Используем пружинную анимацию
            //     //     // stiffness: 100, // Жесткость пружины
            //     //     // damping: 25 // Затухание
            // }}
        >
            <img src={item.icon} alt="" style={{width: responseSize(42), height: responseSize(42)}}/>
        </div>
    );
};
