import { Todo } from "@prisma/client";
import React, { useState } from "react";
import { api } from "~/utils/api";

interface ITodoProps {
  todo: Todo;
  setEdit: (value: boolean) => void;
}

const TodoEditModal: React.FC<ITodoProps> = ({ todo, setEdit }) => {
  const [focused, setFocused] = useState(false);

  const [title, setTitle] = useState(todo.title);
  const [desc, setDesc] = useState(todo.description);

  const { mutate } = api.todos.editTodo.useMutation({
    onSuccess: () => {
      void ctx.todos.invalidate();
      console.log("successfully updated to completed");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const ctx = api.useContext();

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const editHandler = () => {
    mutate({ description: desc, id: todo.id, title });
    setEdit(false);
  };

  return (
    <div
      className={`relative flex w-full flex-col rounded-md p-2 outline outline-1 ${
        focused ? "outline-white" : "outline-gray-500"
      } `}
    >
      <input
        type="text"
        placeholder="Task title"
        className="bg-transparent text-white outline-none placeholder:text-gray-500"
        onFocus={onFocus}
        onBlur={onBlur}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        className="mb-2 bg-transparent text-white outline-none placeholder:text-gray-500"
        onFocus={onFocus}
        onBlur={onBlur}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <div className="flex items-center justify-end gap-3 border-t border-secondary py-2">
        <button
          className="rounded-md bg-secondary px-2 py-1 text-white hover:brightness-150"
          onClick={() => setEdit(false)}
        >
          Cancel
        </button>
        <button
          className="rounded-md bg-red-400 px-2 py-1 text-white hover:bg-red-600"
          onClick={editHandler}
        >
          Edit Task
        </button>
      </div>
    </div>
  );
};

export default TodoEditModal;
