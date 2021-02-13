import * as userTypes from "./userTypes";

const initialState = {
	loading: false,
	loggedIn: localStorage.getItem("me") ? true : false,
	token: localStorage.getItem("me") ? localStorage.getItem("me") : "",
	error: "",
	data: {},
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case userTypes.LOGIN_USER_REQUEST:
			return {
				...state,
				loading: true,
			};
		case userTypes.LOGIN_USER_SUCCESS:
			return {
				...state,
				loading: false,
				error: "",
				loggedIn: true,
				token: action.payload,
			};
		case userTypes.LOGIN_USER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case userTypes.LOGOUT_USER:
			return {
				loading: false,
				loggedIn: false,
				token: "",
				error: "",
				data: {},
			};

		case userTypes.GET_USER_INFO_REQUEST:
			return {
				...state,
				loading: true,
			};
		case userTypes.GET_USER_INFO_SUCCESS:
			return {
				...state,
				loading: false,
				error: "",
				loggedIn: true,
				data: action.payload,
			};
		case userTypes.GET_USER_INFO_FAILURE:
			return {
				loading: false,
				loggedIn: false,
				token: "",
				error: "",
				data: {},
			};
		case userTypes.USER_PASSWORD_RESET_REQUEST:
			return {
				...state,
				loading: true,
			};
		case userTypes.USER_PASSWORD_RESET_SUCCESS:
			return {
				loading: false,
				loggedIn: false,
				token: "",
				error: "",
				data: {},
			};
		case userTypes.USER_PASSWORD_RESET_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default userReducer;
