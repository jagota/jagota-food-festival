import { uploadFile } from "@/lib/getSignedUrl";
import { useState } from "react";
import { HiMiniPlus, HiPaperClip, HiPhoto, HiPlus } from "react-icons/hi2";
import { useCustomerForm } from "./context/CustomerContext";

export const Attachment = () => {
  const { customer, addValueToCustomer } = useCustomerForm();
  const setAttachments = (urls: string[]) => {
    addValueToCustomer("attachments", urls);
  };

  const handleAttachmentClick = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      if (e.target.files) {
        const files = await Promise.all(
          Array.from(e.target.files).map(async (file) => {
            const url = await uploadFile(file);
            return url;
          })
        );
        setAttachments(files);
        console.log(files);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  // return (
  //   <button className="w-full p-4 flex justify-between relative items-center bg-[#193B67]/5 rounded-[8px]">
  //     <div className="flex gap-4 items-center">
  //       <HiPaperClip
  //         className={"w-6 h-6"}
  //         fill={"#192434"}
  //       />
  //       <span className="text-lg text-[#192739]/94">Attachment</span>
  //     </div>
  //     <HiPlus
  //       className={"w-6 h-6"}
  //       fill={"#192434"}
  //     />
  //   </button>
  // );

  const renderFiles = (attachment: string, index: number) => {
    const aArr = attachment.split("/");
    const fileName = aArr[aArr.length - 1];
    return (
      <div className="overflow-x-hidden h-8">
        <p className="text-base font-medium text-[#005FDB]">{fileName}</p>
      </div>
    )
  }

  if (customer.attachments && customer.attachments.length > 0) {
    return (
      <div className="w-full flex flex-col gap-4 p-4 rounded-[8px] border border-[#1A3860]/10">
        <div className="flex gap-4 items-center">
          <HiPaperClip className={"w-6 h-6"} fill={"#192434"} />
          <span className="text-lg text-[#192739]/94">Attachment</span>
        </div>
        <div className="flex w-full flex-col ">
          {customer.attachments.map((attachment, index) => renderFiles(attachment, index))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 flex justify-between relative items-center bg-[#193B67]/5 rounded-[8px]">
      <div className="flex gap-4 items-center">
        <HiPaperClip className={"w-6 h-6"} fill={"#192434"} />
        <span className="text-lg text-[#192739]/94">Attachment</span>
      </div>
      <HiPlus className={"w-6 h-6"} fill={"#192434"} />
      <input
        hidden
        id="attachments"
        type="file"
        value=""
        multiple
        max={5}
        onChange={handleAttachmentClick}
        placeholder="Upload Attachment"
      />
      <label
        htmlFor="attachments"
        className="absolute top-0 left-0 bottom-0 right-0 cursor-pointer flex justify-between items-center gap-4"
      ></label>
    </div>
  );
};
