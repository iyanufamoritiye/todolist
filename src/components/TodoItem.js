import Link from "next/link";

const TodoItem = ({ todo, onDelete }) => {
  return (
    <div className="flex justify-between text-gray-950   items-center gap-4 p-4 border-4  bg-white  rounded w-full sm:w-2/3 lg:w-1/2 mx-auto">
      <div>
        <h3 className={`${todo.completed ? "line-through" : ""}`}>
          {todo.title}
        </h3>
        <p>ID: {todo.id}</p>
      </div>
      <div className="flex gap-2">
        <Link href={`/todos/${todo.id}`} passHref>
          <button className="p-2 bg-yellow-500 text-white rounded px-4">
            View
          </button>
        </Link>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
