"use client";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

interface IWebCamComponentProps {
  onClose: () => void;
}
type facingModeType = "user" | "environment";
const WebCamComponent = ({ onClose }: IWebCamComponentProps) => {
  const [facingMode, setFacingMode] = useState<facingModeType>("environment");
  const webcamRef = useRef<Webcam>(null);
  const [img, setImg] = useState<string | null | undefined>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    console.log("imageSrc", imageSrc);
    setImg(imageSrc);
  }, [webcamRef]);
  const videoConstraints = {
    facingMode,
  };
  return (
    <div className="fixed top-0 bottom-0 min-w-screen min-h-screen">
      {img === null ? <>
        <Webcam
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        videoConstraints={videoConstraints}
        screenshotFormat="image/jpeg"
        ref={webcamRef}
        mirrored={true}
        audio={false}
      />
      <button className="fixed bottom-10 right-50 p-1 bg-white" onClick={capture}>Capture photo</button>
      <button className="fixed bottom-10 left-10" onClick={onClose}>
        close
      </button>
      <button
        onClick={() =>
          setFacingMode(facingMode === "user" ? "environment" : "user")
        }
        className="fixed top-10 left-10 w-12 h-12 bg-indigo text-white transition-colors duration-150 rounded-full focus:shadow-outline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
      </> : <>
            <img src={img} alt="screenshot" />
          <button className="w-12 h-12 bg-indigo text-white" onClick={() => setImg(null)}>Recapture</button>
      </>}
    </div>
  );
};

export { WebCamComponent };
