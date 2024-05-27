"use client";
import { Header } from "@/components/Header";
import { CustomerList } from "./_customers/CustomerList";
import { SearchBar } from "@/components/SearchBar";

export default function CustomerPage() {
  return (
    <div className="min-w-screen min-h-screen bg-white px-4 pt-4 pb-20">
      <Header />
      <SearchBar />
      <CustomerList />
    </div>
  );
}
