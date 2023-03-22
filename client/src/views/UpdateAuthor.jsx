import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

// 1. get id from params (useParams)
// 2. use id to get data from api when it is mounted (useEffect, useState, axios)

// 3. form to track all the input (useState)
// 4. after submit - post data to backend  (axios)
// 5. after successful submit - useNavigate

const UpdateAuthor = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/authors/${id}`) // obtaining the pre-polulated data
      .then((response) => {
        const author = response.data;
        setName(author.name);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAuthor = { name };
    axios
      .put(`http://localhost:8000/api/authors/update/${id}`, updatedAuthor) // send updated info to backend
      .then((response) => {
        navigate(`/`);
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
      <h3>Edit this author </h3>
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
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleCancel()}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-success">
          {" "}
          Submit
        </button>
      </form>
      {errors.map((eachErr, idx) => (
        <p style={{ color: "red" }}> {eachErr}</p>
      ))}
    </div>
  );
};

export default UpdateAuthor;
