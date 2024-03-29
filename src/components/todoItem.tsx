import type { Todo } from "@prisma/client";
import React, { useState } from "react";
import { MdDone } from "react-icons/md";
import { TbPencilMinus, TbTrashFilled } from "react-icons/tb";
import { useHover } from "~/hooks/useHover";

import { api } from "~/utils/api";
import TodoEditModal from "./todoEditModal";

interface ITodoProps {
  todo: Todo;
}

const TodoItem: React.FC<ITodoProps> = ({ todo }) => {
  const [completed, setCompleted] = useState(false);
  const [edit, setEdit] = useState(false);

  const { active, hover, activeEnter, activeLeave, hoverEnter, hoverLeave } =
    useHover();

  const { mutate: update } = api.todos.todoCommpleted.useMutation({
    onSuccess: () => {
      console.log("successfully updated to completed");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  const { mutate: deleteTodo } = api.todos.deleteTodo.useMutation({
    onSuccess: () => {
      void ctx.todos.invalidate();
      console.log("successfully deleted to completed");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const ctx = api.useContext();

  const updateHandler = (id: string) => {
    update({
      id,
    });
    setCompleted(true);
  };
  const deleteHandler = (id: string) => {
    deleteTodo({
      id,
    });
    setCompleted(true);
  };

  return (
    <>
      {edit ? (
        <TodoEditModal todo={todo} setEdit={setEdit} />
      ) : (
        <div
          className={`flex cursor-pointer  items-center  justify-between rounded-lg p-4 text-white ${
            completed
              ? "invisible absolute -z-10 block w-full translate-y-10 opacity-0 transition-all duration-300"
              : "visible translate-y-0 opacity-100"
          }`}
          onMouseEnter={hoverEnter}
          onMouseLeave={hoverLeave}
        >
          <div className="flex items-center gap-6">
            <button
              className="flex h-4 w-4 items-center rounded-full border border-white/20"
              onMouseEnter={activeEnter}
              onMouseLeave={activeLeave}
              onClick={() => updateHandler(todo.id)}
            >
              {active && <MdDone className="text-white/20" />}
            </button>
            <div className="flex flex-col">
              <p className="line-clamp-1">{todo.title}</p>
              <p className="line-clamp-1 text-sm text-gray-500">
                {todo.description}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            {hover && (
              <>
                <button onClick={() => setEdit(true)}>
                  <TbPencilMinus size={20} className="text-btn-primary" />
                </button>

                <button onClick={() => deleteHandler(todo.id)}>
                  <TbTrashFilled size={20} className="text-red-600" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TodoItem;
