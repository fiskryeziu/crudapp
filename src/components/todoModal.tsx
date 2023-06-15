import React, { useRef, useState, useEffect } from "react";
import DatePicker, { ReactDatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FcCalendar } from "react-icons/fc";

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
  const [startDate, setStartDate] = useState<Date>(new Date());

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
      <div className="flex items-center justify-between gap-3 border-t border-secondary py-2">
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
          <select className="rounded-md bg-secondary p-2 text-white">
            <option value="" selected>
              Daily
            </option>
            <option value="">Weekly</option>
            <option value="">Monthly</option>
            <option value="">None</option>
          </select>
        </div>
        <div>
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
