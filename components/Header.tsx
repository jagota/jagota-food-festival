'use client'
import { useAuth } from "@/context/AuthContext";
import LetterAvatar from "./LetterAvatar";

export const Header = () => {
    const { user, logout } = useAuth();
    if (!user)  return null;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        logout();
        console.log('clicked', user);
    }
    return (
        <div className="min-w-full bg-white px-5 shadow-lg fixed top-0 min-h-[60px] z-10">
            <div className="flex justify-between items-center">
                <div className="relative px-4 pt-2">
                    <h4 className="text-base text-gray-400">{user.staffCode} - {user.name}</h4>
                </div>
                <div className="relative px-4 pt-2">
                    {/* <FloatingButton classNames="relative" size="w-10 h-10" /> */}
                    <button onClick={handleClick} className="rounded-full bg-transparent active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                        <LetterAvatar name={user.name} />
                    </button>
                </div>
            </div>
        </div>
    );
}