import * as userTypes from "./usersTypes";
import axios from "axios";

export const getUsersRequest = () => {
	return {
		type: userTypes.GET_USERS_REQUEST,
	};
};

export const getUsersSuccess = (userToken) => {
	return {
		type: userTypes.GET_USERS_SUCCESS,
		payload: userToken,
	};
};

export const getUsersFailure = (err) => {
	return {
		type: userTypes.GET_USERS_FAILURE,
		payload: err,
	};
};

export const getUsers = () => {
	return (dispatch) => {
		dispatch(getUsersRequest());
		axios
			.get("http://localhost:5000/most-liked")
			.then((res) => {
				dispatch(getUsersSuccess(res.data));
			})
			.catch((err) => {
				if (!err.response || !err.response.data) dispatch(getUsersFailure(err.message));
				else if (err.response.data.includes("<!DOCTYPE html>")) dispatch(getUsersFailure(err.message));
				else dispatch(getUsersFailure(err.response.data));
			});
	};
};
