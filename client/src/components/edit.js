import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm, ErrorMessage } from "react-hook-form";

import { editUser, fetchUserById } from "../actions/index";

const Edit = (props) => {
	const params = new URLSearchParams(props.location.search);
	const userId = params.get("id");
	// console.log(userId);
	const [initalVal, setInitialVal] = useState({});
	const { register, errors, handleSubmit } = useForm();
	const { push } = useHistory();

	const dispatch = useDispatch();
	console.count("edit");
	useEffect(() => {
		async function fetchData() {
			const profile = await dispatch(fetchUserById(userId));
			// console.log(profile);
			setInitialVal(profile[0]);
		}
		fetchData();
	}, []);

	function editFormValues(e) {
		// console.log(e);
		// if (e.hasOwnProperty("profileImg")) {
		// }
		const data = new FormData();
		data.append("profileImg", e.profileImg[0]);
		data.append("first_name", e.first_name);
		data.append("last_name", e.last_name);
		data.append("subject", e.subject);
		data.append("id", userId);

		// console.log(formData);
		dispatch(editUser(data, push));
	}

	return (
		<div>
			<h2>Edit User</h2>
			<form noValidate onSubmit={handleSubmit(editFormValues)}>
				<i>
					All fields are required except image. Don't upload a new image if you
					dont want to update it
				</i>
				<div className="form-group">
					<input
						type="text"
						defaultValue={initalVal.first_name}
						className="form-control form-control-lg"
						placeholder="* First name"
						name="first_name"
						required
						ref={register({ required: "This is required" })}
					/>
					<ErrorMessage
						className="alert-danger"
						errors={errors}
						name="first_name"
						as="p"
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						defaultValue={initalVal.last_name}
						className="form-control form-control-lg"
						placeholder="* Last name"
						name="last_name"
						required
						ref={register({ required: "This is required" })}
					/>
					<ErrorMessage
						className="alert-danger"
						errors={errors}
						name="last_name"
						as="p"
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						defaultValue={initalVal.subject}
						className="form-control form-control-lg"
						placeholder="* Subject"
						name="subject"
						required
						ref={register({ required: "This is required" })}
					/>
					<ErrorMessage
						className="alert-danger"
						errors={errors}
						name="subject"
						as="p"
					/>
				</div>
				<div className="form-group">
					<input
						type="file"
						ref={register({ required: false })}
						name="profileImg"
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Edit;
