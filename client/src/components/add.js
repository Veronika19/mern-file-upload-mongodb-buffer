import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm, ErrorMessage } from "react-hook-form";

import { submitUser } from "../actions/index";

function Add(props) {
  console.count("add");
  const { register, errors, handleSubmit } = useForm();
  const { push } = useHistory();

  const dispatch = useDispatch();

  function getFormValues(e) {
    // console.log(e);
    const data = new FormData();
    data.append("profileImg", e.profileImg[0]);
    data.append("first_name", e.first_name);
    data.append("last_name", e.last_name);
    data.append("subject", e.subject);

    // console.log(formData);
    dispatch(submitUser(data, push));
  }

  return (
    <div>
      <h2>Add User</h2>
      <form noValidate onSubmit={handleSubmit(getFormValues)}>
        <i>All fields are required</i>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="* First name"
            name="first_name"
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
            className="form-control form-control-lg"
            placeholder="* Last name"
            name="last_name"
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
            className="form-control form-control-lg"
            placeholder="* Subject"
            name="subject"
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
            ref={register({ required: "This is required" })}
            name="profileImg"
          />
          <ErrorMessage
            className="alert-danger"
            errors={errors}
            name="profileImg"
            as="p"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Add;
