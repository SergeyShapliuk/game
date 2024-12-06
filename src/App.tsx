import "./App.css";
import GameComponent from "./components/game/GameComponent";
import bowl1 from "./assets/bowl1.webp";
import bowl2 from "./assets/bowl2.webp";
import tomato from "./assets/bg-tomato.webp";
import carrot from "./assets/bg-carrot.webp";
import useScreenSize from "./hooks/useScreenSize";

function App() {
    const {responseSize} = useScreenSize();
    return (
        <div className="app">
            <img src={bowl2} alt={""}
                 style={{
                     position: "absolute",
                     width: responseSize(298),
                     top: responseSize(73),
                     left: responseSize(-185),
                     zIndex: 0
                 }}/>
            <img src={bowl1} alt={""}
                 style={{
                     position: "absolute",
                     width: responseSize(253),
                     top: responseSize(605),
                     right: responseSize(-112),
                     zIndex: 0
                 }}/>
            <img src={tomato} alt={""}
                 style={{
                     position: "absolute",
                     width: responseSize(98),
                     top: responseSize(111),
                     left: responseSize(242),
                     zIndex: 0
                 }}/>
            <img src={carrot} alt={""}
                 style={{
                     position: "absolute",
                     width: responseSize(151),
                     top: responseSize(379),
                     left: responseSize(45),
                     zIndex: 0
                 }}/>
            <GameComponent/>
        </div>
    );
}

export default App;
