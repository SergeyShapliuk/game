import {useState, useEffect} from "react";

interface ScreenSize {
    width: number;
    height: number;
}

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState<ScreenSize>({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const updateScreenSize = () => {
            const width = window.visualViewport ? window.visualViewport.width : window.innerWidth;
            const height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
            setScreenSize({width, height});
        };

        updateScreenSize();

        window.addEventListener("resize", updateScreenSize);
        window.visualViewport?.addEventListener("resize", updateScreenSize);

        return () => {
            window.removeEventListener("resize", updateScreenSize);
            window.visualViewport?.removeEventListener("resize", updateScreenSize);
        };
    }, []);

    const responseFontSize = (size: number) => {
        return `${screenSize.width * size / 390}px`;
    };

    const responseSize = (size: number) => {
        const widthRatio = screenSize.width / 390;
        const heightRatio = screenSize.height / 844;
        const adaptiveRatio = Math.min(widthRatio, heightRatio);
        return `${size * adaptiveRatio}px`;
    };

    return {screenSize, responseSize, responseFontSize};
};

export default useScreenSize;
