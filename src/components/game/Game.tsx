import * as React from "react";
import {useCallback, useEffect, useRef, useState} from "react";
import classes from "./Game.module.css";
import star from "../../assets/star.webp";
import {motion} from "motion/react";
import Score from "../ui/Score";
import useScreenSize from "../../hooks/useScreenSize";
import Pause from "../ui/Pause";
import Panel from "../ui/Panel";
import GamePause from "./GamePause";
import {useCounter} from "../../common/ context/CounterProvider";
import GameError from "./GameError";
import {Foods, LeveItems} from "../../data/LevelItems";
import Pot from "./Pot";
import {useService} from "../../common/ context/ServiceProvider";
import {LevelAvatarImage} from "../../common/levelImage";


const swipeThreshold = 10; // Минимальная длина свайпа для срабатывания
const minSwipeSpeed = 3;

type GameProps = {
    levelItems: LeveItems;
    levelComplete: () => void;
}
type GeneratedItem = {
    id: number;
    item: string;
    x: number;
    y: number;
    icon: string;
    amount?: number;
}

function Game({levelItems, levelComplete}: GameProps) {
    const {screenSize, responseSize} = useScreenSize();
    const {starCounter, setStarCounter} = useCounter();
    const {isPaused, setPaused} = useService();

    const gameZoneRef = useRef<HTMLDivElement | null>(null);
    const planeRef = useRef<HTMLDivElement | null>(null);
    const startTouchX = useRef<number>(0);
    const startTouchTime = useRef<number>(0);
    const [fallingItems, setFallingItems] = useState<GeneratedItem[]>([]);
    const [collected, setCollected] = useState<LeveItems>(levelItems);
    const [collectedPot, setCollectedPot] = useState<GeneratedItem>();
    const [countStar, setCountStar] = useState<number>(starCounter);
    const [planeRowIndex, setPlaneRowIndex] = useState(2);
    const [planePosition, setPlanePosition] = useState(-100);
    const [planeRect, setPlaneRect] = useState<DOMRect | null>(null); // Позиция самолета по оси X
    const [gameRect, setGameRect] = useState<DOMRect | null>(null); // Позиция самолета по оси X

    const [fallingSpeed] = useState(0.2);
    const [isError, setIsError] = useState<boolean>(false);
    const [isBonus, setBonus] = useState<boolean>(false);
    const [itemSize, setItemSize] = useState<number>();

    useEffect(() => {
        const updateDimensions = () => {
            if (planeRef.current && gameZoneRef.current) {
                setPlaneRect(planeRef.current!.getBoundingClientRect());
                setGameRect(gameZoneRef.current!.getBoundingClientRect());
            }
        };
        updateDimensions();
        window.addEventListener("resize", updateDimensions);

        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, []);

    useEffect(() => {
        if (gameRect) {
            setItemSize(getItemSize(42));
        }
    }, [gameRect]);

    const getItemSize = (size: number) => {
        const widthRatio = screenSize.width / 390;
        const heightRatio = screenSize.height / 844;
        const adaptiveRatio = Math.min(widthRatio, heightRatio);
        return size * adaptiveRatio;
    };

    const generateFallingItems = () => {
        if (!gameRect || !itemSize) return;
        const sectorWidth = gameRect?.width / 4;
        const sector = Math.floor(Math.random() * 4);

        const xPos = (sector * sectorWidth + sectorWidth / 2);
        const xPositionPercent = (xPos / gameRect?.width) * 100;
        const itemPercent = (itemSize / gameRect?.width) * 100;
        const xPosition = xPositionPercent - itemPercent / 2;

        const itemsToAdd: GeneratedItem[] = [];
        const randomChoice = Math.random(); // Генерация случайного числа от 0 до 1
        if (randomChoice < 0.5) {
            // Вероятность 50%
            const randomIngredient =
                levelItems.levelItems[Math.floor(Math.random() * levelItems.levelItems.length)];
            itemsToAdd.push({
                ...randomIngredient,
                id: new Date().getTime(),
                x: xPosition,
                y: 0
            });
        } else {
            const random = Math.random();
            if (random < 0.3) {
                const levelFoodItems = Object.keys(levelItems);
                const remainingFoods = Foods.filter(food => !levelFoodItems.includes(food.name));
                const randomFood = remainingFoods[Math.floor(Math.random() * remainingFoods.length)];

                itemsToAdd.push({
                    item: randomFood.name, // Уникальное имя звезды
                    id: new Date().getTime(), // Уникальный ID
                    x: xPosition, // Позиция по оси X
                    y: 0, // Начальная позиция Y
                    icon: randomFood.icon // Иконка для звезды
                });
            } else {
                itemsToAdd.push({
                    item: "star",
                    id: new Date().getTime(),
                    x: xPosition,
                    y: 0,
                    icon: star
                });
            }
        }
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
        if (gameRect && planeRect) {
            const sectorWidth = gameRect.width / 4;
            const initialXPosition = (planeRowIndex - 1) * sectorWidth + sectorWidth / 2;
            const planePercent = (planeRect.width / gameRect.width) * 100;
            const initialXPositionPercent = (initialXPosition / gameRect.width) * 100;
            setPlanePosition(initialXPositionPercent - planePercent / 2);
        }
    }, [gameRect, planeRect, planeRowIndex]);
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(generateFallingItems, 1000); // Интервал от 1 до 3 секунд

        return () => clearInterval(interval);
    }, [itemSize, isPaused]);

    useEffect(() => {
        if (collectedPot) {
            const find = collectedPot.item === "star" || levelItems.levelItems.find(item => item.item === collectedPot.item);
            if (!find) {
                setIsError(true);
                setPaused(true);
                return;
            }
            const timer = setTimeout(() => {
                setCollectedPot(undefined);
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
                            const currentPlaneRect = planeRef.current && planeRef.current!.getBoundingClientRect();
                            // const gameRect = gameZoneRef.current && gameZoneRef.current!.getBoundingClientRect();
                            if (!currentPlaneRect || !gameRect) return true;

                            const planeX = currentPlaneRect.left - gameRect.left;
                            const planeY = currentPlaneRect.top - gameRect.top;
                            const planeWidth = currentPlaneRect.width;
                            const planeHeight = currentPlaneRect.height;

                            // Преобразуем координаты предмета в пиксели
                            const itemX = (item.x / 100) * gameRect.width;
                            const itemY = (item.y / 100) * gameRect.height;

                            // Проверяем столкновение с самолетом
                            const isCollected =
                                itemX >= planeX && // Предмет должен быть правее левого края
                                itemX <= planeX + planeWidth && // Предмет должен быть левее правого края
                                itemY >= planeY && // Предмет ниже верхнего края
                                itemY <= planeY + planeHeight; // Предмет выше нижнего края

                            if (isCollected) {
                                if (item.item === "star") {
                                    setCountStar(prevCount => prevCount + 1);
                                    if (!isBonus) {
                                        setBonus(true);
                                        sessionStorage.setItem("bonus", "true");
                                    }
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

                            return item.y < gameRect.height; // Оставляем предмет, если он не собран и не вышел за нижний край
                        })
                );
            }
            animationFrame = requestAnimationFrame(animate);
        };

        if (!isPaused) {
            animationFrame = requestAnimationFrame(animate);
        }

        return () => cancelAnimationFrame(animationFrame);
    }, [gameRect, isPaused]);


    const movePlane = useCallback((direction: number) => {
        const currentPlaneRect = planeRef.current && planeRef.current!.getBoundingClientRect();
        if (!gameRect || !currentPlaneRect) return; // Убедитесь, что размеры контейнеров доступны

        setPlaneRowIndex((prevIndex) => {
            const newIndex = prevIndex + direction;
            if (newIndex < 1 || newIndex > 4) return prevIndex;

            // Рассчитываем новую позицию
            const sectorWidth = gameRect.width / 4;
            const newXPosition = (newIndex - 1) * sectorWidth + sectorWidth / 2;
            const planePercent = (currentPlaneRect.width / gameRect.width) * 100;
            const newXPositionPercent = (newXPosition / gameRect.width) * 100;
            const xPosition = newXPositionPercent - planePercent / 2;

            if (!isNaN(xPosition)) {
                setPlanePosition(xPosition); // Обновляем позицию только если она корректна
            }
            return newIndex;
        });
    }, [gameRect, planePosition, planeRowIndex]);


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

        if (Math.abs(deltaX) > swipeThreshold && swipeSpeed > minSwipeSpeed) {
            if (deltaX > 0) {
                movePlane(1); // Свайп вправо (переместить влево)
            } else if (deltaX < 0) {
                movePlane(-1); // Свайп влево (переместить вправо)
            }
            startTouchX.current = 0;
            startTouchTime.current = 0;
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === "ArrowLeft" || event.code === "KeyA") {
                movePlane(-1); // Влево
            } else if (event.code === "ArrowRight" || event.code === "KeyD") {
                movePlane(1); // Вправо
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [movePlane]);

    const resumeGame = () => {
        setFallingItems([]);
        setCollected(levelItems);
        setCollectedPot(undefined);
        setCountStar(starCounter);
        setPaused(false);
        setIsError(false);
    };

    return (
        <motion.div ref={gameZoneRef}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 20}}
                    transition={{duration: 0.5}} className={classes.container}>
            {isPaused && !isError &&
            <GamePause star={countStar} level={collected.id} resume={() => setPaused(false)}/>}
            {isError && <GameError icon={collectedPot?.icon} resume={resumeGame}/>}
            <header className={classes.header} style={{marginTop: responseSize(17)}}>
                <Pause onPress={() => setPaused(true)}/>
                <Panel count={countStar}/>
                <div className={classes.level} style={{gap: responseSize(7)}}>
                    <span style={{
                        color: "#6CA2FF",
                        fontFamily: "Modak",
                        fontSize: responseSize(16),
                        lineHeight: responseSize(24)
                    }}>{`Yp.${collected.id}
        `}</span>
                    <div style={{
                        position: "relative",
                        width: responseSize(58),
                        height: responseSize(58),
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "#6CA2FF solid 3px",
                        backgroundColor: "#131439",
                        borderRadius: responseSize(50),
                        zIndex: 1
                    }}>
                        {/*<MemoAvatarMasked width={responseSize(64)} image={LevelImage[2]}/>*/}
                        <img src={LevelAvatarImage[levelItems.id - 1].image} alt=""
                             style={{
                                 position: "absolute",
                                 width: responseSize(LevelAvatarImage[levelItems.id - 1].width ?? 58),
                                 height: "auto",
                                 right: responseSize(LevelAvatarImage[levelItems.id - 1].right),
                                 bottom: responseSize(LevelAvatarImage[levelItems.id - 1].bottom)
                             }}/>
                    </div>
                </div>
            </header>
            <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                // onTouchEnd={handleTouchEnd}
                className={classes.gameContainer}>

                <Pot row={planePosition} collectedPot={collectedPot?.icon} ref={planeRef}/>
                {fallingItems.map((item) => (
                    <FallingItem key={item.id} item={item} isBonus={isBonus}/>
                ))}
            </div>

            <div style={{
                marginTop: "auto",
                alignSelf: "stretch",
                paddingRight: responseSize(23),
                paddingLeft: responseSize(16)
            }}>
                <Score items={collected.levelItems}/>
            </div>

        </motion.div>
    );
}

export default Game;

const FallingItem = React.memo(({item, isBonus}: { item: GeneratedItem, isBonus: boolean }) => {
    const {responseSize} = useScreenSize();
    const bonus = sessionStorage.getItem("bonus");
    return (
        <div
            key={item.id}
            className={classes.fallingItem}
            style={{
                width: responseSize(42),
                height: responseSize(42),
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                left: `${item.x}%`,
                top: `${item.y}%`
            }}
            // animate={{
            //     top: `${item.y} % `
            // }}
            // transition={{
            //     type: "tween"
            //     // duration: 1// Используем пружинную анимацию
            //     //     // stiffness: 100, // Жесткость пружины
            //     //     // damping: 25 // Затухание
            // }}
        >
            <div style={{
                color: "#F9921C",
                fontFamily: "Nunito",
                fontSize: responseSize(12),
                lineHeight: responseSize(14),
                fontWeight: "900",
                visibility: !isBonus && !bonus && item.item === "star" ? "visible" : "hidden",
                transition: "visibility 0.3s"
            }}>БОНУС
            </div>
            <img src={item.icon} alt="" style={{
                width: "100%",
                height: "100%",
                objectFit: "contain"
                // maxWidth: responseSize(32),
                // maxHeight: responseSize(32)
            }}/>
        </div>
    );
});
