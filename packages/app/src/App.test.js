import User from "./components/User";
import LoginPage from "./views/Login";
import theme from "./theme";
import { ThemeProvider } from "styled-components";
import React from "react";
import { render, fireEvent} from "@testing-library/react";
import { store } from "./redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

//User component
test("Tests User component if showing username and likes", () => {
	const { getByText, getByLabelText } = render(
		<ThemeProvider theme={theme}>
			<User username="test1" likes={3} />
		</ThemeProvider>
	);

	getByText("test1");
	getByText("Likes: 3");
});

//User component
test("Test login page with unexisting user", () => {
	const { getByText, getByPlaceholderText, getAllByText, findByText } = render(
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<LoginPage />
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);

	const username = getByPlaceholderText("Username");
	const password = getByPlaceholderText("Password");
	fireEvent.change(username, { target: { value: "zzzzz" } });
	fireEvent.change(password, { target: { value: "zzzzz" } });
	const results = getAllByText("Login");
	//login button
	fireEvent.click(results[1].closest('button'));

  //asnyc findBy instead of getBy
	findByText(`User with username "zzzzz" doesn't exist!`);
});

//User component
test("Test login with existing user: ccazim1/novass123", () => {
	const { getByText, getByPlaceholderText, getAllByText, findByText } = render(
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<LoginPage />
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);

	const username = getByPlaceholderText("Username");
	const password = getByPlaceholderText("Password");
	fireEvent.change(username, { target: { value: "ccazim1" } });
	fireEvent.change(password, { target: { value: "novass123" } });
	const results = getAllByText("Login");
	//login button
	fireEvent.click(results[1].closest('button'));

  //asnyc findBy instead of getBy

  //Home page. Should have Logout and Users List
	findByText(`Logout`);
  findByText(`Users`);
  findByText(`Reset password`);
});


