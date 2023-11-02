import { type Todo } from "@prisma/client";
import React, { useState } from "react";
import type { ERepeat } from "~/pages/today";
import { api } from "~/utils/api";
import DatePicker from "react-datepicker";
import { FcCalendar } from "react-icons/fc";

interface ITodoProps {
  todo: Todo;
  setEdit: (value: boolean) => void;
}

const TodoEditModal: React.FC<ITodoProps> = ({ todo, setEdit }) => {
  const [focused, setFocused] = useState(false);

  const [startDate, setStartDate] = useState<Date>(
    todo.specificDate || new Date()
  );
  const [title, setTitle] = useState(todo.title);
  const [desc, setDesc] = useState(todo.description);
  const [repeatMode, setRepeatMode] = useState<ERepeat>(todo.repeat as ERepeat);

  const [specificDate, setSpecificDate] = useState<Date | undefined>(
    todo.specificDate || undefined
  );

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
    console.log(repeatMode);
    mutate({
      description: desc,
      id: todo.id,
      title,
      repeat: repeatMode,
      specificDate,
    });
    setEdit(false);
  };

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const today = new Date();

    if (e.target.value === "NEXT_WEEK") {
      today.setDate(today.getDate() + 7);
      setStartDate(today);
      setSpecificDate(today);
    } else if (e.target.value === "NEXT_MONTH") {
      today.setMonth(today.getMonth() + 1);
      setStartDate(today);
      setSpecificDate(today);
    } else {
      setStartDate(today);
    }

    setRepeatMode(e.target.value as ERepeat);
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
      <div className="flex flex-col items-center justify-between border-t border-secondary py-2 sm:flex-row md:flex-row">
        <div className="flex items-center gap-2">
          <DatePicker
            selected={startDate}
            minDate={new Date()}
            onChange={(date) => setStartDate(date!)}
            className="rounded-md bg-secondary p-2 text-white"
            customInput={
              <button className="flex items-center gap-3">
                <FcCalendar />
                <p>{startDate.toLocaleDateString()}</p>
              </button>
            }
            id="datePicker"
          />
          <select
            className="rounded-md bg-secondary p-2 text-white"
            onChange={selectHandler}
            defaultValue={repeatMode}
          >
            <option value="DAILY">Daily</option>
            <option value="NEXT_WEEK">Next Week</option>
            <option value="NEXT_MONTH">Next Month</option>
            <option value="NONE">None</option>
          </select>
        </div>
        <div className="flex gap-4 py-2 sm:py-0">
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
    </div>
  );
};

export default TodoEditModal;
