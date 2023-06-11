import React, { useState } from "react";

interface ITodoProps {
  setOpen: (value: boolean) => void;
  onSubmit: () => void;
  title: string;
  desc: string;
  setTitle: (value: string) => void;
  setDesc: (value: string) => void;
}

const TodoModal: React.FC<ITodoProps> = ({
  setOpen,
  onSubmit,
  setTitle,
  setDesc,
  title,
  desc,
}) => {
  const [focused, setFocused] = useState(false);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  return (
    <div
      className={`relative flex w-1/2 flex-col rounded-md p-2 outline outline-1 ${
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
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
        <button
          className="rounded-md bg-red-400 px-2 py-1 text-white hover:bg-red-600"
          onClick={onSubmit}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TodoModal;
