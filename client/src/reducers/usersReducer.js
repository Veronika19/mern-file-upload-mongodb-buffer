import { FETCH_USERS } from "../actions/type";

const initialState = {
	users: null,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_USERS:
			return {
				users: action.payload,
			};

		default:
			return state;
	}
}
