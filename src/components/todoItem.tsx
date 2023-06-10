import type { Todo } from "@prisma/client";
import React, { useState } from "react";
import { MdDone } from "react-icons/md";

interface ITodoProps {
  todo: Todo;
}

const TodoItem: React.FC<ITodoProps> = ({ todo }) => {
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(false);

  const clickHandler = () => {
    setCompleted(true);
  };
  return (
    <div
      className={`flex cursor-pointer  items-center  justify-between rounded-lg p-4 text-white outline outline-1 outline-white ${
        completed
          ? "invisible absolute -z-10 block w-full translate-y-10 opacity-0 transition-all duration-300"
          : "visible translate-y-0 opacity-100"
      }`}
    >
      <div className="flex items-center gap-6">
        <button
          className="flex h-4 w-4 items-center rounded-full border border-white/20"
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          onClick={clickHandler}
        >
          {active && <MdDone className="text-white/20" />}
        </button>
        <div className="flex flex-col">
          <p className="line-clamp-1">{todo.title}</p>
          <p className="line-clamp-1 text-sm text-gray-500">
            this is a sample desc
          </p>
        </div>
      </div>
      <p>{todo.startDate.toLocaleDateString()}</p>
    </div>
  );
};

export default TodoItem;
