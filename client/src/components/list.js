import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUserById } from "../actions/index";

function Listing(props) {
  // const [lists, setLists] = useState([]);
  const dispatch = useDispatch();
  console.count("list");
  const { users } = useSelector((state) => state.users);
  // console.log(users);

  useEffect(() => {
    dispatch(fetchUsers());
    // setLists(users);
  }, []);

  function arrayBufferToBase64(buffer) {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  const deleteUser = (user) => {
    if (window.confirm("Do you want to remove this user ?")) {
      dispatch(deleteUserById(user._id));
    }
  };

  let showUserLists;

  if (users == null) {
    showUserLists = (
      <tr>
        <td colSpan="4">{"Loading ...."}</td>
      </tr>
    );
  } else {
    showUserLists = users.map((user) => {
      let img = "";
      // console.log(user);
      if (typeof user.profileImg.data !== "undefined") {
        let base64Flag = "data:image/jpeg;base64,";
        let imageStr = arrayBufferToBase64(user.profileImg.data.data);
        img = base64Flag + imageStr;
      }
      return (
        <tr key={user._id}>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
          <td>{user.subject}</td>
          <td>
            <img
              src={img}
              height="150"
              alt={user.first_name + " " + user.last_name}
            />{" "}
          </td>
          <td>
            <Link
              to={`/edit?id=${user._id}`}
              className="btn btn-primary btn-sm"
            >
              Edit
            </Link>
            &nbsp; &nbsp;
            <button
              onClick={() => deleteUser(user)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div>
      <h2>Basic Table</h2>
      <p>
        The .table class adds basic styling (light padding and horizontal
        dividers) to a table:
      </p>
      <table className="table">
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>{showUserLists}</tbody>
      </table>
    </div>
  );
}

export default React.memo(Listing);
