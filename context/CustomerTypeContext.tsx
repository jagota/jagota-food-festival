'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import { LocalStorage } from "@/utils/LocalStorage.utils";

// Create a context to manage authentication-related data and functions
const CustomerTypeContext = createContext<{
  selectedCustomerType: string | null;
  selectCustomerType: (customerType: null | string) => void;
}>({
    selectedCustomerType: null,
    selectCustomerType: (customerType: null | string) => {},
});

const useCustomerType = () => useContext(CustomerTypeContext);

const CustomerTypeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCustomerType, setSelectedCustomerType] = useState<string | null>(null);

  const selectCustomerType = (customerType: null | string) => {
    setSelectedCustomerType(customerType);
    LocalStorage.set("selectedCustomerType", customerType);
  };

  useEffect(() => {
    const _customerType = LocalStorage.get("selectedCustomerType");
    if (_customerType) {
      setSelectedCustomerType(_customerType);
    }
  }, []);

  // Provide authentication-related data and functions through the context
  return (
    <CustomerTypeContext.Provider value={{ selectedCustomerType, selectCustomerType }}>
      {children}
    </CustomerTypeContext.Provider>
  );
};

// Export the context, provider component, and custom hook
export { CustomerTypeContext, CustomerTypeProvider, useCustomerType };
