"use client";
import InputChipComponent from "@/components/chip-component/InputChipComponent";
import { ChipItem } from "@/components/chip-component/chipItem.type";
import Menu from "@/components/chip-component/menu";
import MenuItem from "@/components/chip-component/menuItem";
import { useEffect, useState } from "react";
import { useCustomerForm } from "./context/CustomerContext";

const shopTypes: ChipItem[] = [
  {'id': 'EN001', 'name': 'Amusement Park'},
{'id': 'DT001', 'name': 'Bakery Distributor'},
{'id': 'FB001', 'name': 'Bakery shop'},
{'id': 'SHT0028', 'name': 'Beverage'},
{'id': 'FC002', 'name': 'Canteen'},
{'id': 'IN008', 'name': 'Catering - Management'},
{'id': 'SHT0055', 'name': 'Chinese'},
{'id': 'FB005', 'name': 'Coffee Chain'},
{'id': 'FB002', 'name': 'Coffee shop'},
{'id': 'SHT0077', 'name': 'Dine-in & Take away'},
{'id': 'WS001', 'name': 'Dry Food Wholesaler'},
{'id': 'EX001', 'name': 'Exhibition Center'},
{'id': 'FR003', 'name': 'Export & Import'},
{'id': 'LS002', 'name': 'Fitness Club'},
{'id': 'SHT0080', 'name': 'Food Court'},
{'id': 'SHT0059', 'name': 'French'},
{'id': 'SHT0030', 'name': 'Fresh Food'},
{'id': 'WS002', 'name': 'Fresh Food Wholesaler'},
{'id': 'RT008', 'name': 'Fresh market'},
{'id': 'SHT0013', 'name': 'Frozen Food Distributor'},
{'id': 'SHT0062', 'name': 'German'},
{'id': 'SHT0007', 'name': 'Guest House'},
{'id': 'HM001', 'name': 'Home Users'},
{'id': 'IN002', 'name': 'Hospital'},
{'id': 'SHT0006', 'name': 'Hostel'},
{'id': 'SHT0009', 'name': 'Hotel - 3 star'},
{'id': 'SHT0010', 'name': 'Hotel - 4 star'},
{'id': 'HT001', 'name': 'Hotel - 5 star'},
{'id': 'RT002', 'name': 'Hypermarket'},
{'id': 'FB003', 'name': 'Icecream shop'},
{'id': 'SHT0056', 'name': 'Indian'},
{'id': 'RS011', 'name': 'Indian'},
{'id': 'SHT0066', 'name': 'International'},
{'id': 'RS008', 'name': 'Italian'},
{'id': 'SHT0044', 'name': 'Izakaya'},
{'id': 'SHT0053', 'name': 'Japanese'},
{'id': 'SHT0012', 'name': 'Japanese Food Distributor'},
{'id': 'SHT0054', 'name': 'Korean'},
{'id': 'LD001', 'name': 'Laundromat'},
{'id': 'RS018', 'name': 'Lebanese'},
{'id': 'WS003', 'name': 'Meat Agent'},
{'id': 'SHT0017', 'name': 'Moo Ka Ta'},
{'id': 'PB002', 'name': 'Night Entertainment'},
{'id': 'SHT0043', 'name': 'Omakaza'},
{'id': 'SHT0072', 'name': 'Online'},
{'id': 'SHT0034', 'name': 'Others'},
{'id': 'SHT0021', 'name': 'Pizza'},
{'id': 'SHT0016', 'name': 'Processed Food'},
{'id': 'RT007', 'name': 'Provision store'},
{'id': 'PB001', 'name': 'Pubs & Bars'},
{'id': 'HT005', 'name': 'Resort & Garden'},
{'id': 'SHT0050', 'name': 'Seafood'},
{'id': 'WS005', 'name': 'Seafood Wholesaler'},
{'id': 'SHT0005', 'name': 'Service Apartment / Condominium'},
{'id': 'SHT0065', 'name': 'Spanish'},
{'id': 'LS003', 'name': 'Sport Club'},
{'id': 'SHT0063', 'name': 'Steak House - Foreign'},
{'id': 'SHT0042', 'name': 'Sukiyaki / Hotpot / Shabu'},
{'id': 'RT003', 'name': 'Supermarket'},
{'id': 'SHT0040', 'name': 'Sushi'},
{'id': 'SHT0024', 'name': 'Thai'},
{'id': 'SHT0061', 'name': 'Turkish'},
{'id': 'IN004', 'name': 'University'},
{'id': 'RS010', 'name': 'Vietnamese'},
{'id': 'SHT0041', 'name': 'Yakiniku'},
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
        placeholder={"Select Shop Type*"}
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
