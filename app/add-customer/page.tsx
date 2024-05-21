"use client";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { WebCamComponent } from "@/components/webcam";
import { useState } from "react";
import { uploadFile } from "@/lib/getSignedUrl";
import { AudioRecorderComponent } from "@/components/audioRecorder";
import { FormInput } from "@/components/formInput";
import InputChipComponent from "@/components/chip-component/InputChipComponent";
import { ChipItem } from "@/components/chip-component/chipItem.type";
import Menu from "@/components/chip-component/menu";
import MenuItem from "@/components/chip-component/menuItem";
import { PrimaryButton } from "@/components/ui/primary-button";
import { ExpandableFloatingButton } from "@/components/ui/expandable-floating-button";
import { FloatingButton } from "@/components/ui/floating-button";
import { addCustomer } from "@/apihandler/customer.api";
import { ICustomerToDB } from "@/interfaces/Customer.interface";

const addCustomerFields = [
  {
    key: "salesPerson",
    label: "Sales Person",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "mobile",
    label: "Mobile",
  },
  {
    key: "line",
    label: "Line",
  },
  {
    key: "province",
    label: "Province",
  },
  {
    key: "district",
    label: "District",
  },
  {
    key: "interested_in",
    label: "Interested In",
  },
  {
    key: "shop_type",
    label: "Shop Type",
  },
];

const interests: ChipItem[] = [
  { id: 1, name: "Shoes" },
  { id: 2, name: "Clothes" },
  { id: 3, name: "Bags" },
  { id: 4, name: "Accessories" },
  { id: 5, name: "Others" },
  { id: 6, name: "Toys" },
  { id: 7, name: "Electronics" },
  { id: 8, name: "Furniture" },
  { id: 9, name: "Food" },
];

const shopTypes: ChipItem[] = [
  { id: 1, name: "Shoes" },
  { id: 2, name: "Clothes" },
  { id: 3, name: "Bags" },
  { id: 4, name: "Accessories" },
  { id: 5, name: "Others" },
  { id: 6, name: "Toys" },
  { id: 7, name: "Electronics" },
  { id: 8, name: "Furniture" },
  { id: 9, name: "Food" },
];

const initialCustomerState: ICustomerToDB = {
  salesPerson: "",
  interested_in: [],
  shop_type: [],
  name: "",
  mobile: "",
  email: "",
  line: "",
  province: "",
  district: "",
  image: "",
  audio: "",
};

export default function AddCustomer() {
  // interest
  const [interestList, setInterestList] = useState(interests);
  const [selectedInterestList, setSelectedInterestList] = useState<ChipItem[]>(
    []
  );

  // shop type
  const [shopTypeList, setShopType] = useState(shopTypes);
  const [selectedShopType, setSelectedShopTypeList] = useState<ChipItem[]>(
    []
  );

  const [openCamera, setOpenCamera] = useState(false);
  const [openRecorder, setOpenRecorder] = useState(false);
  const [customer, setCustomer] = useState(initialCustomerState);
  const [webcamImage, setWebcamImage] = useState<string | null | undefined>(
    null
  );
  const [audio, setAudio] = useState<string | null | undefined>(
    null
  );
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { salesPerson, name, mobile, email, line, province, district} = customer;
    const customerData: ICustomerToDB = {
    interested_in: selectedInterestList.map((item) => item.name),
    shop_type: selectedShopType.map((item) => item.name),
    salesPerson, name, mobile, email, line, province, district,
    image: webcamImage ? webcamImage : "",
    audio: audio ? audio : "",
    };
    await addCustomer(customerData)
    console.log("Floating button clicked", customerData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.id", e, e.currentTarget.id, e.target.value);
    setCustomer({ ...customer, [e.target.id]: e.target.value });
  };

  const handleInterestMenuItem = (selectedUser: ChipItem) => {
    setSelectedInterestList((prevUserList) => {
      return prevUserList.filter((user) => {
        return selectedUser.id !== user.id;
      });
    });
    // @ts-ignore
    setSelectedInterestList((prevSelectedUserList) => {
      return [...prevSelectedUserList, selectedUser];
    });
  };

  const handleShopTypeMenuItem = (selectedUser: ChipItem) => {
    setSelectedShopTypeList((prevUserList) => {
      return prevUserList.filter((user) => {
        return selectedUser.id !== user.id;
      });
    });
    // @ts-ignore
    setSelectedShopTypeList((prevSelectedUserList) => {
      return [...prevSelectedUserList, selectedUser];
    });
  };

  return (
    <div className="min-w-full min-h-screen px-1 py-10">
      <h1 className="text-center text-2xl pb-5 uppercase">Add Customer</h1>
      <form action="" className="overflow-hidden p-6 space-y-10">
        {addCustomerFields.map(({ key, label }) => {
          if (key === "interested_in") {
            return (
              <div key={key} className="flex flex-col space-y-2">
              <InputChipComponent
                  list={interestList}
                  chips={selectedInterestList}
                  originalList={interests}
                  labelUnique="id"
                  handleList={setInterestList}
                  // @ts-ignore
                  handleChip={setSelectedInterestList}
                  placeholder={label}
                >
                  <Menu>
                    {interests.map((user) => {
                      return (
                        <MenuItem
                          key={user.id}
                          onClick={() => handleInterestMenuItem(user)}
                        >
                          <div className="flex gap-3">
                            <div className="flex items-center justify-between gap-2 flex-1">
                              <h3 className="text-sm">{user.name}</h3>
                            </div>
                          </div>
                        </MenuItem>
                      );
                    })}
                    {interests.length === 0 && (
                      <div className="p-4">Not Available</div>
                    )}
                  </Menu>
                </InputChipComponent>
            </div>
            )
          } if (key === "shop_type") {
            return (
              <div key={key} className="flex flex-col space-y-2">
              <InputChipComponent
                  list={shopTypeList}
                  chips={selectedShopType}
                  originalList={shopTypes}
                  labelUnique="id"
                  handleList={setShopType}
                  // @ts-ignore
                  handleChip={setSelectedInterestList}
                  placeholder={label}
                >
                  <Menu>
                    {interests.map((user) => {
                      return (
                        <MenuItem
                          key={user.id}
                          onClick={() => handleShopTypeMenuItem(user)}
                        >
                          <div className="flex gap-3">
                            <div className="flex items-center justify-between gap-2 flex-1">
                              <h3 className="text-sm">{user.name}</h3>
                            </div>
                          </div>
                        </MenuItem>
                      );
                    })}
                    {interests.length === 0 && (
                      <div className="p-4">Not Available</div>
                    )}
                  </Menu>
                </InputChipComponent>
            </div>
            )
          } else {
            return (
              <div key={key} className="flex flex-col space-y-2">
                <FormInput
                    value={customer[key] as string}
                    label={label}
                    key={key}
                    name={key}
                    onChange={handleChange}
                  />
              </div>
            );
          }
         
        })}
        <ExpandableFloatingButton>
          <FloatingButton
            contentType="audio"
            color="bg-blue-500 hover:bg-blue-700"
            onClick={() => setOpenRecorder(true)}
            classNames="absolute left-[20px]"
          />
          <FloatingButton
            contentType="photo"
            color="bg-blue-500 hover:bg-blue-700"
            onClick={() => setOpenCamera(true)}
            classNames="absolute left-[100px]"
          />
        </ExpandableFloatingButton>
        <PrimaryButton
          onClick={(e) => handleClick(e)}
          buttonText="Submit"
          variant="secondary"
          classNames="w-full"
        ></PrimaryButton>
      </form>
      {openCamera ? (
        <WebCamComponent
          onSave={(url) => setWebcamImage(url)}
          onClose={() => setOpenCamera(false)}
        />
      ) : null}

      {openRecorder ? (
        <AudioRecorderComponent
          onSave={(url) => setAudio(url)}
          onClose={() => setOpenRecorder(false)}
        />
      ) : null}
    </div>
  );
}

// For attachment
{
  /* <div>
        <input
          hidden
          id="attachments"
          type="file"
          value=""
          multiple
          max={5}
          onChange={handleAttachmentClick}
        />
        <label
          htmlFor="attachments"
          className="p-2 sm:p-4 rounded-full bg-bgInput hover:bg-bgPrimary"
        >
          <PaperClipIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </label>
      </div> */
}

// const handleAttachmentClick = async (
//   e: React.ChangeEvent<HTMLInputElement>
// ) => {
//   try {
//     if (e.target.files) {
//       await Promise.all(
//         Array.from(e.target.files).map(async (file) => {
//           const url = await uploadFile(file);
//           return url;
//         })
//       );
//     }
//   } catch (e) {
//     console.log("error", e);
//   }
// };
