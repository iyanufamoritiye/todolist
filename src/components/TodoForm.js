import { useState, useEffect } from "react";
import { createTodo, updateTodo } from "../utils/api";
import { getNextUniqueId } from "@/utils/localStorage";

const TodoForm = ({ initialTodo, onSubmit }) => {
  const [title, setTitle] = useState(initialTodo ? initialTodo.title : "");
  const [completed, setCompleted] = useState(
    initialTodo ? initialTodo.completed : false
  );
  const [error, setError] = useState(""); // For displaying form errors

  useEffect(() => {
    if (initialTodo) {
      setTitle(initialTodo.title);
      setCompleted(initialTodo.completed);
    }
  }, [initialTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return; // Prevent form submission if title is empty
    }

    setError(""); // Clear previous errors
    const todoData = {
      title: title.trim(),
      completed,
    };

    try {
      let result;
      if (initialTodo) {
        // Update existing todo
        result = await updateTodo(initialTodo.id, {
          ...todoData,
          id: initialTodo.id,
        });
      } else {
        // Create new todo
        result = await createTodo(todoData);
        // Reset form fields after creating a new todo
        setTitle("");
        setCompleted(false);
      }

      onSubmit(result);
    } catch (error) {
      console.error("Failed to save todo:", error);
      setError("Failed to save todo. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 border-2 bg-gray-300 rounded w-full sm:w-2/3 lg:w-1/2 mx-auto"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded w-full text-gray-950"
      />
      <label className="flex items-center text-gray-950 gap-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="text-gray-950"
        />
        Completed
      </label>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        {initialTodo ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default TodoForm;
