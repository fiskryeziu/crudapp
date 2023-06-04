import React, { type PropsWithChildren, useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const PageLayout = (props: PropsWithChildren) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex h-screen flex-col">
      <Navbar setOpen={setOpen} open={open} />
      <div className="flex">
        <Sidebar open={open} />
        <main className="flex h-[calc(100vh-3.5em)] w-screen grow px-10">
          {props.children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
