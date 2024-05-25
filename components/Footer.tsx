"use client";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from 'next/navigation'
import Link from "next/link";
import { iconType, Icon } from "./Icon";
import cntl from "cntl";

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
    link: "https://www.jagota.com/catalogue2024/",
    icon: "product",
  },
  {
    text: "Quick Links",
    link: "/quick-links",
    icon: "link",
  },
  {
    text: "Contacts",
    link: "/customers",
    icon: "people",
  },
];

const classes = {
  hoverLine: (active: boolean) => cntl`
  block w-1/2 mx-auto h-1 group-hover:bg-indigo-500 rounded-full
  ${active ? "bg-indigo-500" : "bg-transparent"}
  `,
  link: (active: boolean) => cntl`
  inline-block text-center mx-auto px-4 py-2 w-full text-gray-400 group-hover:text-blue-500
  ${active ? "text-blue-500" : "text-gray-400"}
  `
}
export const Footer = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  console.log("pathname", pathname);

  if (!user) return null;
  if (pathname === "/login" || pathname === "/add-customer") return null;

  const renderIcon = (icon: iconType) => {
    return <Icon contentType={icon} />;
  };

  const renderItem = (item: linkType) => {
    const active = item.link === pathname;
    return (
      <div key={item.text} className="flex-1 group">
        <Link
          href={item.link}
          className={classes.link(active)}
        >
          <span className="flex flex-col items-center">
            {renderIcon(item.icon)}
            <span className="block text-xs pb-2">{item.text}</span>
            <span className={classes.hoverLine(active)}></span>
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
