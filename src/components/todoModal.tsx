import React, { useRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FcCalendar } from "react-icons/fc";
import { type ERepeat } from "~/pages/today";

interface ITodoProps {
  setOpen: (value: boolean) => void;
  onSubmit: () => void;
  title: string;
  desc: string;
  setTitle: (value: string) => void;
  setDesc: (value: string) => void;
  setRepeatMode: (value: ERepeat) => void;
  setSpecificDate: (value: Date) => void;
}

const TodoModal: React.FC<ITodoProps> = ({
  setOpen,
  onSubmit,
  setTitle,
  setDesc,
  setRepeatMode,
  setSpecificDate,
  title,
  desc,
}) => {
  const [focused, setFocused] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

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
      <div className="flex flex-col items-center justify-between gap-3 border-t border-secondary py-2 sm:flex-row">
        <div className="flex items-center gap-3">
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
            defaultValue={"DAILY"}
          >
            <option value="DAILY">Daily</option>
            <option value="NEXT_WEEK">Next Week</option>
            <option value="NEXT_MONTH">Next Month</option>
            <option value="NONE">None</option>
          </select>
        </div>
        <div className="flex gap-2">
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
    </div>
  );
};

export default TodoModal;
