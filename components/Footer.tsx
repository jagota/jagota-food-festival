"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { iconType, Icon } from "./Icon";

type linkType = {
  text: string;
  link: string;
  icon: iconType;
}
const links: linkType[] = [
  {
    text: "Home",
    link: "/",
    icon: "home",
  },
  {
    text: "Catalogue",
    link: "/product",
    icon: "product",
  },
  {
    text: "Quick Links",
    link: "/add-customer",
    icon: "add-people",
  },
  {
    text: "Contacts",
    link: "/customers",
    icon: "people",
  },
];
export const Footer = () => {
  const { user, logout } = useAuth();
  if (!user) return null;

  const renderIcon = (icon: iconType) => {
    return <Icon contentType={icon} />;
  };

  const renderItem = (item: linkType) => {
    return (
      <div key={item.text} className="flex-1 group">
        <Link
          href={item.link}
          className="inline-block text-center mx-auto px-4 py-2 w-full text-gray-400 group-hover:text-blue-500"
        >
          <span className="flex flex-col items-center">
            {renderIcon(item.icon)}
            <span className="block text-xs pb-2">{item.text}</span>
            <span className="block w-1/2 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
          </span>
        </Link>
      </div>
    );
  };
  return (
    <div className="min-w-full bg-white px-5 fixed bottom-0 min-h-[40px] z-10">
      <div className="flex justify-between items-center">
        {links.map((item) => {
          return renderItem(item);
        })}
      </div>
    </div>
  );
};
