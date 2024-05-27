"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext';
import { EventList } from './_home/EventList';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';

export default function Home() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  useEffect(() => {
    console.log("user", user);
    if (user === null) {
      router.replace('/login');
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
}

  return (
    <div className="min-w-screen min-h-screen bg-white px-4 pt-4 pb-20">
      <Header />
      <SearchBar value={searchTerm} onChange={handleChange} />
      <EventList searchTerm={searchTerm} />
      {/* <FloatingButton
            contentType="plus"
            color="bg-blue-500 hover:bg-blue-700"
            onClick={() => {selectCustomerType("customer");router.push("/add-customer");}}
            position="fixed bottom-20 left-10 w-20"
            text="Customer"
          />
          <FloatingButton
            contentType="plus"
            color="bg-cyan-700 hover:bg-cyan-500"
            onClick={() => {selectCustomerType("supplier");router.push("/add-customer");}}
            position="fixed bottom-20 right-10 w-20"
            text="Supplier"
          /> */}
    </div>
  );
}
