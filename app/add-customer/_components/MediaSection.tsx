"use client"

import { Attachment } from "./Attachment";
import { Audio } from "./Audio";
import { Photos } from "./Photo";


export const MediaSection = () => {
    return (
        <div className="flex flex-col w-full gap-4">
        <div>
          <h2 className="text-[#192434] text-lg font-semibold">File & Media Upload...</h2>
          <h4 className="text-[#1B2B41]/69 text-sm font-medium">
            Seamlessly Upload Documents, Voice Clips, and Images
          </h4>
        </div>
        <div className="flex flex-col gap-2">
          <Attachment />
          <Audio />
          <Photos />
        </div>
      </div>
    )
}
