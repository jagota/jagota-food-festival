"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { iconType, Icon } from "./icon";

const links: {
  text: string,
  link: string,
  icon: iconType
}[] = [
    {
        text: 'Product',
        link: '/product',
        icon: "product"
    },
    {
        text: 'Add Customer',
        link: '/add-customer',
        icon: 'add-people'
    },
    {
        text: 'Customers',
        link: '/customers',
        icon: 'people'
    }
]
export const Footer = () => {
  const { user, logout } = useAuth();
  if (!user) return null;


  const renderIcon = (icon: iconType) => {
    return (
        <Icon contentType={icon} />
    )
  }

  const renderItem = (item: any) => {
    return (
      <div className="flex-1 group">
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
