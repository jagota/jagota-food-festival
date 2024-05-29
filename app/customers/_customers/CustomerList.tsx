"use client";

import { IProductDB, getProducts } from "@/apihandler/product.api";
import { useEffect, useState } from "react";
import { CustomerItem } from "./CustomerItem";
import { CustomerInterface } from "@/interfaces/Customer.interface";
import { useAuth } from "@/context/AuthContext";
import { getCustomers, getAllCustomers } from "@/apihandler/customer.api";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

interface IProps {
  searchTerm?: string;
}
export const CustomerList = ({ searchTerm }: IProps) => {
  let [customers, setCustomers] = useState<CustomerInterface[]>([]);
  let [showCustomer, setShowCustomers] = useState<CustomerInterface[]>([]);
  let [showAll, setShowAll] = useState(false);
  const { user } = useAuth();
  const idAdmin = user?.staffCode === "SUNIL04";
  useEffect(() => {
    async function fetchCustomers() {
      const res = await getCustomers(user?.staffCode || "");
      console.log("customers", res);
      if (!res.error) {
        setCustomers(res.data || []);
      }
    }
    async function fetchAllCustomers() {
      const res = await getAllCustomers();
      console.log("customers", res);
      if (!res.error) {
        setCustomers(res.data || []);
      }
    }
    if (user?.staffCode) {
      if (showAll) {
        fetchAllCustomers();
      } else {
        fetchCustomers();
      }
    }
  }, [user, showAll]);

  useEffect(() => {
    if (searchTerm) {
      let text = "";
      const filteredCustomer = customers.filter((customer) => {
        text = customer.contactPersonName + customer.companyName;
        return text.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setShowCustomers(filteredCustomer);
    } else {
      setShowCustomers(customers);
    }
  }, [searchTerm, customers]);

  const handleChecked = () => {
    setShowAll(!showAll);
  };

  const renderAllCustomerSwitch = () => {
    if (idAdmin) {
      return (
        <div className="flex items-center space-x-2 mt-4">
          <Checkbox
            id="all-customer-check"
            checked={showAll}
            onCheckedChange={handleChecked}
          />
          <Label className="flex-1" htmlFor="all-customer-check">
            Get All Customer
          </Label>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="">
      {renderAllCustomerSwitch()}
      <div className="flex flex-col gap-2">
        {showCustomer &&
          showCustomer.map((item, index) => {
            return <CustomerItem key={index} customer={item} />;
          })}
      </div>
    </div>
  );
};
