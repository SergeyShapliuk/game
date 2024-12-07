import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {CounterProvider} from "./common/ context/CounterProvider";
import {ServiceProvider} from "./common/ context/ServiceProvider";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <CounterProvider>
            <ServiceProvider>
                <App/>
            </ServiceProvider>
        </CounterProvider>
    </StrictMode>
);
