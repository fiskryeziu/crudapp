import { contextProps } from "@trpc/react-query/shared";
import { useSession, getSession } from "next-auth/react";
import { FormEvent, ReactElement, useState } from "react";
import { api } from "~/utils/api";

export default function TodoPage() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [inputTodo, setInputTodo] = useState("");
  const { status } = useSession();

  const { data } = api.todos.getAll.useQuery();
  console.log(data);
  const { mutate, isLoading } = api.todos.createTodo.useMutation({
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
    mutate({ text: "hello there" });
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
      </main>
    </>
  );
}
