import { getOneCustomer } from "@/apihandler/customer.api";
import { CustomerForm } from "@/app/add-customer/_components/CustomerForm";
import { CustomerFormProvider, useCustomerForm } from "@/app/add-customer/_components/context/CustomerContext";
import cntl from "cntl";
import { useEffect } from "react";
import { LayoutEventHeader } from "./_components/LayoutEventHeader";
import { LayoutCustomerHeader } from "./_components/LayoutCustomerHeader";

interface CustomerViewProps {
    customerId: string;
}

const classes = {
    gradientContainer: (isCustomer: boolean) => cntl`
        w-full min-h-screen
        px-4 py-5 pb-20
        flex flex-col justify-center items-center
        ${isCustomer ? 'bg-gradient-to-b from-[#2D03E5] to-[#1CE2DA]' : 'bg-gradient-to-b from-[#B412EC] to-[#E27B1C]'}
    `,
    whiteLayout: cntl`
        w-full p-5
        bg-white rounded-[16px]
    `,
}

export const CustomerViewComponent = ({customerId }: CustomerViewProps) => {
    const {loadData, customer} = useCustomerForm();
    console.log("customer id page", customer);

    useEffect(() => {
        async function fetchCustomer() {
          const res = await getOneCustomer(customerId);
          if (!res.error && res.data) {
            // setEvents(res.data || []);
            console.log("res", res);
            console.log("loadData", loadData, customer);
            loadData(res.data);
            console.log("loadData", loadData, customer);
          }
        }
        fetchCustomer();
      }, []);
    return (
        <div className={classes.gradientContainer(customer.customerType === "customer")}>
        <div className={classes.whiteLayout}>
        <LayoutEventHeader />
        <LayoutCustomerHeader />
        <CustomerForm edit={false} />
        </div>
        
      </div>
    )
}