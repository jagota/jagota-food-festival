"use client";
import { useRouter } from "next/navigation";
import { ICustomerToDB } from "@/interfaces/Customer.interface";
import { AboutSection } from "./AboutSection";
import { ContactSection } from "./ContactSection";
import { InterestSection } from "./InterestSection";
import { LocationSection } from "./LocationSection";
import { MediaSection } from "./MediaSection";
import { useCustomerForm } from "./context/CustomerContext";
import { Button } from "@/components/ui/button";
import { addCustomer } from "@/apihandler/customer.api";
import Swal from "sweetalert2";
import { useCustomerType } from "@/context/CustomerTypeContext";
import { useEvent } from "@/context/EventContext";
import { useAuth } from "@/context/AuthContext";
import { emailIsValid } from "@/lib/email.util";

interface CustomerFormProps {
  edit: boolean;
}

type requiredFieldType = "contactPersonName" | "companyName" | "shop_type" | "mobile";
const requiredFields: requiredFieldType[] = ["contactPersonName", "companyName", "shop_type", "mobile"];
interface IFormError {
  error: boolean,
  messages: string[]
}
const validateForm = (customer: ICustomerToDB): IFormError => {
  let error = false; 
  const messages: string[] = [];
  requiredFields.forEach((field) => {
    console.log("field", field, customer[field]);
    if (field === "shop_type") {
      if (customer.shop_type.length === 0) {
        error = true;
        messages.push("Shop Type is required");
      }
    } else {
      if (customer[field] === "" || customer[field] === undefined) {
        error = true;
        messages.push(`${field} is required`);
      }
    }
  });
  // validate email
  if (customer.email !== "") {
    if (emailIsValid(customer.email) === false) {
      error = true;
      messages.push("Email is not valid");
    }
  }
  return { error, messages };
};

export const CustomerForm = ({ edit }: CustomerFormProps) => {
  const { customer } = useCustomerForm();
  const { selectedCustomerType } = useCustomerType();
  const { selectedEvent } = useEvent();
  const { user } = useAuth();
  const router = useRouter();
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const customerData: ICustomerToDB = {
      ...customer,
      customerType: selectedCustomerType as string,
      event: selectedEvent?.name as string,
      salesPerson: user?.staffCode as string,
    };
    console.log("customerData", customerData);
    const validatedObj = validateForm(customerData);
    console.log("validatedObj", validatedObj);
    if (validatedObj.error === true) {
      Swal.fire({
        title: "Error",
        text: validatedObj.messages[0],
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    } else {
      Swal.fire({
        title: "Error",
        text: "every things is ok",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    const addCustomerRes = await addCustomer(customerData);
    console.log("addCustomerRes", addCustomerRes)
    if (addCustomerRes.error === false) {
      Swal.fire({
        title: "Customer Added Successfully!",
        confirmButtonText: "OK",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          router.push("/customers");
        }
      });
    } else {
      Swal.fire({
        title: "Error",
        text: addCustomerRes.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <form
      action=""
      className="overflow-hidden flex flex-col gap-10 w-full mb-10"
    >
      <AboutSection />
      <ContactSection />
      <LocationSection />
      <InterestSection />
      <MediaSection />
      {edit ? (
        <Button variant={"default"} onClick={handleClick}>
          Submit
        </Button>
      ) : null}
    </form>
  );
};
