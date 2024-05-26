import { WebCamComponent } from "@/components/webcam";
import { useState } from "react";
import { HiMiniPlus, HiPhoto, HiPlus } from "react-icons/hi2";
import { useCustomerForm } from "./context/CustomerContext";
import { ImageViewer } from "@/components/ImageViewer";

export const Photos = () => {
  const [open, setOpen] = useState(false);
  const { customer, addValueToCustomer } = useCustomerForm();
  const setAudio = (url: string) => {
    addValueToCustomer("image", url);
    setOpen(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  if (open) {
    return (
      <WebCamComponent
        onSave={(url) => setAudio(url)}
        onClose={() => setOpen(false)}
      />
    );
  }

  if (customer.image) {
    return (
      <div className="w-full flex flex-col gap-4 p-4 rounded-[8px] border border-[#1A3860]/10">
        <div className="flex gap-4 items-center">
          <HiPhoto className={"w-6 h-6"} fill={"#192434"} />
          <span className="text-lg text-[#192739]/94">Photos</span>
        </div>
        <div className="flex w-full flex-col ">
        <ImageViewer imageUrl={customer.image} /> 
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="w-full relative p-4 flex items-center justify-between bg-[#193B67]/5 rounded-[8px]"
    >
      <div className="flex gap-4 items-center relative">
        <HiPhoto className={"w-6 h-6"} fill={"#192434"} />
        <span className="text-lg pl text-[#192739]/94">Photos</span>
      </div>
      <HiPlus className={"w-6 h-6"} fill={"#192434"} />
    </button>
  );
};
