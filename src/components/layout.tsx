import React, { PropsWithChildren } from "react";
import Navbar from "./navbar";

const PageLayout = (props: PropsWithChildren) => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <main>{props.children}</main>
    </div>
  );
};

export default PageLayout;
