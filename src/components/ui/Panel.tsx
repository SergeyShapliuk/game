import panel from "../../assets/panel.webp";
import star from "../../assets/star.webp";


function Panel({count}: { count: number }) {
    function formatLargeNumber(number: number): string {
        if (number < 10000) return number.toString();
        if (number >= 1000000) {
            const base = Math.floor(number / 1000000);
            const remainder = Math.floor((number % 1000000) / 100000);
            return remainder === 0 ? `${base}M` : `${base}M${remainder}`;
        }

        const base = Math.floor(number / 1000);
        const remainder = number % 1000;

        if (remainder === 0) {
            return `${base}к`;
        } else {
            const suffix = Math.floor(remainder / 100);
            return `${base}к${suffix}`;
        }
    }

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
            {formatLargeNumber(count)}
        </span>
            </div>
        </div>
    );
}

export default Panel;
