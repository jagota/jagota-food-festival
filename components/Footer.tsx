"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const links = [
    {
        text: 'Product',
        link: '/product',
        icon: 'fas fa-home'
    },
    {
        text: 'Add Customer',
        link: '/add-customer',
        icon: 'fas fa-home'
    },
    {
        text: 'Home',
        link: '/',
        icon: 'fas fa-home'
    }
]
export const Footer = () => {
  const { user, logout } = useAuth();
  if (!user) return null;


  const renderIcon = (icon: string) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

    )
  }

  const renderItem = (item: any) => {
    return (
      <div className="flex-1 group">
        <Link
          href={item.link}
          className="text-center mx-auto px-4 py-2 w-full text-gray-400 group-hover:text-indigo-500"
        >
          <span className="flex flex-col items-center px-1 pt-1 pb-1">
            {renderIcon(item.icon)}
            <span className="block text-xs pb-2">{item.text}</span>
            <span className="block w-1/2 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
          </span>
        </Link>
      </div>
    );
  };
  return (
    <div className="min-w-full bg-white px-5 shadow-lg fixed bottom-0 min-h-[40px] z-10">
      <div className="flex justify-between items-center">
        {links.map((item) => {
          return renderItem(item);
        })}
      </div>
    </div>
  );
};
