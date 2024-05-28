"use client";
import { Icon } from "@/components/Icon";
import cntl from "cntl";
import Image from "next/image";
import { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";

type link = {
  text: string;
  link: string;
  image: string;
  logo: string;
};
const links: link[] = [
  {
    text: "Website",
    logo: "https://pub-fb5a013cefbf40f9b1b5aab8fb330e8f.r2.dev/assets%2Fweb.svg",
    link: "https://www.jagota.com",
    image: "https://pub-fb5a013cefbf40f9b1b5aab8fb330e8f.r2.dev/assets%2Fqr%2Fjagota-web-qr.png",
  },
  {
    text: "Facebook",
    link: "https://www.facebook.com/jagotathailand",
    image: "https://pub-fb5a013cefbf40f9b1b5aab8fb330e8f.r2.dev/assets%2Fqr%2Ffacebook-jagota-qr.png",
    logo: "https://pub-fb5a013cefbf40f9b1b5aab8fb330e8f.r2.dev/assets%2Ffacebook.svg"
  },
  {
    text: "Instagram",
    link: "https://www.instagram.com/jagotaofficial",
    image: "https://pub-fb5a013cefbf40f9b1b5aab8fb330e8f.r2.dev/assets%2Fqr%2Finstagram-jagota-qr.png",
    logo: "https://pub-fb5a013cefbf40f9b1b5aab8fb330e8f.r2.dev/assets%2Finstagram.svg"
  },
  {
    text: "Line",
    link: "https://www.instagram.com/jagotaofficial",
    image: "https://pub-fb5a013cefbf40f9b1b5aab8fb330e8f.r2.dev/assets%2Fqr%2Fline-jagota-qr.jpeg",
    logo: "https://pub-fb5a013cefbf40f9b1b5aab8fb330e8f.r2.dev/assets%2Fline.svg"
  },
];

const classes = {
    container: "min-w-screen min-h-screen bg-[#F4F5F7] px-[16px] py-20 flex flex-col",
    image: "mx-auto mt-20",
    title: "text-center text-[#192434] text-2xl pb-8",
    grid: "grid grid-cols-2 gap-4 w-[336px] mx-auto",
    button: "pointer w-40 h-40 bg-white rounded-[8px] flex flex-col justify-center items-center gap-1 m-auto",
    text: "text-black text-sm font-medium",
    fullWidthQr: (open: boolean) => cntl`
        fixed top-10 left-2 right-2 bottom-10 
        transition ease-in duration-200 origin-0
        bg-white rounded-[8px] flex flex-col justify-center items-center gap-1
        ${open ? "scale-100" : "scale-0"}
    `
    };

export default function QuickLinks() {
    const [openQr, setOpenQr] = useState("");

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, qrItem: string) => {
        e.preventDefault();
        setOpenQr(qrItem);
    }

    const renderLink = (item: link, index: number) => {
        return (
          <>
            <button
              key={item.text}
              onClick={(e) => handleClick(e, item.text)}
              className="pointer w-40 h-40 bg-white rounded-[8px] flex flex-col justify-center items-center gap-1 m-auto"
            >
              <Image
                width={120}
                height={120}
                src={item.image}
                className="mb-2"
                alt={item.text}
              />
              {/* <h4 className="text-black text-sm font-medium">{item.text}</h4> */}
              <Image
                width={20}
                height={20}
                src={item.logo}
                className=""
                alt={item.text}
              />
            </button>
            <div className={classes.fullWidthQr(openQr === item.text)}>
                <div className="w-[310px] relative">
                <button className="bg-transparent" onClick={(e) => handleClick(e, "")}>
                    <Icon contentType="close" classNames="absolute top-[-20px] right-0" size="w-16 h-16" />
                </button>
                </div>
                <Image
                    width={300}
                    height={300}
                    src={item.image}
                    className="mx-auto"
                    alt={item.text}
                />
                 <h4 className="text-black text-2xl mb-4 font-medium">{item.text}</h4>
                
            </div>
          </>
        );
      };
  return (
    <div className="min-w-screen min-h-screen bg-[#F4F5F7] px-[16px] py-20 flex flex-col">
      <Image
        width={32}
        height={60}
        src="/jagota-logo.svg"
        alt="Jagota logo"
        className="mx-auto mt-32"
      />
      <h2 className="text-center text-[#192434] text-2xl mt-6 mb-12 pb-8">
        Share with a Customer
      </h2>
      <div className="grid grid-cols-2 gap-4 w-[336px] mx-auto">
        {links.map(renderLink)}
      </div>
    </div>
  );
}
