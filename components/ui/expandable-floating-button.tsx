"use client";
import { useState } from "react";
import { FloatingButton } from "./floating-button";
import cntl from "cntl";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children: React.ReactNode;
}

const classes = {
  expandableArea: (expanded: boolean) => cntl`
    absolute left-20  h-12 w-full 
    transition ease-in duration-200 origin-left z-20 h-10 flex gap-2
    ${expanded ? "scale-100" : "scale-0"}
    `,
  circleButton: cntl`
    
    `,
  recordingButton: (expanded: boolean, left?: string) => cntl`
        w-8
        h-8
        flex
        justify-center
        items-center
        rounded-full
        border-white
        border
        border-2
        ${left}
        transition ease-in duration-200 origin-left
        ${expanded ? "opacity-100" : "opacity-0"}
    `,
  recordingSvg: (isPlaying: boolean) => cntl`
    w-6
    h-6
    ${isPlaying ? "animate-pulse" : ""}
`,
};

export const ExpandableFloatingButton = ({ children}: ButtonProps) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="relative h-10">
      <FloatingButton color={open ? "bg-red-500 hover:bg-red-700" : "bg-blue-500 hover:bg-blue-700"} contentType={open ? "close" : "plus"} onClick={handleClick} position="absolute left-0" />
      <div className={classes.expandableArea(open)}>
       {children}
      </div>
    </div>
  );
};
