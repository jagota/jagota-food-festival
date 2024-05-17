'use client'
import {
  PaperClipIcon
} from '@heroicons/react/20/solid';
import { upload } from '@/apihandler/upload.api';
import { WebCamComponent } from '@/components/webcam';
import { useState } from 'react';
export default function AddCustomer() {
    const [openCamera, setOpenCamera ] = useState(false);
    const handleClick = () => {
        console.log("Floating button clicked");
    
    }
    
    const handleAttachmentClick = async (
      e: React.ChangeEvent<HTMLInputElement>
  ) => {
      try {
          if (e.target.files) {
              const urls = await Promise.all(
                  Array.from(e.target.files).map(async (file) => {
                      const res = await upload({
                          name: file.name,
                          type: file.type,
                      })
                      const {
                          data: { presignedUrl, objectKey },
                          success,
                      } = res.data
                      if (success !== true) return ''
                      // To save images.
                      const uploadToR2Response = await fetch(presignedUrl, {
                          method: 'PUT',
                          headers: {
                              'Content-Type': file.type,
                          },
                          body: file,
                      })
                      console.log('uploadToR2Response', uploadToR2Response)
                      const url = `${process.env.NEXT_PUBLIC_R2_BUCKET_DOMAIN}/${objectKey}`
                      console.log('url', file.name, url, objectKey)
                      return url
                  })
              )

              console.log('urls', urls)
              // setAttachedFilesUrl(urls)
          }
      } catch (e) {
          console.log('error', e)
      }
  }
  return (
    <div>
      <p>
      Add Customer
      </p>
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
      {openCamera ? <div>
        <p>This is camera</p>
        <WebCamComponent onClose={() => setOpenCamera(false)}  />
      </div> : null}
    </div>
  );
}