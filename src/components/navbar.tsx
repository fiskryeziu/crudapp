import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { HiBars3, HiHome } from "react-icons/hi2";

const Navbar = () => {
  const { data } = useSession();
  return (
    <div className="flex justify-between bg-secondary px-4 py-4">
      <div className="flex gap-6">
        <HiBars3 size={30} color="white" />
        <HiHome size={28} color="white" />
      </div>
      <div>
        <Image
          priority
          width={30}
          height={30}
          src={data?.user.image ?? "/user.png"}
          alt="profile pic"
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
