"use client";

import cntl from "cntl";
import { useState } from "react";
import { Icon } from "./Icon";
import { HiMiniXMark } from "react-icons/hi2";

interface ImageViewerProps {
  imageUrl: string;
  classNames?: string;
  onDelete?: (imageId: string) => void;
}
const classes = {
  imageContainer: (classNames?: string) => cntl`
    pointer rounded-[8px] overflow-hidden
    ${classNames ? classNames : "w-16 h-16"}
    `,
};
const ImageViewer = ({ imageUrl, classNames }: ImageViewerProps) => {
  const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };
  if (!imageUrl) return null;
  if (open) {
    return (
      <div className="fixed top-0 left-0 z-40 w-full h-full bg-black bg-opacity-90">
        <button className="absolute left-2 z-50 bg-transparent top-2 p-1 bg-transparent" onClick={handleOpen}>
            <HiMiniXMark fill="white" className="w-12 h-12" />
        </button>
        <div className="absolute top-1/2 left-1/2 w-full transform -translate-x-1/2 -translate-y-1/2">
          <img src={imageUrl} className="w-full h-auto" />
        </div>
      </div>
    );
  }
  return (
    <button onClick={handleOpen} className={classes.imageContainer(classNames)}>
      <img src={imageUrl} className="w-full h-auto rounded-[8px]" />
    </button>
  );
};

export { ImageViewer }