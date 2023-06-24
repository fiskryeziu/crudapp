import Link from "next/link";
import React from "react";
import { FcLock } from "react-icons/fc";

const AccessDenied = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <FcLock size={200} />
      <p className="text-xl uppercase text-white">Access Denied</p>
      <Link
        href={"/"}
        className=" rounded-lg bg-btn-primary px-10 py-2 text-white"
      >
        Go Back
      </Link>
    </div>
  );
};

export default AccessDenied;
