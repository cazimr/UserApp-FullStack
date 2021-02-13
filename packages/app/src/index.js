import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { store } from "./redux";
import theme from "./theme";
import Routes from "./routes";
import "antd/dist/antd.css";

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Routes />
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
}

ReactDOM.render(<App />, document.getElementById("root"));
