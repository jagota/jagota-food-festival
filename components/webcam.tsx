"use client";
import { dataUrlToFile } from "@/lib/base64ToImage";
import { uploadFile } from "@/lib/getSignedUrl";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { PrimaryButton } from "./ui/primary-button";

interface IWebCamComponentProps {
  onClose: () => void;
  onSave: (url: string) => void;
}
type facingModeType = "user" | "environment";
const WebCamComponent = ({ onClose, onSave }: IWebCamComponentProps) => {
  const [facingMode, setFacingMode] = useState<facingModeType>("environment");
  const webcamRef = useRef<Webcam>(null);
  const [img, setImg] = useState<string | null | undefined>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  const handleCapture = () => {
    if (img) {
      setImg(null);
    } else {
      capture();
    }
  };

  const save = async () => {
    if (!img) return;
    const fileName = `${Date.now() + Math.random()}-webcam-image.png`;
    const file = await dataUrlToFile(img, fileName);
    const url = await uploadFile(file);
    onSave(url);
    onClose();
    return url;
  };

  const videoConstraints = {
    facingMode,
  };
  return (
    <div className="fixed z-20 top-0 bottom-0 left-0 right-0 flex items-center bg-gradient-to-r from-neutral-50 to-violet-300">
      {img === null ? (
          <Webcam
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            videoConstraints={videoConstraints}
            screenshotFormat="image/jpeg"
            ref={webcamRef}
            mirrored={true}
            audio={false}
          />
        ) : (
          <img src={img} alt="screenshot" />
        )}
        <div className="fixed top-2 flex w-full justify-between items-center p-2">
          <button
            className="p-1 bg-transparent text-white transition-colors duration-150 rounded-full focus:shadow-outline"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={img ? "black" : "white"}
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
          {!img ? (
            <button
              onClick={() =>
                setFacingMode(facingMode === "user" ? "environment" : "user")
              }
              className="w-12 h-12 bg-indigo text-white transition-colors duration-150 rounded-full focus:shadow-outline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          ) : null}
        </div>
        <div className="fixed bottom-10 flex w-full justify-around">
          {
            <PrimaryButton
              buttonText={img ? "Retake" : "Capture"}
              variant={img ? "secondary" : "primary"}
              onClick={handleCapture}
            />
          }
          {img ? <PrimaryButton buttonText="Save" variant="secondary" onClick={save} /> : null}
        </div>
    </div>
  );
};

export { WebCamComponent };
