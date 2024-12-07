import {createContext, useState, useContext, ReactNode} from "react";

interface ServiceContextProps {
    isAnimation: boolean;
    isPaused: boolean;
    setAnimation: (value: boolean) => void;
    setPaused: (value: boolean) => void;
}

const ServiceContext = createContext<ServiceContextProps | undefined>(undefined);

export const ServiceProvider = ({children}: { children: ReactNode }) => {

    const [isAnimation, setAnimation] = useState<boolean>(false);
    const [isPaused, setPaused] = useState<boolean>(false);


    return (
        <ServiceContext.Provider value={{isAnimation, isPaused, setAnimation, setPaused}}>
            {children}
        </ServiceContext.Provider>
    );
};

export const useService = () => {
    const context = useContext(ServiceContext);
    if (!context) {
        throw new Error("useScreenSize must be used within a ScreenSizeProvider");
    }
    return context;
};
