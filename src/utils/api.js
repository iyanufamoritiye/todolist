import axios from "axios";
import {
  getTodosFromLocalStorage,
  saveTodosToLocalStorage,
  getNextUniqueId,
  updateTodoInLocalStorage,
  deleteTodoFromLocalStorage,
} from "./localStorage"; // Adjust the path according to your file structure

const API_URL = "https://jsonplaceholder.typicode.com/todos";

// Fetch todos from the API
export const fetchTodosFromAPI = async () => {
  const response = await axios.get(`${API_URL}?_limit=10`);
  return response.data;
};

// Fetch todos from localStorage, or from API if localStorage is empty
export const fetchTodos = async () => {
  let todos = getTodosFromLocalStorage();

  if (todos.length === 0) {
    const response = await axios.get(`${API_URL}?_limit=10`);
    todos = response.data.map((todo) => ({
      ...todo,
      id: todo.id || getNextUniqueId(),
    }));

    saveTodosToLocalStorage(todos);
  }

  return todos;
};

// Create a new todo
export const createTodo = async (todo) => {
  const newTodo = { ...todo, id: getNextUniqueId() }; // Generate unique ID
  const todos = getTodosFromLocalStorage();
  todos.push(newTodo);
  saveTodosToLocalStorage(todos);
  return newTodo;
};

// Update an existing todo
export const updateTodo = async (id, updatedTodo) => {
  try {
    const todoId = parseInt(id, 10);
    const todos = getTodosFromLocalStorage();
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...updatedTodo, id: todoId } : todo
    );
    saveTodosToLocalStorage(updatedTodos);
    const response = await axios.put(`${API_URL}/${todoId}`, updatedTodo);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to update todo on API: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to update todo:", error);
    throw error;
  }
};
// Delete a todo
export const deleteTodo = async (id) => {
  deleteTodoFromLocalStorage(id);

  await axios.delete(`${API_URL}/${id}`);
};

export const fetchTodoById = async (id) => {
  try {
    const todoId = parseInt(id, 10);
    const todos = getTodosFromLocalStorage();
    const todoFromLocal = todos.find((todo) => todo.id === todoId);

    if (todoFromLocal) {
      return todoFromLocal;
    }
    const response = await axios.get(`${API_URL}/${todoId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error fetching todo from API: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching todo:", error);
    throw error;
  }
};
