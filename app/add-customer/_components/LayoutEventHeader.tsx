"use client";
import React, { ReactElement } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useEvent } from "@/context/EventContext";
export const LayoutEventHeader: React.FC = (): ReactElement => {
  const { selectedEvent } = useEvent();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.replace("/event-details");
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
          {selectedEvent?.name}
        </h4>

        {selectedEvent?.thumbnail ? (
          <Image
            src={selectedEvent?.thumbnail}
            width={48}
            height={48}
            alt={selectedEvent.name || "event"}
            className="rounded-[12px] ml-4"
          />
        ) : null}
      </div>
    </div>
  );
};
