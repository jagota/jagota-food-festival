"use client";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { WebCamComponent } from "@/components/webcam";
import { useState } from "react";
import { uploadFile } from "@/lib/getSignedUrl";
export default function AddCustomer() {
  const [openCamera, setOpenCamera] = useState(false);
  const [webcamImage, setWebcamImage] = useState<string | null | undefined>(null);
  const handleClick = () => {
    console.log("Floating button clicked");
  };

  const handleAttachmentClick = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      if (e.target.files) {
        await Promise.all(
          Array.from(e.target.files).map(async (file) => {
            const url = await uploadFile(file);
            return url;
          })
        );
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  if (webcamImage) {
    console.log("webcamImage", webcamImage);
  }
  return (
    <div>
      <p>Add Customer</p>
      <div>
        <input
          hidden
          id="attachments"
          type="file"
          value=""
          multiple
          max={5}
          onChange={handleAttachmentClick}
        />
        <label
          htmlFor="attachments"
          className="p-2 sm:p-4 rounded-full bg-bgInput hover:bg-bgPrimary"
        >
          <PaperClipIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </label>
      </div>
      <button onClick={() => setOpenCamera(true)}>Open Camera</button>
      {openCamera ? (
        <div>
          <p>This is camera</p>
          <WebCamComponent onSave={(url) => setWebcamImage(url)} onClose={() => setOpenCamera(false)} />
        </div>
      ) : null}
    </div>
  );
}
