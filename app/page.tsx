"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'

import Image from "next/image";
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const router = useRouter()
  const { user } = useAuth();

  useEffect(() => {
    if (user === null) {
      console.log("No user found", user)
        router.replace('/login')
    } else {
      console.log("User found", user)
        router.replace('/product')
    }
}, [user])
  return (
    <div className="min-w-screen min-h-screen bg-gray-100">
    </div>
  );
}
