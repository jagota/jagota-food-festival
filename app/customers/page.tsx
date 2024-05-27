"use client";
import { Header } from "@/components/Header";
import { CustomerList } from "./_customers/CustomerList";
import { SearchBar } from "@/components/SearchBar";
import { useState } from "react";

export default function CustomerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
}

  return (
    <div className="min-w-screen min-h-screen bg-white px-4 pt-4 pb-20">
      <Header />
      <SearchBar value={searchTerm} onChange={handleChange} />
      <CustomerList searchTerm={searchTerm} />
    </div>
  );
}
