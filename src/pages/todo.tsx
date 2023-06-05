import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import { api } from "~/utils/api";
import { HiArrowsUpDown } from "react-icons/hi2";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Empty from "~/components/empty";
import TodoModal from "~/components/todoModal";

export default function TodoPage() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [inputTodo, setInputTodo] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { status } = useSession();

  const { data: todos } = api.todos.getAll.useQuery();
  const { mutate } = api.todos.createTodo.useMutation({
    onSuccess: () => {
      setInputTodo("");
      void ctx.todos.invalidate();
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const ctx = api.useContext();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  const submitHandler = () => {
    //mutate method with the input in it
    console.log("submit handler");
    mutate({ text: inputTodo, startDate });
  };

  const handlerOpenModal = () => {
    setOpenModal((open) => !open);
  };

  return (
    <>
      <main className="flex   grow flex-col items-center gap-2">
        <div className="my-10 flex w-1/2 items-center justify-between">
          <button>
            <TbSquareRoundedPlusFilled
              size={50}
              className="ease text-btn-primary duration-150 hover:brightness-125"
              onClick={handlerOpenModal}
            />
          </button>

          <button>
            <HiArrowsUpDown size={25} className="text-white" />
          </button>
        </div>
        <div className="flex w-1/2 flex-col gap-4">
          {todos?.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center  justify-between  rounded-lg p-4 text-white outline outline-1 outline-white"
            >
              <p>{todo.title}</p>
              <p>{todo.startDate.toLocaleDateString()}</p>
            </div>
          ))}
        </div>
        {openModal && <TodoModal />}

        {todos === undefined || (todos.length === 0 && !openModal && <Empty />)}
      </main>
    </>
  );
}
