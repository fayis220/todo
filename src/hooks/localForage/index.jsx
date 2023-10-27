import localForage from "localforage";
import { useEffect, useState } from "react";

const useLocalForage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      const todos = await localForage.getItem("todos");
      if (todos) {
        setTodos(todos);
      }
    }

    getTodos();
  }, []);

  const updateTodos = (newTodos) => {
    setTodos(newTodos);
    localForage.setItem("todos", newTodos);
  };

  return [todos, updateTodos];
};

export default useLocalForage;
