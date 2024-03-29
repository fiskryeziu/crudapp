import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiBars3, HiHome } from "react-icons/hi2";
import { FiLogIn, FiLogOut } from "react-icons/fi";

interface IStateProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Navbar: React.FC<IStateProps> = ({ open, setOpen }) => {
  const { data } = useSession();
  return (
    <div className="flex h-14 items-center justify-between bg-secondary px-4">
      <div className="flex gap-6">
        <button onClick={() => setOpen(!open)}>
          <HiBars3 size={30} color="white" />
        </button>
        <Link href={"/"}>
          <HiHome size={28} color="white" />
        </Link>
      </div>
      <div className="flex gap-4">
        <button
          onClick={
            data
              ? () => void signOut()
              : () =>
                  void signIn("", {
                    callbackUrl: `${window.location.origin}/todo`,
                  })
          }
        >
          {data ? (
            <FiLogOut
              size={28}
              color="fff"
              data-tooltip-target="tooltip-default"
            />
          ) : (
            <FiLogIn
              size={28}
              color="fff"
              data-tooltip-target="tooltip-default"
            />
          )}
        </button>
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
