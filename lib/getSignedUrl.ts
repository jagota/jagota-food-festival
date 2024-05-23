import { upload } from '@/apihandler/upload.api';

const uploadFile = async (file: File) => {
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
    const url = `${process.env.NEXT_PUBLIC_R2_BUCKET_DOMAIN}/${objectKey}`
    return url
}

export { uploadFile };