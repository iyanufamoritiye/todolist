import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { fetchTodoById } from "../../utils/api";
import { getTodosFromLocalStorage } from "@/utils/localStorage";

const TodoDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const getTodo = async () => {
        try {
          const todos = getTodosFromLocalStorage();
          const localTodo = todos.find((t) => t.id === parseInt(id, 10));
          if (localTodo) {
            setTodo(localTodo);
          } else {
            const fetchedTodo = await fetchTodoById(id);
            setTodo(fetchedTodo);
          }
        } catch (error) {
          console.error("Failed to fetch todo:", error);
        } finally {
          setLoading(false);
        }
      };
      getTodo();
    }
  }, [id]);

  const handleGoBack = () => {
    router.push("/");
  };

  if (loading) return <div>Loading...</div>;

  if (!todo) return <div>Todo not found</div>;

  return (
    <div className="w-screen h-screen flex justify-center items-center xs:px-5 md:px-10">
      <div className="container mx-auto  p-4 flex flex-col border-4 w-full  sm:w-2/3 lg:w-1/2">
        <h1 className="text-2xl  font-bold mb-4 text-gray-950 text-center">
          Todo Detail
        </h1>
        <div className="p-4 border-4 rounded">
          <h2 className="text-xl text-gray-950">{todo.title}</h2>
          <p className="text-gray-950 ">ID: {todo.id}</p>
          <p className="text-gray-950 ">
            Status: {todo.completed ? "Completed" : "Incomplete"}
          </p>
        </div>
        <button
          onClick={handleGoBack}
          className="mt-4 p-2 bg-gray-500 text-white rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default TodoDetail;
