import React, { type PropsWithChildren, useState } from "react";
import Navbar from "./navbar";

const PageLayout = (props: PropsWithChildren) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex h-screen flex-col">
      <Navbar setOpen={setOpen} open={open} />
      <div className="flex">
        <div
          className={`left-0 bg-secondary duration-200 ease-in ${
            open ? "h-[calc(100vh-3.5em)] w-64" : "-left-96  w-0"
          }`}
        ></div>
        <main className="flex h-[calc(100vh-3.5em)] w-screen grow px-10">
          {props.children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
