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
      <div className="flex w-full flex-col items-center md:w-3/4 lg:w-1/2">
        <div className="my-10">
          <p className="text-center text-xl tracking-wider text-white">
            Upcoming
          </p>
        </div>
        <div className="relative flex w-full  flex-col gap-4">
          {todos?.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </div>

        {todos === undefined || (todos.length === 0 && <Empty />)}
      </div>
    </main>
  );
};

export default UpcomingTodoPage;
