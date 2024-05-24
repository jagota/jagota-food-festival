"use client";

import { FloatingButton } from "@/components/ui/floating-button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    function redirectToJagota() {
      router.push("https://www.jagota.com/catalogue2024/");
    }
    redirectToJagota();
  }, []);
  const handleClick = () => {
    router.push("https://www.jagota.com/catalogue2024/");
  }
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center bg-gray-100 py-20">
      <FloatingButton contentType="plus" position='relative' onClick={handleClick} />
    </div>
  );
}
