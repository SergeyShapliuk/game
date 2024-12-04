import {useCallback, useEffect, useRef, useState} from "react";
import classes from "./Game.module.css";

import image from "../../assets/small-image.webp";
import {motion} from "motion/react";
import Score from "../ui/Score";
import useScreenSize from "../../hooks/useScreenSize";
import Pause from "../ui/Pause";
import Panel from "../ui/Panel";
import GamePause from "./GamePause";
import {LeveItems} from "./GameComponent";


// const ingredients = [
//     {id: 1, name: "meatball", icon: meatball},
//     {id: 2, name: "pumpkin", icon: pumpkin},
//     {id: 3, name: "garlic", icon: onion},
//     {id: 4, name: "tomato", icon: tomato},
//     {id: 4, name: "redPepper", icon: redPepper}
// ];

const ROWS = [10, 30, 60, 80];
const swipeThreshold = 100; // Минимальная длина свайпа для срабатывания
const minSwipeSpeed = 5;

type GameProps = {
    levelItems: LeveItems
}

function Game({levelItems}: GameProps) {
    const {responseSize, responseFontSize} = useScreenSize();

    const constraintsRef = useRef<any>(null);
    const planeRef = useRef<HTMLDivElement | null>(null);
    const startTouchX = useRef<number | null>(null);
    const startTouchTime = useRef<number | null>(null);
    const [fallingItems, setFallingItems] = useState([]);
    const [collected, setCollected] = useState({
        carrot: 0,
        pumpkin: 0,
        garlic: 0,
        tomato: 0
    });
    const [planeRowIndex, setPlaneRowIndex] = useState(1);
    const [planeRow, setPlaneRow] = useState(2);
    const [planeX, setPlaneX] = useState(0);
    const [fallingSpeed] = useState(0.2);
    const [isPaused, setIsPaused] = useState(false);

    // console.log("targetPosition", planeRef.current?.getBoundingClientRect());
    console.log("fallingItems", collected);
    const generateFallingItems = () => {
        const xPosition = ROWS[Math.floor(Math.random() * ROWS.length)];
        const randomItem = levelItems.levelItems[Math.floor(Math.random() * levelItems.levelItems.length)];
        const itemsToAdd = [];
        // ROWS.forEach((row) => {
        //     const numItems = Math.floor(Math.random() * 3) + 1; // Генерация от 1 до 3 предметов в ряду
        //     const rowDelay = Math.random() * 2000; // Рандомная задержка для ряда в миллисекундах (0-2000)
        //     for (let i = 0; i < numItems; i++) {
        const randomIngredient =
            levelItems.levelItems[Math.floor(Math.random() * levelItems.levelItems.length)];
        itemsToAdd.push({
            ...randomIngredient,
            id: new Date().getTime(), // Уникальный id
            x: xPosition, // Позиция по оси X
            y: 0 // Начальная позиция по оси Y с задержкой
            // rowDelay
            // speed:2
        });
        // }
        // });
        setFallingItems((prevItems) => [...prevItems, ...itemsToAdd]);
    };

    const animateFallingItems = useCallback(() => {
        fallingItems.forEach((item) => {
            setTimeout(() => {
                // Логика анимации падения для каждого предмета
                setFallingItems((prevItems) =>
                    prevItems.map((prevItem) =>
                        prevItem.id === item.id
                            ? {...prevItem, y: prevItem.y + 10} // Обновляем позицию по Y
                            : prevItem
                    )
                );
            }, item.rowDelay); // Используем задержку для ряда
        });
    }, [fallingItems]);
    // Добавляем падающие предметы
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(generateFallingItems, 1000); // Интервал от 1 до 3 секунд

        return () => clearInterval(interval);
    }, [isPaused]);

    useEffect(() => {
        let animationFrame;

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
                                setCollected((prev) => ({
                                    ...prev,
                                    [item.name]: (prev[item.name] || 0) + 1
                                }));
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
    const handleMouseMove = useCallback((e) => {
        const container = e.target.getBoundingClientRect();
        const x = ((e.clientX - container.left) / container.width) * 100;
        // Находим ближайший ряд
        const closestRow = ROWS.reduce(
            (closest, row, idx) =>
                Math.abs(row - x) < Math.abs(ROWS[closest] - x) ? idx : closest,
            0
        );
        setPlaneRow(closestRow); // Устанавливаем целевой ряд
    }, []);

    const movePlane = (direction) => {
        setPlaneRowIndex((prevIndex) => {
            const newIndex = prevIndex + direction;
            if (newIndex < 0 || newIndex >= ROWS.length) return prevIndex; // Ограничиваем движение
            return newIndex;
        });
    };

    const handleKeyDown = useCallback(
        (event) => {
            if (event.code === "ArrowLeft" || event.code === "KeyA") {
                movePlane(-1); // Влево
            } else if (event.code === "ArrowRight" || event.code === "KeyD") {
                movePlane(1); // Вправо
            }
        },
        []
    );

    const handleTouchStart = (e) => {
        const touchX = e.touches[0].clientX; // Сохраняем начальную точку свайпа
        startTouchX.current = touchX;
        startTouchTime.current = Date.now();
    };

    // Движение пальца
    const handleTouchMove = (e) => {
        const touchX = e.touches ? e.touches[0].clientX : e.clientX; // Получаем X-координату свайпа или мыши
        if (startTouchX.current === null) {
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
            startTouchX.current = null;
            startTouchTime.current = null;
        }
    };

    // Завершение жеста
    const handleTouchEnd = () => {
        startTouchX.current = null; // Сбрасываем начальную точку
    };

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
                {isPaused && <GamePause resume={() => setIsPaused(false)}/>}
                <header className={classes.header}>
                    <Pause onPress={() => setIsPaused(true)}/>
                    <Panel/>
                    <div className={classes.level}>
                    <span style={{
                        color: "#6CA2FF",
                        fontFamily: "Modak",
                        fontSize: responseFontSize(16),
                        lineHeight: responseFontSize(24)
                    }}>{"Yp.1"}</span>
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
                    <div
                        ref={planeRef}
                        // drag="x"
                        // dragMomentum={false}
                        // dragTransition={{velocity: 0.1}}
                        // dragConstraints={constraintsRef}
                        className={classes.plane}
                        // animate={{left: `${startTouchX?.current}px`}} // Анимируем положение самолета
                        // transition={{type: "spring", stiffness: 300, damping: 25}}
                        // style={{left: `${planeX}px`}}
                        style={{left: `${ROWS[planeRowIndex]}%`}}
                        // style={{ position: 'absolute', top: '50%' }}
                    >
                        ✈️
                    </div>
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
                    <Score items={levelItems.levelItems}/>
                </div>
                {/*</div>*/}

            </div>
        </div>
    );
}

export default Game;
