"use client";
import { useEvent } from "@/context/EventContext";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { EventHeader } from "./_eventDetails/EventHeader";
import { images } from "@/constants/images";
import { CustomerType, useCustomerType } from "@/context/CustomerTypeContext";

export default function EventDetails() {
  const { selectedEvent } = useEvent();
  const { selectCustomerType } = useCustomerType();
  const router = useRouter()

    const handleClick = (e:React.MouseEvent<HTMLButtonElement>, customerType:CustomerType ) => {
        e.preventDefault();
        selectCustomerType(customerType);
        router.push("/add-customer");
    };
  return (
    <div className="min-w-screen min-h-screen bg-[#F4F5F7] px-4 pt-4 pb-20">
      <EventHeader />
      <p className="my-4 text-sm text-[#192739]/94 font-normal">
        Welcome to {selectedEvent?.name}.
      </p>
      <div className="text-center my-9 w-80 mx-auto">
        <h1 className="text-[28px] text-[#192434] font-semibold">{`Let's Create Your Customer Profile!`}</h1>
        <h4 className="leading-7 text-base text-[#192739]/94 font-normal">{`Kindly let us know the type of business you're interested in?`}</h4>
      </div>
      <div className="flex flex-col gap-6 pt-20">
        <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e, "customer")} className="relative h-[195px] w-full max-w-[400px] mx-auto">
          <Image src={images.customer} fill alt={"customer"} />
        </button>
        <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e, "supplier")} className="relative h-[195px] w-full max-w-[400px] mx-auto">
          <Image src={images.supplier} fill alt={"supplier"} />
        </button>
      </div>
    </div>
  );
}
