import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";
import { HiArrowsUpDown } from "react-icons/hi2";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";

import Empty from "~/components/empty";
import TodoModal from "~/components/todoModal";
import TodoItem from "~/components/todoItem";
import Loader from "~/components/loader";
import AccessDenied from "~/components/accessDenied";

export enum ERepeat {
  NEXT_MONTH = "NEXT_MONTH",
  DAILY = "DAILY",
  NEXT_WEEK = "NEXT_WEEK",
  NONE = "NONE",
}
export default function TodayTodoPage() {
  const [startDate] = useState<Date>(new Date());
  const [inputTitle, setInputTitle] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [repeatMode, setRepeatMode] = useState<ERepeat>(ERepeat.DAILY);
  const [specificDate, setSpecificDate] = useState<Date | undefined>();
  const [sort, setSort] = useState("asc");

  const { status } = useSession();

  const { data: todos } = api.todos.getAll.useQuery({ sort });
  const { mutate } = api.todos.createTodo.useMutation({
    onSuccess: () => {
      setInputTitle("");
      setInputDesc("");
      void ctx.todos.invalidate();
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const ctx = api.useContext();

  const submitHandler = () => {
    const newRepeat = repeatMode === ERepeat.NONE ? null : repeatMode;

    mutate({
      text: inputTitle,
      startDate,
      description: inputDesc,
      repeat: newRepeat,
      specificDate,
    });
    setOpenModal(false);
  };

  const handlerOpenModal = () => {
    setOpenModal((open) => !open);
  };

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }

  const date: Date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const pageProps = {
    setOpen: setOpenModal,
    onSubmit: submitHandler,
    setTitle: setInputTitle,
    setDesc: setInputDesc,
    setRepeatMode,
    setSpecificDate,
    desc: inputDesc,
    title: inputTitle,
  };

  const sortHandler = () => {
    sort === "asc" ? setSort("desc") : setSort("asc");
  };

  return (
    <>
      <main className="flex grow flex-col items-center gap-2">
        <div className="flex w-full flex-col items-center md:w-[500px]">
          <div className="my-10 flex w-full items-center justify-between">
            <button>
              <TbSquareRoundedPlusFilled
                size={50}
                className="ease text-btn-primary duration-150 hover:brightness-125"
                onClick={handlerOpenModal}
              />
            </button>
            <div className="flex flex-col">
              <p className="text-center text-xl text-white">Today</p>
              <p className="text-center font-thin text-white/40">
                {formattedDate}
              </p>
            </div>

            <button onClick={sortHandler}>
              <HiArrowsUpDown size={25} className="text-white" />
            </button>
          </div>
          <div className="relative flex w-full flex-col gap-4">
            {todos?.map((todo) => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </div>
          {openModal && <TodoModal {...pageProps} />}

          {todos === undefined ||
            (todos.length === 0 && !openModal && <Empty />)}
        </div>
      </main>
    </>
  );
}
