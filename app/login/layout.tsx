"use client";
import cntl from "cntl";
import Image from "next/image";

interface LoginLayoutProps {
  children: React.ReactNode;
}

const classes = {
    loginPageLayout:  cntl`
        min-h-screen flex w-full flex-col
    `,
    whiteLayout: cntl`
       h-[50vh] bg-white
    `,
    blueLayout: cntl`
        h-[50vh] bg-[#2D03E5] relative
    `,
    loginContainer: cntl`
    w-[90%] max-w-[400px] bg-white rounded-[10px] shadow-lg p-6
    absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
    `
}
export default function Layout({ children }: LoginLayoutProps) {

  return (
    <div className={classes.loginPageLayout}>
      <div className={classes.blueLayout}>
        <div className="w-[90%] max-w-[400px] absolute bottom-[120px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image 
            src="https://pub-fb5a013cefbf40f9b1b5aab8fb330e8f.r2.dev/assets%2Flogo-white.svg" 
            width="0"
            height="0"
            sizes="100vw"
            className="w-auto h-[54px] mx-auto"
            alt="Jagota Logo" />
            <h2 className="text-[28px] mt-8 text-[#EEEEEE] text-center font-medium capitalize">Jagota Connect</h2>
            <p className="text-center font-normal text-[#EEEEEE] text-sm">Seamlessly Connecting and Collecting Event Data</p>
        </div>
      </div>
      <div className={classes.whiteLayout} />
      <div className={classes.loginContainer}>
      {children}
      </div>
    </div>
  );
}
