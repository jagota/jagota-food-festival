"use client";
import cntl from "cntl";
import { HiMiniPlus } from "react-icons/hi2";
import { useCustomerForm } from "./context/CustomerContext";
import { ChipItem } from "@/components/chip-component/chipItem.type";
import { images } from "@/constants/images";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const interests: ChipItem[] = [
    { id: 1, name: "Meat", image: images.interests.meet },
    { id: 2, name: "Seafood", image: images.interests.seafood},
    { id: 3, name: "Dairy & Non Dairy", image: images.interests.dairy },
    { id: 4, name: "Western Gourmet", image: images.interests.western},
    { id: 5, name: "Japanesh Ingradients", image: images.interests.japanese},
    { id: 6, name: "Bakery", image: images.interests.bakery },
    { id: 7, name: "Frozen Bakery", image: images.interests.frozenBakery },
    { id: 8, name: "Fruits, Nuts, Vegitables", image: images.interests.fruit},
    { id: 9, name: "Frozen Snacks", image: images.interests.frozenSnacks},
    { id: 10, name: "Beverage", image: images.interests.beverage},
    { id: 11, name: "Ice Cream" , image: images.interests.iceCream},
    { id: 12, name: "Snacks", image: images.interests.snacks },
    { id: 13, name: "Non-Food" , image: images.interests.nonFood},
  ];

const classes = {
    selectedFieldContainer: cntl`
    relative border border-[#1A3860]/10 p-4
    
    `,
    selectedOptionContainer: cntl`
    flex flex-row flex-wrap gap-4
    `,
    selectedItem: (isSelected: boolean) => cntl`
    relative 
    `,
    addButton: cntl`
    rounded-[32px] h-10 w-24 flex px-4 flex items-center
    bg-[#192434] text-white text-sm font-medium
    `
}
export const InterestSection = () => {
    const {customer, addValueToCustomer} = useCustomerForm();
    const [open, setOpen] = useState(false)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const interests = customer.interested_in || [];
        addValueToCustomer("interested_in", e.target.value);
    }
    const handleSelect = (e: React.MouseEvent<HTMLButtonElement>, interest: ChipItem) => {
        e.preventDefault();
        const interests = customer.interested_in || [];
        const index = interests.findIndex((item) => item === interest.name);
        if (index > -1) {
            interests.splice(index, 1);
        } else {
            interests.push(interest.name);
        }
    }
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpen(!open);
    }
    const addValue = () => {

    }
    const renderInterest = (interest: ChipItem) => {
        return (
           <button onClick={(e) => handleSelect(e, interest)}>{interest.name}</button>
        )
    }
    if (open) {
        return (
            <div className="fixed top-0 left-0 w-full min-h-screen z-10 bg-white">
                {interests.map((interest) => renderInterest(interest))}
                <div className="fixed w-full h-10 bottom-10 flex justify-center">
                <Button onClick={handleClick} variant={"default"}>Continue</Button>
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col w-full gap-4">
            <div>
            <h2 className="text-[#192434] text-lg font-semibold">Interests</h2>
            <h4 className="text-[#1B2B41]/69 text-sm font-medium">Get specific about the thing you interest.</h4>
            </div>
            <div className="flex flex-col gap-4">
                <div className={classes.selectedOptionContainer}>
                    {customer.interested_in && customer.interested_in.map((interest) => {
                        const item = interests.find((item) => item.name === interest);
                        return (
                            <button key={item?.name}>{item?.name}</button>
                        )
                    })}
                </div>
                <div className="flex flex-row-reverse">
                    <button onClick={handleClick} className={classes.addButton}>Add 
                    <HiMiniPlus className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    )
}