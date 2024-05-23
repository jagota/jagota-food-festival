"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext';
import { EventList } from './_home/EventList';

export default function Home() {
  return (
    <div className="min-w-screen min-h-screen bg-gray-100 py-20">
      <EventList />
    </div>
  );
}
