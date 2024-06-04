import { WebCamComponent } from "@/components/webcam";
import { useState } from "react";
import { HiPaperClip, HiPhoto, HiPlus } from "react-icons/hi2";
import { useCustomerForm } from "./context/CustomerContext";
import { getAiVision } from "@/apihandler/vision.api";
import Loading from "@/components/ui/loading";
import { uploadFile } from "@/lib/getSignedUrl";

export const AiVision = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { customer, addValueToCustomer, getDataFromAiVision } = useCustomerForm();
  const setAudio = async(url: string) => {
    addValueToCustomer("image", url);
    setLoading(true);
    const aiData = await getAiVision(url);
    getDataFromAiVision(aiData.data)
    console.log("aiData", aiData);
    setLoading(false);
    setOpen(false);
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
        setLoading(true);
        const aiData = await getAiVision(files[0]);
        getDataFromAiVision(aiData.data)
        console.log("aiData", aiData);
        setLoading(false);
        console.log(files);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  if (loading) {
    return (
      <Loading />
    )
  }

  if (open) {
    return (
      <WebCamComponent
        onSave={(url) => setAudio(url)}
        onClose={() => setOpen(false)}
      />
    );
  }

  return (
    <>
    <div className="w-full p-4 flex justify-between relative items-center bg-[#193B67]/5 rounded-[8px]">
      <div className="flex gap-4 items-center">
        <HiPaperClip className={"w-6 h-6"} fill={"#192434"} />
        <span className="text-lg text-[#192739]/94">Ai Scan</span>
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
    <button
      onClick={handleClick}
      className="w-full relative p-4 flex items-center justify-between bg-[#193B67]/5 rounded-[8px]"
    >
      <div className="flex gap-4 items-center relative">
        <HiPhoto className={"w-6 h-6"} fill={"#192434"} />
        <span className="text-lg pl text-[#192739]/94">Ai Vision</span>
      </div>
      <HiPlus className={"w-6 h-6"} fill={"#192434"} />
    </button>
    </>
    
  );
};
