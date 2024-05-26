import { ChipItem } from "@/components/chip-component/chipItem.type";

export interface ICustomerFormData {
    interested_in: string[];
    shop_type: ChipItem[];
    contactPersonName: string;
    companyName: string;
    mobile?: string;
    email: string;
    line: string;
    province?: string;
    district?: string;
    image?: string;
    audio?: string;
}
export interface ICustomerForm {
    interested_in: string[];
    shop_type: string[];
    contactPersonName: string;
    companyName: string;
    mobile?: string;
    email: string;
    line: string;
    province?: string;
    district?: string;
    image?: string;
    audio?: string;
}

export interface ICustomerToDB extends ICustomerForm {
    salesPerson: string;
    customerType: string;
    source?: string;
}

export interface CustomerInterface extends ICustomerToDB {
    username: string;
}
  