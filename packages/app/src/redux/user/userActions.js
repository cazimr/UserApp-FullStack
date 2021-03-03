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
	if (localStorage.getItem("me")) localStorage.removeItem("me");
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
	//Invalid or expired token, or maybe something else, but for safety reasons we will log out user
	if (localStorage.getItem("me")) localStorage.removeItem("me");
	if (err === "Access Denied") {
		alert("Access Denied. Please login again");
	} else alert(err + ". Please try again");

	return {
		type: userTypes.GET_USER_INFO_FAILURE,
		payload: err,
	};
};

export const userLikeRequest = () => {
	return {
		type: userTypes.USER_LIKE_REQUEST,
	};
};

export const userLikeSuccess = (likedUser) => {
	return {
		type: userTypes.USER_LIKE_SUCCESS,
		payload: likedUser,
	};
};

export const userLikeFailure = (err) => {
	return {
		type: userTypes.USER_LIKE_FAILURE,
		payload: err,
	};
};

export const userUnlikeRequest = () => {
	return {
		type: userTypes.USER_UNLIKE_REQUEST,
	};
};

export const userUnlikeSuccess = (unlikedUser) => {
	return {
		type: userTypes.USER_UNLIKE_SUCCESS,
		payload: unlikedUser,
	};
};

export const userUnlikeFailure = (error) => {
	return {
		type: userTypes.USER_UNLIKE_FAILURE,
		payload: error,
	};
};

export const userLike = (id, token) => {
	return (dispatch) => {
		dispatch(userLikeRequest());
		axios
			.post(`http://localhost:5000/user/${id}/like`, {}, { headers: { "auth-token": token } })
			.then((res) => {
				dispatch(getUserInfo(token));
				dispatch(userLikeSuccess());
			})
			.catch((err) => {
				if (!err.response || !err.response.data) dispatch(userLikeFailure(err.message));
				else if (err.response.data.includes("<!DOCTYPE html>")) dispatch(userLikeFailure(err.message));
				else dispatch(userLikeFailure(err.response.data));
			});
	};
};

export const userUnlike = (id, token) => {
	return (dispatch) => {
		dispatch(userUnlikeRequest());
		axios
			.delete(`http://localhost:5000/user/${id}/unlike`, { headers: { "auth-token": token } })
			.then((res) => {
				dispatch(getUserInfo(token));
				dispatch(userUnlikeSuccess());
			})
			.catch((err) => {
				if (!err.response || !err.response.data) dispatch(userUnlikeFailure(err.message));
				else if (err.response.data.includes("<!DOCTYPE html>")) dispatch(userUnlikeFailure(err.message));
				else dispatch(userUnlikeFailure(err.response.data));
			});
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
				if (!err.response || !err.response.data) dispatch(loginUserFailure(err.message));
				else if (err.response.data.includes("<!DOCTYPE html>")) dispatch(loginUserFailure(err.message));
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
				if (!err.response || !err.response.data) dispatch(getUserInfoFailure(err.message));
				else if (err.response.data.includes("<!DOCTYPE html>")) dispatch(getUserInfoFailure(err.message));
				else dispatch(getUserInfoFailure(err.response.data));
			});
	};
};

export const resetUserPassword = (password, retypePassword, token) => {
	return (dispatch) => {
		if (password !== retypePassword) return dispatch(resetUserPassFailure("Passwords don't match"));

		dispatch(resetUserPassRequest());
		axios
			.put("http://localhost:5000/me/update-password", { password }, { headers: { "auth-token": token } })
			.then((res) => {
				dispatch(resetUserPassSuccess());
			})
			.catch((err) => {
				if (!err.response || !err.response.data) dispatch(resetUserPassFailure(err.message));
				else if (err.response.data.includes("<!DOCTYPE html>")) dispatch(resetUserPassFailure(err.message));
				else dispatch(resetUserPassFailure(err.response.data));
			});
	};
};
