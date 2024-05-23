'use client'
import { useAuth } from "@/context/AuthContext";
import LetterAvatar from "./LetterAvatar";

export const Header = () => {
    const { user, logout } = useAuth();
    if (!user)  return null;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        logout();
    }
    return (
        <div className="min-w-full bg-white px-5 shadow-lg fixed top-0 h-14 z-10 flex">
            <div className="flex justify-between items-center h-full w-full">
                <div className="relative px-4">
                    <h4 className="text-base text-gray-400">{user.staffCode} - {user.name}</h4>
                </div>
                <div className="relative px-4">
                    <button onClick={handleClick} className="rounded-[8px] bg-blue-400 hover:bg-blue-600 text-white px-3 py-1 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                        Log out
                    </button>
                </div>
            </div>
        </div>
    );
}