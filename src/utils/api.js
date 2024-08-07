import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTodos = async () => {
  const response = await axios.get(`${API_URL}?_limit=10`);
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
};

export const updateTodo = async (id, todo) => {
  const response = await axios.put(`${API_URL}/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const fetchTodoById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
