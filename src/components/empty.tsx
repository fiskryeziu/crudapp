import React from "react";
import { FcTodoList } from "react-icons/fc";

const Empty = () => {
  return (
    <>
      <FcTodoList size={160} />
      <p className="text-xl uppercase text-yellow-100">No tasks yet</p>
    </>
  );
};

export default Empty;
