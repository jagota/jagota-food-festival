"use client";
import React, { ReactElement } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useEvent } from "@/context/EventContext";
import { useCustomerForm } from "@/app/add-customer/_components/context/CustomerContext";
export const LayoutEventHeader: React.FC = (): ReactElement => {
    const { customer} = useCustomerForm();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.replace("/customers");
  };
  return (
    <div className="w-full h-12 flex justify-between items-center overflow-hidden">
      <button
        onClick={handleClick}
        className="rounded-full relative w-10 h-10 overflow-hidden bg-transparent mouse transition ease-in duration-200 focus:outline-none"
      >
        <HiArrowSmallLeft className="w-8 h-8 text-black" />
      </button>
      <div className="flex flex-row items-center">
        <h4 className="text-[#192434] text-[22px] font-semibold capitalize pl-4">
          {customer.event}
        </h4>
      </div>
    </div>
  );
};
