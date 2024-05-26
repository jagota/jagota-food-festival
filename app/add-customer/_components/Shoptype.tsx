"use client";
import InputChipComponent from "@/components/chip-component/InputChipComponent";
import { ChipItem } from "@/components/chip-component/chipItem.type";
import Menu from "@/components/chip-component/menu";
import MenuItem from "@/components/chip-component/menuItem";
import { useEffect, useState } from "react";
import { useCustomerForm } from "./context/CustomerContext";

const shopTypes: ChipItem[] = [
  { id: 1, name: "Coffee shop" },
  { id: 2, name: "Dry Food" },
  { id: 3, name: "Food Court" },
  { id: 4, name: "French" },
  { id: 5, name: "Frozen Food Distributor" },
  { id: 6, name: "German" },
  { id: 7, name: "Hotel - 3 star" },
  { id: 8, name: "Hotel - 4 star" },
  { id: 9, name: "Hotel - 5 star" },
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
