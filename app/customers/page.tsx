"use client"
import { CustomerList } from "./_customers/CustomerList";

export default function CustomerPage() {
    return (
        <div className='min-w-screen min-h-screen bg-white py-20'>
        <CustomerList />
      </div>
    )
}