// pages/todos/[id]/edit.js
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { fetchTodoById, updateTodo, updateTodoInApi } from "../../../utils/api";
import TodoForm from "../../../components/TodoForm";
import {
  getTodosFromLocalStorage,
  saveTodosToLocalStorage,
} from "@/utils/localStorage";

const EditTodo = () => {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const getTodo = async () => {
        try {
          const fetchedTodo = await fetchTodoById(id);
          setTodo(fetchedTodo);
        } catch (error) {
          console.error("Failed to fetch todo:", error);
        } finally {
          setLoading(false);
        }
      };
      getTodo();
    }
  }, [id]);

  const handleEdit = async (updatedTodo) => {
    try {
      const todosFromLocal = getTodosFromLocalStorage();
      const isFromLocal = todosFromLocal.some(
        (todo) => todo.id === parseInt(id, 10)
      );
      if (isFromLocal) {
        await updateTodo(id, updatedTodo, "local");
      } else {
        await updateTodo(id, updatedTodo, "api");
      }
      router.push(`/todos/${id}`);
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!todo) return <div>Todo not found</div>;

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="container mx-auto  p-4 flex flex-col border-4 w-full  sm:w-2/3 lg:w-1/2">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Todo</h1>
        <TodoForm initialTodo={todo} onSubmit={handleEdit} />
      </div>
    </div>
  );
};

export default EditTodo;
