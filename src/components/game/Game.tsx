import {useCallback, useEffect, useRef, useState} from "react";
import classes from "./Game.module.css";

import image from "../../assets/small-image.webp";
import star from "../../assets/star.webp";
import potTop from "../../assets/pot-top.webp";
import {motion} from "motion/react";
import Score from "../ui/Score";
import useScreenSize from "../../hooks/useScreenSize";
import Pause from "../ui/Pause";
import Panel from "../ui/Panel";
import GamePause from "./GamePause";
import {LeveItems} from "./GameComponent";
import {useCounter} from "../../common/ context/CounterProvider";
import * as React from "react";


// const ingredients = [
//     {id: 1, name: "meatball", icon: meatball},
//     {id: 2, name: "pumpkin", icon: pumpkin},
//     {id: 3, name: "garlic", icon: onion},
//     {id: 4, name: "tomato", icon: tomato},
//     {id: 4, name: "redPepper", icon: redPepper}
// ];

const ROWS = [10, 35, 60, 80];
const swipeThreshold = 100; // Минимальная длина свайпа для срабатывания
const minSwipeSpeed = 5;

type GameProps = {
    levelItems: LeveItems;
    levelComplete: () => void;
}

function Game({levelItems, levelComplete}: GameProps) {
    const {responseSize, responseFontSize} = useScreenSize();
    const {starCounter, setStarCounter} = useCounter();

    const constraintsRef = useRef<any>(null);
    const planeRef = useRef<HTMLImageElement | null>(null);
    const startTouchX = useRef<number>(0);
    const startTouchTime = useRef<number>(0);
    const [fallingItems, setFallingItems] = useState<{ id: number, item: string, amount: number, x: number, y: number, icon: string }[]>([]);
    const [collected, setCollected] = useState<LeveItems>(levelItems);
    const [planeRowIndex, setPlaneRowIndex] = useState(1);
    // const [planeRow, setPlaneRow] = useState(2);
    // const [planeX, setPlaneX] = useState(0);
    const [fallingSpeed] = useState(0.2);
    const [isPaused, setIsPaused] = useState(false);

    // console.log("targetPosition", planeRef.current?.getBoundingClientRect());
    console.log("fallingItems", fallingItems);
    const generateFallingItems = () => {
        const xPosition = ROWS[Math.floor(Math.random() * ROWS.length)];
        // const randomItem = levelItems.levelItems[Math.floor(Math.random() * levelItems.levelItems.length)];
        const itemsToAdd: any[] = [];
        const randomChoice = Math.random(); // Генерация случайного числа от 0 до 1
        if (randomChoice < 0.5) {
            // Вероятность 10% для звезды
            itemsToAdd.push({
                item: "star", // Уникальное имя звезды
                id: new Date().getTime(), // Уникальный ID
                x: xPosition, // Позиция по оси X
                y: 0, // Начальная позиция Y
                icon: star // Иконка для звезды
            });
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
            sessionStorage.setItem("star", starCounter.toString());
        }
    }, [collected]);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(generateFallingItems, 1000); // Интервал от 1 до 3 секунд

        return () => clearInterval(interval);
    }, [isPaused]);

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
                            // Получаем размеры самолета
                            const planeRect = planeRef.current && planeRef.current!.getBoundingClientRect();
                            if (!planeRect) return true;

                            const planex = planeRect.left;
                            const planeY = planeRect.top;
                            const planeWidth = planeRect.width;
                            const planeHeight = planeRect.height;

                            // Преобразуем координаты предмета в пиксели
                            const itemX = (item.x / 100) * window.innerWidth;
                            const itemY = (item.y / 100) * window.innerHeight;

                            // Проверяем столкновение с самолетом
                            const isCollected =
                                itemY >= planeY && // Предмет должен быть ниже верхней границы самолета
                                itemY <= planeY + planeHeight && // Предмет должен быть выше нижней границы самолета
                                itemX >= planex - planeWidth && // Предмет должен быть в пределах левой границы самолета
                                itemX <= planex + planeWidth; // Предмет должен быть в пределах правой границы самолета

                            if (isCollected) {
                                if (item.item === "star") {
                                    setStarCounter(prevCount => prevCount + 1);
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
                                return false; // Удаляем предмет, если он собран
                            }

                            return item.y < 200; // Оставляем предмет, если он не собран и не вышел за нижний край
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

    return (
        <div>
            <div className={classes.container}>
                {isPaused && <GamePause star={starCounter} level={collected.id} resume={() => setIsPaused(false)}/>}
                <header className={classes.header}>
                    <Pause onPress={() => setIsPaused(true)}/>
                    <Panel count={starCounter}/>
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
                    {fallingItems.map((item) => (
                        <motion.div
                            key={item.id}
                            className={classes.fallingItem}
                            style={{
                                left: `${item.x}%`
                            }}
                            animate={{
                                top: `${item.y}%`
                            }}
                            transition={{
                                type: "tween"
                                // duration: 1// Используем пружинную анимацию
                                //     // stiffness: 100, // Жесткость пружины
                                //     // damping: 25 // Затухание
                            }}
                        >
                            <img src={item.icon} alt="" style={{width: responseSize(42), height: responseSize(42)}}/>
                        </motion.div>
                    ))}
                </div>

                {/*<div className={classes.counter}>*/}
                {/*{ingredients.map((ingredient) => (*/}
                {/*    <div key={ingredient.name} className="countertem">*/}
                {/*        <span>{ingredient.icon}</span>*/}
                {/*        <span>x{collected[ingredient.name]}</span>*/}
                {/*    </div>*/}
                {/*))}*/}
                <div style={{padding: "7px 23px 23px 16px"}}>
                    <Score items={collected.levelItems}/>
                </div>
                {/*</div>*/}

            </div>
        </div>
    );
}

export default Game;
