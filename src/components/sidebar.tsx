import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FcCalendar } from "react-icons/fc";
import { MdOutlineUpcoming } from "react-icons/md";

interface IStateProps {
  open: boolean;
}
const Sidebar: React.FC<IStateProps> = ({ open }) => {
  const router = useRouter();
  const path = router.pathname;
  return (
    <div
      className={`ease flex translate-x-0 flex-col gap-6 bg-secondary px-4 py-10 duration-200   ${
        open ? "h-[calc(100vh-3.5em)] w-80" : "w-0   translate-x-[-400px]"
      }`}
    >
      <Link
        href={"/today"}
        className={` flex items-center gap-3 rounded-lg p-2 text-white ${
          path === "/today" ? "bg-zinc-700" : ""
        }`}
      >
        <FcCalendar className="text-btn-primary" /> <p>Today</p>
      </Link>
      <Link
        href={"/upcoming"}
        className={` flex items-center gap-3 rounded-lg p-2 text-white ${
          path === "/upcoming" ? "bg-zinc-700" : ""
        }`}
      >
        <MdOutlineUpcoming className="text-btn-primary" /> <p>Upcomming</p>
      </Link>
    </div>
  );
};

export default Sidebar;
