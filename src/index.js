import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
