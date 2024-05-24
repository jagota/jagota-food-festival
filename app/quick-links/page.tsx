import Image from 'next/image';
type link = {
    text: string;
    link: string;
    image: string;
}
const links:link[] = [
    {
        text: "Website",
        link: "https://www.jagota.com",
        image: "/jagota-web-qr.png"
    },
    {
        text: "Facebook",
        link: "https://www.facebook.com/jagotathailand",
        image: "/facebook-jagota-qr.png"
    },
    {
        text: "Instagram",
        link: "https://www.instagram.com/jagotaofficial",
        image: "/instagram-jagota-qr.png"
    }
];

const renderLink = (item: link, index: number) => {
    return (
        <div key={item.text} className="flex-1 group flex flex-col items-center gap-1 m-auto">
            <Image width={240} height={240} src={item.image} alt={item.text} />
            <h4 className='text-gray-500 text-lg'>
               {item.text}
            </h4>
        </div>
    );
}
export default function QuickLinks() {
    return (
        <div className="min-w-screen min-h-screen bg-gray-100 py-20">
            <div className='flex flex-col gap-8 mt-8'>
            {links.map(renderLink)}
            </div>
        </div>
    );
}