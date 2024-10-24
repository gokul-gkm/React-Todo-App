import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      setError("Task cannot be empty");
      return;
    }
    addTodo(value);
    setValue("");
    setError("");
  };
  return (
    <div>
      <form className="TodoForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          value={value}
          required
          placeholder="What is the task today ? "
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
        />
        <button type="submit" className="btn btn-background-slide">
          Add Task
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default TodoForm;
