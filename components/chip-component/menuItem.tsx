import { FC, ReactNode } from "react";

interface MenuItem {
  children: ReactNode;
  onClick: () => void;
}

const MenuItem: FC<MenuItem> = ({ children, onClick }) => {
  return (
    <div
      className="z-100 px-4 py-2 rounded-full cursor-pointer hover:bg-blue-500 text-black-500 hover:text-white bg-white flex justify-center items-center transition-all"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default MenuItem;
