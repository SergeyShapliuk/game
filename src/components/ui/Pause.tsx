import useScreenSize from "../../hooks/useScreenSize";
import {motion} from "motion/react";


function Pause({onPress}: { onPress: () => void }) {
    const {responseSize} = useScreenSize();
    return (
        <motion.button whileTap={{scale: 0.85}} onTap={onPress}
                       style={{display: "inline-flex", backgroundColor: "transparent", gap: responseSize(6)}}>
            <div style={{
                width: responseSize(6),
                height: responseSize(24),
                backgroundColor: "#6296F1",
                borderRadius: responseSize(2)
            }}/>
            <div style={{
                width: responseSize(6),
                height: responseSize(24),
                backgroundColor: "#6296F1",
                borderRadius: responseSize(2)
            }}/>
        </motion.button>
    );
}

export default Pause;
