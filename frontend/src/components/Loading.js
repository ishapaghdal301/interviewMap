import React from "react";

import spinner from "../assets/images/Spinner-2.gif";
import "../assets/styles/Loading.css";

const Loading = () => (
    <div className="loading">
        <img src={spinner} alt="loading" />
    </div>
);

export default Loading;
