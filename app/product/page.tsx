'use client'
 
import { useRouter } from 'next/navigation'
import { FloatingButton } from "@/components/ui/floating-button";
import Image from "next/image";
import { ProductList } from './_product/ProductList';

export default function Home() {
    const router = useRouter()
    const handleClick = () => {
        router.push('/add-customer');
    }
  return (
    <div className='min-w-screen min-h-screen bg-gray-100 py-20'>
      <ProductList />
      <FloatingButton contentType="plus" classNames='fixed bottom-20 right-10' onClick={handleClick} />
    </div>
  );
}
