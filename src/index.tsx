import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import * as serviceWorker from "./serviceWorker";

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

serviceWorker.unregister();