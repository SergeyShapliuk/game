import panel from "../../assets/panel.webp";
import star from "../../assets/star.webp";


function Panel() {
    return (
        <div style={{
            position: "relative",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <img src={panel} alt="" style={{display: "block"}}/>
            <div style={{
                position: "absolute",
                width: "80%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "7px" // Отступы между элементами
            }}>
                <img src={star} alt="" style={{width: 30, height: 31}}/>
                <span style={{
                    flex: 1,
                    color: "#772E5F",
                    fontFamily: "Modak",
                    fontSize: 27,
                    lineHeight: "41px",
                    textAlign: "center",
                    marginRight: 7
                }}>
            3244
        </span>
            </div>
        </div>
    );
}

export default Panel;
