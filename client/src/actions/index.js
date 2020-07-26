import axios from "axios";
import { FETCH_USERS } from "./type";

export const fetchUsers = () => async (dispatch) => {
	const res = await axios.get("/api/get_users");
	dispatch({ type: FETCH_USERS, payload: res.data });
};

export const fetchUserById = (userId) => async (dispatch) => {
	const res = await axios.get("/api/get_user", { params: { id: userId } });
	return res.data;
};

export const submitUser = (values, push) => async (dispatch) => {
	await axios.post("/api/add_user", values);
	// dispatch({ type: FETCH_USERS, payload: res.data });
	push("/");
};

export const deleteUserById = (userId) => async (dispatch) => {
	await axios.delete("/api/delete_user", { data: { userId } });
	dispatch(fetchUsers());
};

export const editUser = (values, push) => async (dispatch) => {
	await axios.post("/api/update_user", values);
	// dispatch({ type: FETCH_USERS, payload: res.data });
	push("/");
};
