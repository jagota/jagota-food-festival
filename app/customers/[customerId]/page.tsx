"use client"
import { getOneCustomer } from "@/apihandler/customer.api";
import { CustomerForm } from "@/app/add-customer/_components/CustomerForm";
import { CustomerFormProvider, useCustomerForm } from "@/app/add-customer/_components/context/CustomerContext";
import { useEffect } from "react";
import { CustomerViewComponent } from "./CustomerViewComponent";

interface CustomerIdPageProps {
    params: {
        customerId: string;
    }
}
export default function CustomerViewPage({ params}: CustomerIdPageProps) {

    return (
        <CustomerFormProvider>
              <CustomerViewComponent customerId={params.customerId} />
      </CustomerFormProvider>
    )
}

export const runtime = 'edge';