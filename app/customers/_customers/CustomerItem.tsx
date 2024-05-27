"use client"
import { CustomerInterface } from "@/interfaces/Customer.interface";
import { useRouter } from "next/navigation";

interface Props {
  customer: CustomerInterface;
}


const CustomerItem = ({ customer }: Props) => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.replace(`/customers/${customer._id}`);
  };
  return (
    <button
      onClick={handleClick}
      className="py-4 px-2 border-b border-[#1A3860]/10 flex flex-col w-80"
    >
      <h4 className="flex text-lg font-semibold text-[#192739] text-opacity-94 w-80 whitespace-nowrap overflow-hidden text-ellipsis">
        {customer.contactPersonName}
      </h4>
      <p className="flex text-sm font-semibold text-[#192739] text-opacity-70 w-80 whitespace-nowrap overflow-hidden text-ellipsis">
        {customer.companyName}
      </p>
    </button>
  );
};

export { CustomerItem };
