import { FC, ReactNode } from "react";

interface Menu {
  children: ReactNode;
}

const Menu: FC<Menu> = ({ children }) => {
  return (
    <div className="z-20 rounded-md overflow-y-scroll flex flex-row flex-wrap gap-2 px-2 py-3 shadow hover:shadow-lg bg-[#e7e5e4] max-h-[350px]">
      {children}
    </div>
  );
};

export default Menu;
