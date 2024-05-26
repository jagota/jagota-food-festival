import { AudioRecorderComponent } from "@/components/audioRecorder";
import { useState } from "react";
import { HiMiniMicrophone, HiPlus } from "react-icons/hi2";
import { useCustomerForm } from "./context/CustomerContext";
import { AudioPlayer2Component } from "@/components/AudioPlayer2";

export const Audio = () => {
  const [open, setOpen] = useState(false);
  const { customer, addValueToCustomer } = useCustomerForm();
  const setAudio = (url: string) => {
    addValueToCustomer("audio", url);
    setOpen(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  if (open) {
    return (
      <AudioRecorderComponent
        onSave={(url) => setAudio(url)}
        onClose={() => setOpen(false)}
      />
    );
  }

  if (customer.audio) {
    return (
      <div className="w-full flex flex-col gap-4 p-4 rounded-[8px] border border-[#1A3860]/10">
        <div className="flex gap-4 items-center">
          <HiMiniMicrophone className={"w-6 h-6"} fill={"#192434"} />
          <span className="text-lg text-[#192739]/94">Voice</span>
        </div>
        <div className="flex w-full flex-col ">
          <AudioPlayer2Component url={customer.audio} />
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="w-full p-4 flex justify-between items-center bg-[#193B67]/5 rounded-[8px]"
    >
      <div className="flex gap-4 items-center">
        <HiMiniMicrophone className={"w-6 h-6"} fill={"#192434"} />
        <span className="text-lg text-[#192739]/94">Audio</span>
      </div>
      <HiPlus className={"w-6 h-6"} fill={"#192434"} />
    </button>
  );
};
