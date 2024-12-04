import classes from "../game/GameComponent.module.css";
import redPepper from "../../assets/red-pepper.webp";
import tomato from "../../assets/tomato.webp";
import meatball from "../../assets/meatball.webp";
import onion from "../../assets/onion.webp";
import pumpkin from "../../assets/pumpkin.webp";
import useScreenSize from "../../hooks/useScreenSize";

function Score({items}: {
    items: { item: string, amount: number, icon: HTMLImageElement }[]
}) {
    const {responseSize, responseFontSize} = useScreenSize();
    return (
        <div className={classes.scoreContainer}>
            {items.map((item, index) => (
                <div key={index} className={classes.scoreItemBlock}><img src={item.icon} alt={"Картинка красный перец"}
                                                                         style={{width: responseSize(30)}}/>
                    <span className={classes.scoreItem}
                          style={{fontSize: responseFontSize(18)}}>{`x${item.amount}`}</span>
                </div>
            ))}
            {/*<div className={classes.scoreItemBlock}><img src={redPepper} alt={"Картинка красный перец"}*/}
            {/*                                             style={{width: responseSize(21)}}/>*/}
            {/*    <span className={classes.scoreItem} style={{fontSize: responseFontSize(18)}}>x1</span></div>*/}
            {/*<div className={classes.scoreItemBlock}><img src={tomato} alt={"Картинка томат"}*/}
            {/*                                             style={{width: responseSize(28)}}/>*/}
            {/*    <span className={classes.scoreItem} style={{fontSize: responseFontSize(18)}}>x3</span></div>*/}
            {/*<div className={classes.scoreItemBlock}><img src={meatball} alt={"Картинка митболл"}*/}
            {/*                                             style={{width: responseSize(23)}}/>*/}
            {/*    <span className={classes.scoreItem} style={{fontSize: responseFontSize(18)}}>x6</span></div>*/}
            {/*<div className={classes.scoreItemBlock}><img src={onion} alt={"Картинка чеснок"}*/}
            {/*                                             style={{width: responseSize(24)}}/>*/}
            {/*    <span className={classes.scoreItem} style={{fontSize: responseFontSize(18)}}>x3</span></div>*/}
            {/*<div className={classes.scoreItemBlock}><img src={pumpkin} alt={"Картинка тыква"}*/}
            {/*                                             style={{width: responseSize(25)}}/>*/}
            {/*    <span className={classes.scoreItem} style={{fontSize: responseFontSize(18)}}>x1</span></div>*/}
        </div>
    );
}

export default Score;
