import { useState, useEffect } from "react";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import { v4 as uuidv4 } from "uuid";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "@/utils/api";
import {
  getTodosFromLocalStorage,
  saveTodosToLocalStorage,
} from "@/utils/localStorage";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      const todos = await fetchTodos();
      setTodos(todos);
    };
    loadTodos();
  }, []);
  const addTodo = async (todo) => {
    const newTodo = await createTodo(todo); // Create and save the todo
    setTodos((prevTodos) => [newTodo, ...prevTodos]); // Add the new todo to the existing list
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    const updated = await updateTodo(id, updatedTodo); // Update in API
    const todos = getTodosFromLocalStorage(); // Update localStorage
    const updatedTodos = todos.map((todo) => (todo.id === id ? updated : todo));
    saveTodosToLocalStorage(updatedTodos);
    setTodos(updatedTodos); // Update state with the latest list
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id); // Remove from API
    const todos = getTodosFromLocalStorage(); // Update localStorage
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    saveTodosToLocalStorage(updatedTodos);
    setTodos(updatedTodos); // Update state with the latest list
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-950 text-center">
        Todo List
      </h1>
      <TodoForm onSubmit={addTodo} />
      <div className="mt-4 space-y-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleDeleteTodo}
            onUpdate={handleUpdateTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
