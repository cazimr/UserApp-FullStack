import * as userTypes from "./userTypes";
import axios from "axios";

export const loginUserRequest = () => {
	return {
		type: userTypes.LOGIN_USER_REQUEST,
	};
};

export const loginUserSuccess = (userToken) => {
	return {
		type: userTypes.LOGIN_USER_SUCCESS,
		payload: userToken,
	};
};

export const loginUserFailure = (err) => {
	return {
		type: userTypes.LOGIN_USER_FAILURE,
		payload: err,
	};
};

export const logoutUser = () => {
	if (localStorage.getItem("me")) localStorage.removeItem("me");
	alert("User logged out");
	return {
		type: userTypes.LOGOUT_USER,
	};
};

export const resetUserPassRequest = () => {
	return {
		type: userTypes.USER_PASSWORD_RESET_REQUEST,
	};
};

export const resetUserPassSuccess = () => {
	alert("Password reset successful. Please login");
	return {
		type: userTypes.USER_PASSWORD_RESET_SUCCESS,
	};
};

export const resetUserPassFailure = (err) => {
	return {
		type: userTypes.USER_PASSWORD_RESET_FAILURE,
		payload: err,
	};
};

export const getUserInfoRequest = () => {
	return {
		type: userTypes.GET_USER_INFO_REQUEST,
	};
};

export const getUserInfoSuccess = (data) => {
	return {
		type: userTypes.GET_USER_INFO_SUCCESS,
		payload: data,
	};
};

export const getUserInfoFailure = (err) => {
	//Invalid or expired token
	if (err === "Acces Denied") {
		if (localStorage.getItem("me")) localStorage.removeItem("me");
		alert("Access Denied. Please login again");
	} else alert(err + ". Please try again");

	return {
		type: userTypes.GET_USER_INFO_FAILURE,
		payload: err,
	};
};

export const login = (username, password) => {
	return (dispatch) => {
		dispatch(loginUserRequest());
		axios
			.post("http://localhost:5000/login", { username: username, password: password })
			.then((res) => {
				dispatch(loginUserSuccess(res.headers["auth-token"]));
			})
			.catch((err) => {
				if (err.response.data.includes("<!DOCTYPE html>")) dispatch(loginUserFailure(err.message));
				else dispatch(loginUserFailure(err.response.data));
			});
	};
};

export const getUserInfo = (token) => {
	return (dispatch) => {
		dispatch(getUserInfoRequest());
		axios
			.get("http://localhost:5000/me", { headers: { "auth-token": token } })
			.then((res) => {
				dispatch(getUserInfoSuccess(res.data));
			})
			.catch((err) => {
				if (err.response.data.includes("<!DOCTYPE html>")) dispatch(getUserInfoFailure(err.message));
				else dispatch(getUserInfoFailure(err.response.data));
			});
	};
};

export const resetUserPassword = (password, token) => {
	return (dispatch) => {
		dispatch(resetUserPassRequest());
		axios
			.put("http://localhost:5000/me/update-password", { password }, { headers: { "auth-token": token } })
			.then((res) => {
				console.log("RESPONSE",res);
				dispatch(resetUserPassSuccess());
			})
			.catch((err) => {
				if (err.response.data.includes("<!DOCTYPE html>")) dispatch(resetUserPassFailure(err.message));
				else dispatch(resetUserPassFailure(err.response.data));
			});
	};
};
