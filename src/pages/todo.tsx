import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function TodoPage() {
  const [startDate, setStartDate] = useState<Date>(new Date());

  console.log(startDate.toLocaleDateString());

  const [inputTodo, setInputTodo] = useState("");

  const { status } = useSession();

  const { data: todos } = api.todos.getAll.useQuery();
  const { mutate } = api.todos.createTodo.useMutation({
    onSuccess: () => {
      setInputTodo("");
      void ctx.todos.invalidate();
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const ctx = api.useContext();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  const submitHandler = () => {
    //mutate method with the input in it
    console.log("submit handler");
    mutate({ text: inputTodo, startDate });
  };

  return (
    <>
      <h1>Protected Page</h1>
      <p>You can view this page because you are signed in.</p>
      <main>
        <h1>todo app</h1>
        <input
          type="text"
          placeholder="add todo..."
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />
        <button onClick={submitHandler}>submit</button>
        <hr />
        <div>
          {todos?.map((todo) => (
            <h1 key={todo.id}>
              {todo.title} {todo.startDate.toLocaleDateString()}
            </h1>
          ))}
        </div>
        <br />
        <br />
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />
      </main>
    </>
  );
}
