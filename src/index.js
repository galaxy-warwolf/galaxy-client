import React from "react";
import { render } from "react-dom";
import App from "./app.js";
import "./styles/main.scss";
import configureStore from "./redux/config/configureStore";

const store = configureStore();
/**
 *
 * 初始启动文件
 *
 */
render(<App store={store}/>, document.querySelector("#app"));
