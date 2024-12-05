import {createContext, useState, useContext, ReactNode, useEffect} from "react";

interface CounterContextProps {
    starCounter: number;
    setStarCounter: (value: number | ((prevCount: number) => number)) => void;
}

const CounterContext = createContext<CounterContextProps | undefined>(undefined);

export const CounterProvider = ({children}: { children: ReactNode }) => {

    const [starCounter, setStarCounter] = useState<number>(0);

    useEffect(() => {
        const countStar = sessionStorage.getItem("star");
        if (countStar) {
            setStarCounter(Number(countStar));
        }
    }, []);

    return (
        <CounterContext.Provider value={{starCounter, setStarCounter}}>
            {children}
        </CounterContext.Provider>
    );
};

export const useCounter = () => {
    const context = useContext(CounterContext);
    if (!context) {
        throw new Error("useScreenSize must be used within a ScreenSizeProvider");
    }
    return context;
};
