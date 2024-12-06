import classes from "../game/GameComponent.module.css";
import redPepper from "../../assets/red-pepper.webp";
import tomato from "../../assets/tomato.webp";
import meatball from "../../assets/meatball.webp";
import onion from "../../assets/onion.webp";
import pumpkin from "../../assets/pumpkin.webp";
import check from "../../assets/check.webp";
import useScreenSize from "../../hooks/useScreenSize";

const levelItems = [{item: "onion", amount: 3, icon: onion}, {
    item: "redPepper",
    amount: 1,
    icon: redPepper
}, {item: "tomato", amount: 3, icon: tomato}, {
    item: "meatball",
    amount: 6,
    icon: meatball
}, {item: "pumpkin", amount: 1, icon: pumpkin}];

function Score({items}: {
    items?: { item: string, amount: number, icon: string }[]
}) {
    const {responseSize} = useScreenSize();

    const gameItems = items ? items : levelItems;
    return (
        <div className={classes.scoreContainer}>
            {(gameItems.map((item, index) => (
                    <div key={index} className={classes.scoreItemBlock}><img src={item.icon}
                                                                             alt={"Картинка красный перец"}
                                                                             style={{width: responseSize(30)}}/>
                        {item.amount > 0 ? (<span className={classes.scoreItem}
                                                  style={{fontSize: responseSize(18)}}>{`x${item.amount}`}</span>) : (
                            <img src={check} alt="" style={{marginTop: 7}}/>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default Score;
