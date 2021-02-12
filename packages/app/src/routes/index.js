import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../views/Login";
import MyProfile from "../views/MyProfile";

const Routes = () => {
	const loggedIn = useSelector((state) => state.user.loggedIn);
	const token = useSelector((state) => state.user.token);
	useEffect(() => {
		console.log("Usao");

		if (loggedIn && !localStorage.getItem("me",token)){
			console.log("USAO");
			localStorage.setItem("me", token);
		} 
	}, [loggedIn]);
	return (
		<Switch>
			<Route exact path="/">
				{loggedIn ? <Redirect to="/me" /> : <Redirect to="/login" />}
			</Route>
			<Route
				exact
				path="/login"
				render={(props) => (loggedIn ? <Redirect to="/me" /> : <LoginPage {...props} />)}
			/>
			<PrivateRoute exact path="/me" component={MyProfile} />
		</Switch>
	);
};

export default Routes;
