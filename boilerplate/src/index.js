import React, { Component } from "react";
import Home from "./Home/Home";
import ReactDOM from "react-dom";
import "./style.scss";

class App extends Component {
	render() {
		return <Home />;
	}
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
