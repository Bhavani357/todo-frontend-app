import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todoService';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTodos();

  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      console.log('inTodoList',response)
      setTodos(response);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTodo(newTodo);
    fetchTodos();
  };

  const handleUpdate = async (id, status) => {
    await updateTodo(id, { status });
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div className="todo-list">
      <h2>My Todos</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" value={newTodo.title} onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={newTodo.description} onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Todo</button>
      </form>

      <ul className="list-group mt-4">
  {todos && todos.length > 0 ? (
    todos.map((todo) => (
      <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <h5>{todo.title}</h5>
          <p>{todo.description}</p>
          <p>Status: {todo.status}</p>
        </div>
        <div>
          <button className="btn btn-success" onClick={() => handleUpdate(todo.id, 'completed')}>Mark Completed</button>
          <button className="btn btn-danger ms-2" onClick={() => handleDelete(todo.id)}>Delete</button>
        </div>
      </li>
    ))
  ) : (
    <li className="list-group-item">No todos available</li>
  )}
</ul>

    </div>
  );
};

export default TodoList;
