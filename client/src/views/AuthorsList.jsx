import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// obtain info from backend when the component is mounted (axios, useEffect, useState)

const AuthorsList = () => {
  const [authorsList, setAuthorsList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/authors`)
      .then((response) => {
        setAuthorsList(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (deleteId) => {
    axios
      .delete(`http://localhost:8000/api/authors/delete/${deleteId}`)
      .then((response) => {
        const filteredList = authorsList.filter(
          (eachAuthor) => eachAuthor._id !== deleteId
        );
        setAuthorsList(filteredList);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <p>
        <Link to="/authors/new"> Add an author</Link>
      </p>
      <h3>We have quotes by: </h3>
      <table>
        <thead>
          <tr>
            <th> Name</th>
            <th> Actions available</th>
          </tr>
        </thead>
        <tbody>
          {authorsList.map((eachAuthor, idx) => (
            <tr key={idx}>
              <td> {eachAuthor.name} </td>
              <td>
                <Link to={`/authors/${eachAuthor._id}/edit`}>Edit</Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(eachAuthor._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorsList;
