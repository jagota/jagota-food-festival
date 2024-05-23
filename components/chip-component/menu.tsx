import { FC, ReactNode } from "react";

interface Menu {
  children: ReactNode;
}

const Menu: FC<Menu> = ({ children }) => {
  return (
    <div className="z-20 rounded-md flex flex-row flex-wrap gap-x-2 gap-y-1 px-2 py-3 shadow hover:shadow-lg bg-[#e7e5e4] max-h-[300px]">
      {children}
    </div>
  );
};

export default Menu;
