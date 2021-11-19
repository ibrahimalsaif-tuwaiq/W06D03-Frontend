import React from "react";
import "./style.css";

const Todo = ({ todo, deleteTodo, updateTodo }) => {
  return (
    <div className="listItem">
      <li>{todo.todo}</li>
      <div>
        <button className="update" onClick={() => updateTodo(todo.id)}>Update</button>
        <button className="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Todo;
