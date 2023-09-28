import React from "react";
import { createRoot } from "react-dom/client";

import Weight from "./components/Weight.js";

const App = ({}) => {
    return (
        <div>
            <h1>Personal Dashboard</h1>
            <Weight />
        </div>
    );
};

const mountNode = document.getElementById("app");
createRoot(mountNode).render(<App />);
