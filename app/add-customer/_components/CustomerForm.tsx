"use client"
import { useRouter } from 'next/navigation';
import { ICustomerToDB } from "@/interfaces/Customer.interface"
import { AboutSection } from "./AboutSection"
import { ContactSection } from "./ContactSection"
import { InterestSection } from "./InterestSection"
import { LocationSection } from "./LocationSection"
import { MediaSection } from "./MediaSection"
import { useCustomerForm } from "./context/CustomerContext"
import { Button } from "@/components/ui/button"
import { addCustomer } from "@/apihandler/customer.api"
import Swal from "sweetalert2"
import { useCustomerType } from '@/context/CustomerTypeContext';
import { useEvent } from '@/context/EventContext';
import { useAuth } from '@/context/AuthContext';

export const CustomerForm = () => {
    const { customer} = useCustomerForm();
    const { selectedCustomerType } = useCustomerType();
    const { selectedEvent } = useEvent();
    const { user } = useAuth();
    const router = useRouter()
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const customerData: ICustomerToDB = {
          ...customer,
          customerType: selectedCustomerType as string,
          event: selectedEvent?.name as string,
          salesPerson: user?.staffCode as string,
        };
        const addCustomerRes = await addCustomer(customerData);
        if (addCustomerRes.error === false) {
          Swal.fire({
            title: "Customer Added Successfully!",
            confirmButtonText: "OK",
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              router.push('/customers');
            }
          });
    }
      const handleClick = async () => {
    
    
    }
  };
    return (
        <form action="" className="overflow-hidden flex flex-col gap-10 w-full mb-10">
        <AboutSection />
        <ContactSection />
        <LocationSection />
        <InterestSection /> 
        <MediaSection />
        <Button
            variant={"default"}
          onClick={handleClick}
        >Submit</Button>
      </form>
    )
}