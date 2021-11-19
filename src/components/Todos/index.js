import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Todo from "./../Todo";
import "./style.css";

const Todos = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    const user = JSON.parse(userStorage);
    setUser(user);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line
  }, [todos]);

  const getTodos = async () => {
    const userStorage = localStorage.getItem("user");
    const userData = JSON.parse(userStorage);
    const res = await axios.post("http://localhost:5000/todo/getAll", {
      username: userData.username,
    });
    setTodos(res.data);
  };

  const addTodo = async () => {
    const userStorage = localStorage.getItem("user");
    const userData = JSON.parse(userStorage);
    await axios.post("http://localhost:5000/todo/add", {
      username: userData.username,
      todo: todo,
    });
  };

  const updateTodo = async (id) => {
    const userStorage = localStorage.getItem("user");
    const userData = JSON.parse(userStorage);
    const updatedTodo = prompt('Enter the new todo')
    await axios.put(`http://localhost:5000/todo/update/${id}`, {
      username: userData.username,
      todo: updatedTodo
    });
  };

  const deleteTodo = async (id) => {
    const userStorage = localStorage.getItem("user");
    const userData = JSON.parse(userStorage);
    await axios.put(`http://localhost:5000/todo/delete/${id}`, {
      username: userData.username
    });
  };

  return (
    <div className="todosWrapper">
      {!user ? (
        navigate("/login")
      ) : (
        <div className="todosCon">
          <div>
            <input
              className="addInput"
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Add a new todo"
            />
            <button className="add" onClick={addTodo}>
              ADD
            </button>
          </div>
          {todos ? (
            <ul className="list">
              {todos.map((todo) => (
                <Todo todo={todo} key={todo.id} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
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
