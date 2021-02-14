import * as usersTypes from "./usersTypes";

const initialState = {
	loading: false,
	data: [],
	error: "",

};

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case usersTypes.GET_USERS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case usersTypes.GET_USERS_SUCCESS:
			return {
				...state,
				loading: false,
				error: "",
				data: action.payload
			};
		case usersTypes.GET_USERS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default usersReducer;
