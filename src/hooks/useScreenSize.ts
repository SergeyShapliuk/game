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

    return {screenSize, responseFontSize};
};

export default useScreenSize;
