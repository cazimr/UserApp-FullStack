import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../views/Login";
import Home from "../views/Home";
import SignupPage from "../views/Signup";
import PasswordResetPage from "../views/PasswordReset";

const Routes = () => {
	const loggedIn = useSelector((state) => state.user.loggedIn);
	const token = useSelector((state) => state.user.token);
	useEffect(() => {
		if (loggedIn && !localStorage.getItem("me", token)) {
			localStorage.setItem("me", token);
		}
	}, [loggedIn]);

	return (
		<Switch>
			<Route exact path="/">
				<Redirect to="/home" />
			</Route>
			<Route
				exact
				path="/login"
				render={(props) => (loggedIn ? <Redirect to="/home" /> : <LoginPage {...props} />)}
			/>
			<Route exact path="/home" component={Home} />
			<Route
				exact
				path="/signup"
				render={(props) => (loggedIn ? <Redirect to="/home" /> : <SignupPage {...props} />)}
			/>
						<Route
				exact
				path="/resetPassword"
				render={(props) => (loggedIn ?  <PasswordResetPage {...props} />: <Redirect to="/login" />)}
			/>
		</Switch>
	);
};

export default Routes;
