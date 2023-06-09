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
      className={`flex items-center  justify-between  rounded-lg p-4 text-white outline outline-1 outline-white ${
        completed
          ? "invisible h-0  p-0 opacity-0 outline-none transition-all duration-300"
          : "visible h-auto opacity-100 duration-300"
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
        <p>{todo.title}</p>
      </div>
      <p>{todo.startDate.toLocaleDateString()}</p>
    </div>
  );
};

export default TodoItem;
