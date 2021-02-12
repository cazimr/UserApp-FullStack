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

export const logoutUser=()=>{
	if(localStorage.getItem("me")) localStorage.removeItem("me");
	return{
		type: userTypes.LOGOUT_USER
	}
}

export const getUserInfoRequest = () => {
	return {
		type: userTypes.GET_USER_INFO_REQUEST,
	};
};

export const getUserInfoSuccess = (data) => {
	return {
		type: userTypes.GET_USER_INFO_SUCCESS,
		payload: data
	};
};

export const getUserInfoFailure = (err) => {
	//Invalid or expired token
	if(err==='Acces Denied'){
		if(localStorage.getItem("me")) localStorage.removeItem("me");
		alert("Access Denied. Please login again");
	}

	return {
		type: userTypes.GET_USER_INFO_FAILURE,
		payload: err
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
				console.log("ERR", err.response.data);
				dispatch(loginUserFailure(err.response.data));
			});
	};
};

export const getUserInfo = (token) => {
	return (dispatch) => {
		dispatch(getUserInfoRequest());
		axios
			.get("http://localhost:5000/me",{ headers: { "auth-token": token } })
			.then((res) => {dispatch(getUserInfoSuccess(res.data))})
			.catch((err) => {
				let errMessage=err.message;
				if(err.res && err.res.data) errMessage=err.res.data;
				dispatch(getUserInfoFailure(errMessage))
			});
	};
};
