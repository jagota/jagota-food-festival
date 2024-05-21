'use client'
 
import { useRouter } from 'next/navigation'
import { FloatingButton } from "@/components/ui/floating-button";
import Image from "next/image";

export default function Home() {
    const router = useRouter()
    const handleClick = () => {
        router.push('/add-customer');
    }
  return (
    <div>
      <p>
      Product Page
      </p>
      <FloatingButton contentType="plus" onClick={handleClick} />
    </div>
  );
}
