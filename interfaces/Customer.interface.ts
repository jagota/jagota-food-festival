export interface CustomerInterface {
    username: string;
    salesPerson: string;
    interested_in: [string];
    shop_type: [string];
    name: string;
    mobile: string;
    email: string;
    line: string;
    province: string;
    district: string;
    image: string;
    audio: string;
}

export interface ICustomerToDB {
    salesPerson: string;
    interested_in: string[];
    shop_type: string[];
    name: string;
    mobile?: string;
    email: string;
    line: string;
    province?: string;
    district?: string;
    image?: string;
    audio?: string;
    source?: string;
}
  