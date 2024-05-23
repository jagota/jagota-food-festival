"use client";

import cntl from "cntl";
import { useState } from "react";
import { Icon } from "./Icon";

interface ImageViewerProps {
  imageUrl: string;
  classNames?: string;
  onDelete?: (imageId: string) => void;
}
const classes = {
  imageContainer: (classNames?: string) => cntl`
    pointer
    ${classNames ? classNames : "w-24 h-16"}
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
            <Icon contentType="close" size="w-8 h-8" strokeColor={"white"} />
        </button>
        <div className="absolute top-1/2 left-1/2 w-full transform -translate-x-1/2 -translate-y-1/2">
          <img src={imageUrl} className="w-full h-auto" />
        </div>
      </div>
    );
  }
  return (
    <button onClick={handleOpen} className={classes.imageContainer(classNames)}>
      <img src={imageUrl} className="w-full h-auto" />
    </button>
  );
};

export { ImageViewer }