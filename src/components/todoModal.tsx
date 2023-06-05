import React, { useState } from "react";

const TodoModal = () => {
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
      />
      <input
        type="text"
        placeholder="Description"
        className="mb-2 bg-transparent text-white outline-none placeholder:text-gray-500"
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <div className="flex items-center justify-end gap-3 border-t border-secondary py-2">
        <button className="rounded-md bg-secondary px-2 py-1 text-white hover:brightness-150">
          Cancel
        </button>
        <button className="rounded-md bg-red-400 px-2 py-1 text-white hover:bg-red-600">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TodoModal;
