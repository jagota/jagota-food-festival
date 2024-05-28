"use client";
import cntl from "cntl";
import { HiArrowSmallLeft, HiMiniPlus } from "react-icons/hi2";
import { useCustomerForm } from "./context/CustomerContext";
import { ChipItem } from "@/components/chip-component/chipItem.type";
import { images } from "@/constants/images";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCustomerType } from "@/context/CustomerTypeContext";

export const interests: ChipItem[] = [
  { id: 1, name: "Meat" },
  { id: 2, name: "Seafood" },
  { id: 3, name: "Dairy & Non Dairy" },
  { id: 4, name: "Western Gourmet" },
  { id: 5, name: "Japanesh Ingradients" },
  { id: 6, name: "Bakery" },
  { id: 7, name: "Frozen Bakery" },
  { id: 8, name: "Fruits, Nuts, Vegitables" },
  { id: 9, name: "Frozen Snacks" },
  { id: 10, name: "Beverage" },
  { id: 11, name: "Ice Cream" },
  { id: 12, name: "Snacks" },
  { id: 13, name: "Non-Food" },
];

const interestImages: Record<string, string> = {
  Meat: images.interests.meet,
  Seafood: images.interests.seafood,
  "Dairy & Non Dairy": images.interests.dairy,
  "Western Gourmet": images.interests.western,
  "Japanesh Ingradients": images.interests.japanese,
  Bakery: images.interests.bakery,
  "Frozen Bakery": images.interests.frozenBakery,
  "Fruits, Nuts, Vegitables": images.interests.fruit,
  "Frozen Snacks": images.interests.frozenSnacks,
  Beverage: images.interests.beverage,
  "Ice Cream": images.interests.iceCream,
  Snacks: images.interests.snacks,
  "Non-Food": images.interests.nonFood,
};

const initialAllInterest: Record<string, boolean> = {
  Meat: false,
  Seafood: false,
  "Dairy & Non Dairy": false,
  "Western Gourmet": false,
  "Japanesh Ingradients": false,
  Bakery: false,
  "Frozen Bakery": false,
  "Fruits, Nuts, Vegitables": false,
  "Frozen Snacks": false,
  Beverage: false,
  "Ice Cream": false,
  Snacks: false,
  "Non-Food": false,
};

const classes = {
  selectedFieldContainer: cntl`
    relative border border-[#1A3860]/10 p-4
    
    `,
  optionContainer: (isSelectedOptions: boolean) => cntl`
    flex flex-row flex-wrap gap-2.5
    ${isSelectedOptions ? "" : ""}
    `,
  item: (isSelected: boolean, goingToBeSelected: boolean) => cntl`
    relative py-3 px-4 flex flex-row gap-2 items-center 
    text-base font-medium cursor-pointer rounded-[8px]
    ${
      isSelected
        ? "bg-[#193B67]/5 text-[#1C304A]/52"
        : goingToBeSelected
        ? "bg-[#192434] text-white border border-[#1C304A]/52"
        : "bg-white text-[#1C304A]/52 border border-[#1C304A]/52"
    }
    
    `,
  addButton: cntl`
    rounded-[32px] h-10 w-24 flex px-4 flex items-center justify-between
    bg-[#192434] text-white text-base font-medium
    `,
};
export const InterestSection = () => {
  const { customer, addValueToCustomer } = useCustomerForm();
  const { selectedCustomerType } = useCustomerType();
  const [allInterest, setAllInterest] =
    useState<Record<string, boolean>>(initialAllInterest);
  const [open, setOpen] = useState(false);
  const title = selectedCustomerType === "customer" ? "Interests" : "Supply Product Category"

  const handleSelect = (
    e: React.MouseEvent<HTMLButtonElement>,
    interestName: string
  ) => {
    e.preventDefault();
    const status = allInterest[interestName];
    setAllInterest({
      ...allInterest,
      [interestName]: !status,
    });
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(!open);
  };

  const handleSubmitInterest = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const selectedInterest = Object.keys(allInterest).filter(
      (interest) => allInterest[interest]
    );
    addValueToCustomer("interested_in", selectedInterest);
    setOpen(false);
  }

    useEffect(() => {
       (customer.interested_in || []).forEach((interest) => {
        console.log(interest);
        setAllInterest((prev) => ({...prev, [interest]: true}));
       });
    }, [customer.interested_in]);

  const renderInterest = (interestName: string, isSelected: boolean) => {
    return (
      <button
        key={interestName}
        className={classes.item(isSelected, allInterest[interestName])}
        onClick={(e) => handleSelect(e, interestName)}
      >
        <Image
          width={24}
          height={24}
          src={interestImages[interestName] as string}
          alt={interestName}
        />
        <span>{interestName}</span>
      </button>
    );
  };
  if (open) {
    return (
      <div className="fixed top-0 left-0 w-full min-h-screen z-10 bg-white px-4 py-5 flex flex-col gap-6">
        <div className="w-full h-12 flex justify-between items-center overflow-hidden">
          <button
            onClick={handleClick}
            className="rounded-full relative w-10 h-10 overflow-hidden bg-transparent mouse transition ease-in duration-200 focus:outline-none"
          >
            <HiArrowSmallLeft className="w-8 h-8 text-black" />
          </button>
          <h4 className="text-[#192434] text-[22px] font-semibold capitalize">
            {title}
          </h4>
          <span className="w-10 "></span>
        </div>
        <h4 className="leading-7 text-base text-[#192739]/94 font-normal">{`You can choose more than one thing you're interested in! 😊"`}</h4>

        <h2 className="text-[#192434] text-lg font-semibold">Categories</h2>

        <div className={classes.optionContainer(false)}>
          {interests.map((interest) => renderInterest(interest.name, false))}
        </div>
        <div className="fixed left-0 px-4 w-full h-10 bottom-10 flex justify-center">
          <Button className="w-full" onClick={handleSubmitInterest} variant={"default"}>
            Continue
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full gap-4">
      <div>
        <h2 className="text-[#192434] text-lg font-semibold">{title}</h2>
        <h4 className="text-[#1B2B41]/69 text-sm font-medium">
          Get specific about the thing you interest.
        </h4>
      </div>
      <div className="flex flex-col gap-4 p-4 rounded-[8px] border border-[#1A3860]/10">
        <div className={classes.optionContainer(true)}>
          {customer.interested_in &&
            customer.interested_in.map((interest) =>
              renderInterest(interest, true)
            )}
        </div>
        <div className="flex flex-row-reverse">
          <button onClick={handleClick} className={classes.addButton}>
            Add
            <HiMiniPlus className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
};
