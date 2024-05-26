"use client";
import InputChipComponent from "@/components/chip-component/InputChipComponent";
import { ChipItem } from "@/components/chip-component/chipItem.type";
import Menu from "@/components/chip-component/menu";
import MenuItem from "@/components/chip-component/menuItem";
import { useEffect, useState } from "react";
import { useCustomerForm } from "./context/CustomerContext";

const shopTypes: ChipItem[] = [
  {"id": "EN001", "name": "Amusement Park"},
  {"id": "DT001", "name": "Bakery Distributor"},
  {"id": "DT002", "name": "Bakery Stockist"},
  {"id": "FB001", "name": "Bakery shop"},
  {"id": "KS002", "name": "Beverage"},
  {"id": "FT005", "name": "Beverage"},
  {"id": "SHT0028", "name": "Beverage"},
  {"id": "EN003", "name": "Bowling"},
  {"id": "SHT0076", "name": "Budget Chain"},
  {"id": "HT003", "name": "Budget hotel"},
  {"id": "SHT0004", "name": "Bus Service"},
  {"id": "FC002", "name": "Canteen"},
  {"id": "CC001", "name": "Cash & Carry"},
  {"id": "IN008", "name": "Catering - Management"},
  {"id": "SHT0039", "name": "Catering - Traditional"},
  {"id": "RS006", "name": "Chinese"},
  {"id": "SHT0055", "name": "Chinese"},
  {"id": "EN002", "name": "Cinema Hall"},
  {"id": "SHT0011", "name": "Clinic"},
  {"id": "FB005", "name": "Coffee Chain"},
  {"id": "FB002", "name": "Coffee shop"},
  {"id": "SHT0014", "name": "Cold Storage"},
  {"id": "ZC001", "name": "Competitor"},
  {"id": "RT004", "name": "Convenient Store"},
  {"id": "SHT0077", "name": "Dine-in & Take away"},
  {"id": "SHT0001", "name": "Domestic Airline"},
  {"id": "RT006", "name": "Drug store / Pharmacy"},
  {"id": "SHT0029", "name": "Dry Food"},
  {"id": "WS001", "name": "Dry Food Wholesaler"},
  {"id": "IN006", "name": "Embassy"},
  {"id": "EX001", "name": "Exhibition Center"},
  {"id": "FR003", "name": "Export & Import"},
  {"id": "LS002", "name": "Fitness Club"},
  {"id": "SHT0080", "name": "Food Court"},
  {"id": "SHT0070", "name": "Food Institution"},
  {"id": "SHT0079", "name": "Food court - Office Buidling"},
  {"id": "SHT0035", "name": "Football Stadium"},
  {"id": "RS016", "name": "French"},
  {"id": "SHT0059", "name": "French"},
  {"id": "SHT0030", "name": "Fresh Food"},
  {"id": "WS002", "name": "Fresh Food Wholesaler"},
  {"id": "RT008", "name": "Fresh market"},
  {"id": "SHT0013", "name": "Frozen Food Distributor"},
  {"id": "SHT0062", "name": "German"},
  {"id": "RS017", "name": "German"},
  {"id": "LS001", "name": "Golf Club"},
  {"id": "IN005", "name": "Government Office"},
  {"id": "SHT0007", "name": "Guest House"},
  {"id": "HM001", "name": "Home Users"},
  {"id": "IN002", "name": "Hospital"},
  {"id": "SHT0006", "name": "Hostel"},
  {"id": "SHT0009", "name": "Hotel - 3 star"},
  {"id": "SHT0008", "name": "Hotel - 3 star Chain"},
  {"id": "SHT0010", "name": "Hotel - 4 star"},
  {"id": "HT001", "name": "Hotel - 5 star"},
  {"id": "RT002", "name": "Hypermarket"},
  {"id": "FT003", "name": "Ice Cream"},
  {"id": "KS004", "name": "Icecream"},
  {"id": "FB003", "name": "Icecream shop"},
  {"id": "SHT0056", "name": "Indian"},
  {"id": "RS011", "name": "Indian"},
  {"id": "SHT0066", "name": "International"},
  {"id": "RS008", "name": "Italian"},
  {"id": "SHT0044", "name": "Izakaya"},
  {"id": "SHT0053", "name": "Japanese"},
  {"id": "SHT0012", "name": "Japanese Food Distributor"},
  {"id": "RS009", "name": "Korean"},
  {"id": "SHT0054", "name": "Korean"},
  {"id": "SHT0046", "name": "Kutsu"},
  {"id": "LD001", "name": "Laundromat"},
  {"id": "RS018", "name": "Lebanese"},
  {"id": "SHT0037", "name": "Massage"},
  {"id": "SHT0031", "name": "Meat"},
  {"id": "WS003", "name": "Meat Agent"},
  {"id": "SHT0017", "name": "Moo Ka Ta"},
  {"id": "PB002", "name": "Night Entertainment"},
  {"id": "SHT0043", "name": "Omakaza"},
  {"id": "SHT0072", "name": "Online"},
  {"id": "OL001", "name": "Online Franchise"},
  {"id": "SHT0073", "name": "Online Platform"},
  {"id": "RT009", "name": "Online Retailer"},
  {"id": "SHT0074", "name": "Online Shop (Corporate)"},
  {"id": "SHT0075", "name": "Online Shop (Individual)"},
  {"id": "SHT0047", "name": "Others"},
  {"id": "SHT0026", "name": "Others"},
  {"id": "SHT0034", "name": "Others"},
  {"id": "OT001", "name": "Outsourced Claim"},
  {"id": "SHT0036", "name": "Park"},
  {"id": "FT004", "name": "Pet Food"},
  {"id": "SHT0021", "name": "Pizza"},
  {"id": "SHT0016", "name": "Processed Food"},
  {"id": "RT007", "name": "Provision store"},
  {"id": "PB001", "name": "Pubs & Bars"},
  {"id": "SHT0003", "name": "Railway"},
  {"id": "SHT0045", "name": "Ramen"},
  {"id": "SHT0033", "name": "Ready Meal"},
  {"id": "SHT0015", "name": "Ready Meal"},
  {"id": "HT005", "name": "Resort & Garden"},
  {"id": "SHT0050", "name": "Seafood"},
  {"id": "SHT0067", "name": "Seafood"},
  {"id": "RS005", "name": "Seafood"},
  {"id": "SHT0032", "name": "Seafood"},
  {"id": "WS005", "name": "Seafood Wholesaler"},
  {"id": "SHT0005", "name": "Service Apartment / Condominium"},
  {"id": "SHT0081", "name": "Showroom"},
  {"id": "SHT0052", "name": "Snacks"},
  {"id": "LS005", "name": "Social Club"},
  {"id": "SO001", "name": "Social Media"},
  {"id": "LS004", "name": "Spa"},
  {"id": "SHT0049", "name": "Spanish"},
  {"id": "SHT0065", "name": "Spanish"},
  {"id": "SHT0071", "name": "Specialty Store"},
  {"id": "LS003", "name": "Sport Club"},
  {"id": "SHT0063", "name": "Steak House - Foreign"},
  {"id": "SHT0042", "name": "Sukiyaki / Hotpot / Shabu"},
  {"id": "RT003", "name": "Supermarket"},
  {"id": "SHT0040", "name": "Sushi"},
  {"id": "SHT0078", "name": "Take away only"},
  {"id": "SHT0024", "name": "Thai"},
  {"id": "SHT0048", "name": "Turkish"},
  {"id": "SHT0061", "name": "Turkish"},
  {"id": "IN004", "name": "University"},
  {"id": "RS010", "name": "Vietnamese"},
  {"id": "SHT0041", "name": "Yakiniku"},
  {"id": "SHT0018", "name": "Yakiniku (Premium)"},
  {"id": "SHT0019", "name": "Yakinuku"},
];
export const ShopTypeComponent = () => {
    const { customer, addValueToCustomer } = useCustomerForm();

  const [shopTypeList, setShopType] = useState(shopTypes);
  const [selectedShopType, setSelectedShopTypeList] = useState<ChipItem[]>([]);
  const handleShopTypeMenuItem = (shopType: ChipItem) => {
    console.log(shopType);
    setShopType((prevList) => {
        return prevList.filter((shop) => {
          return shopType.id !== shop.id;
        });
      });
      // @ts-ignore
    //   setSelectedShopTypeList((prevSelectedList) => {
    //     return [...prevSelectedList, shopType];
    //   });
      addValueToCustomer("shop_type", [...customer.shop_type, shopType]);
  };

  const handleChip = (item: ChipItem) => {
    const newChips = customer.shop_type.filter((chip) => {
        return chip.id !== item.id;
    });
    addValueToCustomer("shop_type", newChips);
  }

  return (
    <div className="flex flex-col space-y-2">
      <InputChipComponent
        list={shopTypeList}
        chips={customer.shop_type}
        originalList={shopTypes}
        labelUnique="id"
        handleList={setShopType}
        // @ts-ignore
        handleChip={handleChip}
        placeholder={"Select Shop Type"}
      >
        <Menu>
          {shopTypeList.map((user) => {
            return (
              <MenuItem
                key={user.id}
                onClick={() => handleShopTypeMenuItem(user)}
              >
                {user.name}
              </MenuItem>
            );
          })}
        </Menu>
      </InputChipComponent>
    </div>
  );
};
