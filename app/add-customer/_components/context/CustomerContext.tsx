'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { LocalStorage } from "@/utils/LocalStorage.utils";
import { addCustomer } from "@/apihandler/customer.api";
import { ICustomerForm, ICustomerToDB } from "@/interfaces/Customer.interface";
// Create a context to manage authentication-related data and functions

const initialCustomerFormState: ICustomerForm = {
    interested_in: [],
    shop_type: [],
    contactPersonName: "",
    companyName: "",
    mobile: "",
    email: "",
    line: "",
    province: "",
    district: "",
    image: "",
    audio: "",
};
const CustomerFormContext = createContext<{
  customer: ICustomerForm;
  addValueToCustomer: (key: string, value: any) => void;
}>({
    customer: initialCustomerFormState,
    addValueToCustomer: (key: string, value: any) => {}
});

const useCustomerForm = () => useContext(CustomerFormContext);

const CustomerFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [customer, setCustomer] = useState<ICustomerForm>(initialCustomerFormState);

  const addValueToCustomer = (key: string, value: any) => {
    setCustomer({ ...customer, [key]: value });
  };

  // Provide authentication-related data and functions through the context
  return (
    <CustomerFormContext.Provider value={{ addValueToCustomer, customer }}>
      {children}
    </CustomerFormContext.Provider>
  );
};

// Export the context, provider component, and custom hook
export { CustomerFormContext, CustomerFormProvider, useCustomerForm };
