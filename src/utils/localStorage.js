const TODOS_KEY = "todos";
const LAST_ID_KEY = "lastTodoId";

// Check if window is defined (client-side check)
const isClient = typeof window !== "undefined";

// Initialize the last ID in localStorage if it doesn't exist
export const initializeLastId = () => {
  if (isClient && !localStorage.getItem(LAST_ID_KEY)) {
    localStorage.setItem(LAST_ID_KEY, 201);
  }
};

// Get the next unique ID
export const getNextUniqueId = () => {
  if (isClient) {
    const lastId = parseInt(localStorage.getItem(LAST_ID_KEY), 10);
    const nextId = lastId ? lastId + 1 : 202;
    localStorage.setItem(LAST_ID_KEY, nextId);
    return nextId;
  }
  return 202; // Default ID if server-side
};

// Get todos from localStorage
export const getTodosFromLocalStorage = () => {
  if (isClient) {
    const todos = localStorage.getItem(TODOS_KEY);
    return todos ? JSON.parse(todos) : [];
  }
  return [];
};

// Save todos to localStorage
export const saveTodosToLocalStorage = (todos) => {
  if (isClient) {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  }
};

// Update a todo in localStorage
export const updateTodoInLocalStorage = (id, updatedTodo) => {
  if (typeof window !== "undefined") {
    const todos = getTodosFromLocalStorage();
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos[index] = { ...updatedTodo, id }; // Ensure the ID is preserved
      saveTodosToLocalStorage(todos);
    } else {
      console.warn(`Todo with id ${id} not found in localStorage.`);
    }
  } else {
    console.warn("localStorage is not available.");
  }
};

// Delete a todo from localStorage
export const deleteTodoFromLocalStorage = (id) => {
  if (isClient) {
    const todos = getTodosFromLocalStorage().filter((todo) => todo.id !== id);
    saveTodosToLocalStorage(todos);
  }
};

// Initialize the last ID when the script is loaded
if (isClient) {
  initializeLastId();
}
