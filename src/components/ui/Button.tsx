import useScreenSize from "../../hooks/useScreenSize";
import {motion} from "motion/react";
import play from "../../assets/play.webp";

type ButtonProps = {
    onPress: () => void;
    text: string;
    icon?: boolean;
    width?: number;
}

function Button({onPress, text, icon, width}: ButtonProps) {
    const {responseSize} = useScreenSize();
    return (
        <motion.button whileTap={{scale: 0.85}} onTap={onPress} style={{
            width: responseSize(width ? width : 227),
            height: responseSize(59),
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(180deg, #F2DEB9 0%, #DABB98 100%)",
            borderRadius: responseSize(50),
            boxShadow: "0px 1px 0px 0px #FFFFFF96",
            gap: responseSize(7),
            cursor: "pointer"
        }}>
            {icon && <img src={play} alt="" style={{width: responseSize(27)}}/>}
            <div style={{
                color: "#876C46",
                fontFamily: "inherit",
                fontSize: responseSize(20),
                lineHeight: responseSize(27.28),
                fontWeight: "900"

            }}>{text}</div>
        </motion.button>
    );
}

export default Button;
