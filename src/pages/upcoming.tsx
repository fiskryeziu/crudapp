import { useSession } from "next-auth/react";
import React from "react";
import AccessDenied from "~/components/accessDenied";
import Empty from "~/components/empty";
import Loader from "~/components/loader";
import TodoItem from "~/components/todoItem";
import { api } from "~/utils/api";

const UpcomingTodoPage = () => {
  const { data: todos } = api.todos.upcomingTodos.useQuery();

  const { status } = useSession();

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }
  return (
    <main className="flex grow flex-col items-center gap-2">
      <div className="my-10 flex w-1/2 justify-center">
        <p className="text-center text-xl tracking-wider text-white">
          Upcoming
        </p>
      </div>
      <div className="relative flex w-1/2 flex-col gap-4">
        {todos?.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </div>

      {todos === undefined || (todos.length === 0 && <Empty />)}
    </main>
  );
};

export default UpcomingTodoPage;
