import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
import ConfirmationButton from "./ConfirmationButton";

const TodoWrapper = () => {
  const [todos, setTodos] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const [showConfirmButton, setConfirmButton] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
      ...todos,
    ]);
    console.log(todos);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setConfirmButton(false);
    setTodoToDelete(null)
  };

  const showConfirmation = (id) => {
    setTodoToDelete(id)
    setConfirmButton(true)
  }

  const handleConfirmDelete = () => {
    deleteTodo(todoToDelete);
  }
  const handleCancelDelete = () => {
    setConfirmButton(false);
    setTodoToDelete(null)
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const sortedTodos = todos.sort((a, b) => a.completed - b.completed);

  return (
    <div className="TodoWrapper">
      <h1>To Do App</h1>
      <TodoForm addTodo={addTodo} />

      {sortedTodos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
        ) : (
          <Todo
            task={todo}
            key={todo.id}
            toggleComplete={toggleComplete}
            deleteTodo={()=> showConfirmation(todo.id)}
            editTodo={editTodo}
          />
        )
      )}
      {showConfirmButton && (
        <ConfirmationButton message="Are you sure you want to delete this task"
          onConfirm={handleConfirmDelete}
          onCancel={ handleCancelDelete}
        />)}
    </div>
  );
};

export default TodoWrapper;
