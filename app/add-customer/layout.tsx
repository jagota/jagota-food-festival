"use client";
import cntl from "cntl";
import { LayoutEventHeader } from "./_components/LayoutEventHeader";
import { CustomerType, useCustomerType } from "@/context/CustomerTypeContext";
import { LayoutCustomerHeader } from "./_components/LayoutCustomerHeader";

interface AddCustomerLayoutProps {
  children: React.ReactNode;
}

const classes = {
    gradientContainer: (isCustomer: boolean) => cntl`
        w-full min-h-screen
        px-4 py-5
        flex flex-col justify-center items-center
        ${isCustomer ? 'bg-gradient-to-b from-[#2D03E5] to-[#1CE2DA]' : 'bg-gradient-to-b from-[#B412EC] to-[#E27B1C]'}
    `,
    whiteLayout: cntl`
        w-full p-5
        bg-white rounded-[16px]
    `,
}
export default function Layout({ children }: AddCustomerLayoutProps) {
    const { selectedCustomerType } = useCustomerType();

  return (
    <div className={classes.gradientContainer(selectedCustomerType === "customer")}>
      <div className={classes.whiteLayout}>
      <LayoutEventHeader />
      <LayoutCustomerHeader />
      {children}
      </div>
      
    </div>
  );
}
