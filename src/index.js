import { useState, useEffect } from "react";
import { fetchTodos, createTodo, deleteTodo } from "../../components/utils/api";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const todos = await fetchTodos();
      setTodos(todos);
    };
    getTodos();
  }, []);

  const addTodo = async (todo) => {
    const newTodo = await createTodo(todo);
    setTodos([newTodo, ...todos]);
  };

  const deleteTodoItem = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
      <TodoForm onSubmit={addTodo} />
      <div className="mt-4 space-y-4 ">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={deleteTodoItem} />
        ))}
      </div>
    </div>
  );
};

export default Home;
