"use client";
import { useState } from "react";
import { FloatingButton } from "./floating-button"
import cntl from "cntl";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
}

const classes = {
    expandableArea: (expanded: boolean) => cntl`
    absolute left-20  h-12 w-full 
    ease-linear origin-left z-20
    ${expanded ? 'scale-100' : 'scale-0'}
    `, 
    circleButton: cntl`
    
    `,
    recordingButton: (expanded: boolean, left?: string) => cntl`
        w-24
        h-24
        flex
        justify-center
        items-center
        rounded-full
        border-white
        border
        border-2
        ${left}
        ease-linear origin-left
        ${expanded ? 'opacity-100' : 'opacity-0'}
    `,
    recordingSvg: (isPlaying: boolean) => cntl`
    w-8
    h-8
    ${isPlaying ? 'animate-pulse' : ''}
`,
}

export const ExpandableFloatingButton = () => {
    const [open, setOpen] = useState(false);
    const handleClick = (e) => {
        e.preventDefault();
        setOpen(!open);
    }
    return (
        <div className="relative">
                <FloatingButton contentType="plus" onClick={handleClick} />
            <div className={classes.expandableArea(open)}>
            <button className={classes.recordingButton(open, "left-24")} onClick={handleClick}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={classes.recordingSvg(true)}>
                <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
              </svg>
            </button>
            <button className={classes.recordingButton(open, "left-24")} onClick={handleClick}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={classes.recordingSvg(false)}>
                <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
              </svg>
            </button>
            <button className={classes.recordingButton(open, "left-72")} onClick={handleClick}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={classes.recordingSvg(false)}>
                <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
              </svg>
            </button>
            </div>
        </div>
    )
}