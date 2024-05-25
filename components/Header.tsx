"use client";
import { useAuth } from "@/context/AuthContext";
import LetterAvatar from "./LetterAvatar";
import Image from "next/image";

export const Header = () => {
  const { user, logout } = useAuth();
  if (!user) return null;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
  };
  return (
    <div className="w-full mb-3 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Image src="/jagota-logo.svg" alt="logo" width={16} height={30} />
        <h4 className="text-lg font-semibold text-black m-0">Hi, {user.name} </h4>
      </div>
      <button
        onClick={handleClick}
        className="rounded-full relative w-10 h-10 overflow-hidden bg-transparent text-white mouse transition ease-in duration-200 focus:outline-none"
      >
        {user.profilePic ? <Image width={40} height={40} src={user.profilePic} alt="profile pic" />  : <LetterAvatar name={user.name} />}
      </button>
    </div>
  );
};

// Fix me: At last stage: we can add view to show more details of user and logout button
{/* <button
        onClick={handleClick}
        className="rounded-[8px] bg-transparent hover:bg-blue-600 text-white px-3 py-1 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
      >
        <LetterAvatar name={user.name} />
      </button> */}