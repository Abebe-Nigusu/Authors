import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// form to track all the input (useState)
// after submit - post data to backend  (axios)
// after successful submit - useNavigate
const CreateAuthor = () => {
  const [name, setName] = useState("");

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // send info to backend
    const newAuthor = { name };
    axios
      .post("http://localhost:8000/api/authors/new", newAuthor)
      .then((response) => {
        console.log("successful response");
        console.log(response.data);
        // if successful, redirect
        navigate("/");
      })
      .catch((err) => {
        const errorResponseData = err.response.data.errors;
        const errMsgArr = [];

        for (const eachKey in errorResponseData) {
          errMsgArr.push(errorResponseData[eachKey].message);
        }
        setErrors(errMsgArr);
      });
  };

  const handleCancel = () => {
    navigate(`/`);
  };

  return (
    <div>
      <p>
        <Link to="/"> Home</Link>
      </p>
      <h3>Add a new author: </h3>
      <form onSubmit={handleSubmit}>
        <p>
          <label> Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </p>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleCancel()}
        >
          Cancel
        </button>
        {errors.map((eachErr, idx) => (
          <p style={{ color: "red" }}> {eachErr}</p>
        ))}
      </form>
    </div>
  );
};

export default CreateAuthor;
