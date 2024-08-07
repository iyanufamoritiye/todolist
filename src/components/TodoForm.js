import { useState } from "react";

const TodoForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

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
        className="p-2 border rounded w-full"
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
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
