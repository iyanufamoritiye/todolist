import { useState, useEffect } from "react";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "@/utils/api";
import {
  getNextUniqueId,
  getTodosFromLocalStorage,
  saveTodosToLocalStorage,
} from "@/utils/localStorage";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTodos = async () => {
      const todos = await fetchTodos();
      setTodos(todos);
    };
    loadTodos();
  }, []);

  const addTodo = (todo) => {
    const duplicateTodo = todos.find(
      (existingTodo) => existingTodo.title === todo.title
    );

    if (duplicateTodo) {
      setError("Todo with this title already exists.");
      return;
    }
    const newTodo = { ...todo, id: getNextUniqueId(todos) };
    const updatedTodos = [newTodo, ...todos];
    saveTodosToLocalStorage(updatedTodos);
    setTodos(updatedTodos);
    setError("");
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      const updated = await updateTodo(id, updatedTodo);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updated : todo))
      );
      const todosFromLocalStorage = getTodosFromLocalStorage();
      const updatedLocalTodos = todosFromLocalStorage.map((todo) =>
        todo.id === id ? updated : todo
      );
      saveTodosToLocalStorage(updatedLocalTodos);
    } catch (error) {
      console.error("Failed to update todo:", error);
      setError("Failed to update todo:");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      const todosFromLocalStorage = getTodosFromLocalStorage();
      const updatedLocalTodos = todosFromLocalStorage.filter(
        (todo) => todo.id !== id
      );
      saveTodosToLocalStorage(updatedLocalTodos);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-950 text-center">
        Todo List
      </h1>
      <TodoForm onSubmit={addTodo} />
      {error && <p className="text-red-500 text-center">{error}</p>}
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
