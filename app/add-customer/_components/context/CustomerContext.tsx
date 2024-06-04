'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { LocalStorage } from "@/utils/LocalStorage.utils";
import { addCustomer } from "@/apihandler/customer.api";
import { CustomerInterface, ICustomerForm, ICustomerFormData, ICustomerToDB } from "@/interfaces/Customer.interface";
import { ChipItem } from "@/components/chip-component/chipItem.type";
// Create a context to manage authentication-related data and functions

const initialCustomerFormState: ICustomerFormData = {
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
    attachments: [],
    customerType: "",
    event: "",
};
const locationData: { provinces: ChipItem[], amphur: ChipItem[]} = {
  provinces: [],
  amphur: []
}
const CustomerFormContext = createContext<{
  customer: ICustomerFormData;
  addValueToCustomer: (key: string, value: any) => void;
  getDataFromAiVision: (data: any) => void;
  loadData: (customerDB: CustomerInterface) => void;
  addLocation: (key: "provinces" | "amphur", value: ChipItem[]) => void;
   location: { provinces: ChipItem[], amphur: ChipItem[]}
}>({
    customer: initialCustomerFormState,
    addValueToCustomer: (key: string, value: any) => {},
    getDataFromAiVision: (data: any) => {},
    loadData: (customerDB: CustomerInterface) => {},
    addLocation: (key: "provinces" | "amphur", value: ChipItem[]) => {},
   location: locationData
});

const useCustomerForm = () => useContext(CustomerFormContext);

const CustomerFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [customer, setCustomer] = useState<ICustomerFormData>(initialCustomerFormState);
  const [location, setLocation] = useState<{ provinces: ChipItem[], amphur: ChipItem[]}>(locationData);

  const addValueToCustomer = (key: string, value: any) => {
    setCustomer({ ...customer, [key]: value });
  };

  const addLocation = (key: "provinces" | "amphur", value: ChipItem[]) => {
    setLocation({ ...location, [key]: value });
  };

  const loadData = (customerDB: CustomerInterface) => {
    console.log("customer is loaded", customerDB);
    setCustomer({
      interested_in: customerDB.interested_in,
      shop_type: customerDB.shop_type,
      contactPersonName: customerDB.contactPersonName,
      companyName: customerDB.companyName,
      mobile: customerDB.mobile,
      email: customerDB.email,
      line: customerDB.line,
      province: customerDB.province,
      district: customerDB.district,
      image: customerDB.image,
      audio: customerDB.audio,
      attachments: customerDB.attachments,
      customerType: customerDB.customerType,
      event: customerDB.event,
      country: customerDB.country,
    });
  };

  const getDataFromAiVision = (data: any) => {
    if (data && typeof data === 'object') {
      const {fullName, mobile, companyName, address, email} = data;
      const addressArray = address.split(",");
      const province = addressArray[0];
      const district = addressArray[1];
      setCustomer({
        ...customer,
        contactPersonName: fullName,
        mobile: mobile,
        companyName: companyName,
        province,
        district,
        email: email,
      });
    }
  }

  // Provide authentication-related data and functions through the context
  return (
    <CustomerFormContext.Provider value={{ addValueToCustomer, getDataFromAiVision, customer, loadData, addLocation, location }}>
      {children}
    </CustomerFormContext.Provider>
  );
};

// Export the context, provider component, and custom hook
export { CustomerFormContext, CustomerFormProvider, useCustomerForm };
