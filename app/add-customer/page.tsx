"use client";
import { CustomerForm } from "./_components/CustomerForm";
import { CustomerFormProvider } from "./_components/context/CustomerContext";



export default function AddCustomer() {
  return (
    <CustomerFormProvider>
            <CustomerForm edit={true} />
    </CustomerFormProvider>
  )
}