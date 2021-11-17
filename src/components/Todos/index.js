import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Todos = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    const user = JSON.parse(userStorage);
    setUser(user);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line
  }, []);

  const getTodos = async () => {
    const userStorage = localStorage.getItem("user");
    const userData = JSON.parse(userStorage);
    const res = await axios.post("http://localhost:5000/todo/getAll", {
      username: userData.username,
    });
    setTodos(res.data);
  };

  const addTodos = async () => {
    const userStorage = localStorage.getItem("user");
    const userData = JSON.parse(userStorage);
    const res = await axios.post("http://localhost:5000/todo/getAll", {
      username: userData.username,
    });
    setTodos(res.data);
  };

  return (
    <div className="todosWrapper">
      {!user ? (
        navigate("/login")
      ) : (
        <div className="todosCon">
          <div>
            <input placeholder="Add a new todo" />
            <button>ADD</button>
          </div>
          {todos ? (
            <ul>
              {todos.map((todo) => (
                <li>{todo}</li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default Todos;
