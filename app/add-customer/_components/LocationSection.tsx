"use client";
import InputChipComponent from "@/components/chip-component/InputChipComponent";
import { ChipItem } from "@/components/chip-component/chipItem.type";
import Menu from "@/components/chip-component/menu";
import MenuItem from "@/components/chip-component/menuItem";
import { FormInput } from "@/components/formInput";
import { useCustomerForm } from "./context/CustomerContext";
import { useEffect, useState } from "react";
import { Combobox } from "@/components/ui/ComboBox";

type locationType = {id: string, name: string}
const provinces: locationType[] = [
    {id: "1", name: "Province 1"},
    {id: "2", name: "Province 2"},
    {id: "3", name: "Province 3"},
];

const amphur: Record<string, locationType[]> = {
    "Province 1": [
        {id: "1", name: "Amphur 1"},
        {id: "2", name: "Amphur 2"},
        {id: "3", name: "Amphur 3"},
    ],
    "Province 2": [
        {id: "4", name: "Amphur 4"},
        {id: "5", name: "Amphur 5"},
    ],
    "Province 3": [
        {id: "6", name: "Amphur 1"},
        {id: "7", name: "Amphur 7"},
        {id: "8", name: "Amphur 8"},
        {id: "9", name: "Amphur 9"},
    ],
}

export const LocationSection = () => {
    const {customer, location, addLocation, addValueToCustomer} = useCustomerForm();
    const [amphurList, setAmphurList] = useState<locationType[]>([]);

    const setProvince = (province: string) => {
        addValueToCustomer("province", province);
    }
    const setAmphur = (amphur: string) => {
        addValueToCustomer("district", amphur);
    }

    useEffect(() => {
        console.log(customer.province);
        if (!customer.province) return;
        setAmphurList(amphur[customer.province]);
    }, [customer.province])

    return (
        <div className="flex flex-col w-full gap-4">
            <h2 className="text-[#192434] text-lg font-semibold">Location</h2>
            <div className="relative">
            <Combobox name="province" list={provinces} value={customer?.province || ""} setValue={setProvince} placeholder="Select Province" />

            </div>
            <div>
            <Combobox list={amphurList} value={customer?.district || ""} setValue={setAmphur} placeholder="Select Amphur" />

            </div>
        </div>
    )
}




{/* <FormInput
                  value={customer.province}
                  label={"Province"}
                  name={"province"}
                  onChange={handleChange}
                  type={"text"}
                />
            <FormInput
                  value={customer.district}
                  label={"District"}
                  name={"district"}
                  onChange={handleChange}
                  type={"text"}
                /> */}