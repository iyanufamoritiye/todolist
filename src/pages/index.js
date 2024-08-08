import { useState, useEffect } from "react";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import { v4 as uuidv4 } from "uuid";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "@/utils/api";

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
    try {
      const newTodo = await createTodo(todo);
      setTodos([newTodo, ...todos]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      const updated = await updateTodo(id, updatedTodo);
      setTodos(todos.map((todo) => (todo.id === id ? updated : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
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
