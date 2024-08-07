import { useState, useEffect } from "react";

const TodoForm = ({ initialTodo, onSubmit }) => {
  const [title, setTitle] = useState(initialTodo ? initialTodo.title : "");
  const [completed, setCompleted] = useState(
    initialTodo ? initialTodo.completed : false
  );

  useEffect(() => {
    if (initialTodo) {
      setTitle(initialTodo.title);
      setCompleted(initialTodo.completed);
    }
  }, [initialTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return; // Ensure title is not empty
    onSubmit({ title, completed });
    setTitle(""); // Clear the form fields after submission
    setCompleted(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 border-2  bg-gray-300 rounded w-full sm:w-2/3 lg:w-1/2 mx-auto"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded w-full text-gray-950 "
      />
      <label className="flex items-center text-gray-950  gap-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="text-gray-950 "
        />
        Completed
      </label>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
};

export default TodoForm;
