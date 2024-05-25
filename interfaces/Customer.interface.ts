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
  