"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext';
import { EventList } from './_home/EventList';
import { FloatingButton } from '@/components/ui/floating-button';
import { useCustomerType } from '@/context/CustomerTypeContext';

export default function Home() {
  const { user } = useAuth();
  const { selectCustomerType } = useCustomerType();
  const router = useRouter();
  useEffect(() => {
    console.log("user", user);
    if (user === null) {
      router.replace('/login');
    }
  }, [user]);
  return (
    <div className="min-w-screen min-h-screen bg-gray-100 py-20">
      <EventList />
      <FloatingButton
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
          />
    </div>
  );
}
