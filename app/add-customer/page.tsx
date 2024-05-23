"use client";
import { WebCamComponent } from "@/components/webcam";
import { useState } from "react";
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
import { useAuth } from "@/context/AuthContext";
import { ImageViewer } from "@/components/ImageViewer";
import { AudioPlayerComponent } from "@/components/audioPlayer";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const addCustomerFields = [
  {
    key: "name",
    label: "Contact Person",
    type: "text",
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
    key: "email",
    label: "Email",
    type: "email",
  },
  {
    key: "mobile",
    label: "Mobile",
    type: "tel",
  },
  {
    key: "line",
    label: "Line",
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
  salesPerson: ""
};

export default function AddCustomer() {
  const { user } = useAuth();
  const router = useRouter()
  // interest
  const [interestList, setInterestList] = useState(interests);
  const [selectedInterestList, setSelectedInterestList] = useState<ChipItem[]>(
    []
  );

  // shop type
  const [shopTypeList, setShopType] = useState(shopTypes);
  const [selectedShopType, setSelectedShopTypeList] = useState<ChipItem[]>([]);

  const [openCamera, setOpenCamera] = useState(false);
  const [openRecorder, setOpenRecorder] = useState(false);
  const [customer, setCustomer] = useState<Record<string, string>>({});
  const [webcamImage, setWebcamImage] = useState<string | null | undefined>(
    null
  );
  const [audio, setAudio] = useState<string | null | undefined>(null);
  const handleClick = async () => {
    const { name, mobile, email, line, province, district } =
      customer;
    const customerData: ICustomerToDB = {
      interested_in: selectedInterestList.map((item) => item.name),
      shop_type: selectedShopType.map((item) => item.name),
      salesPerson: user?.staffCode as string,
      name,
      mobile,
      email,
      line,
      province,
      district,
      image: webcamImage ? webcamImage : "",
      audio: audio ? audio : "",
      source: "thaifex"
    };
    const addCustomerRes = await addCustomer(customerData);
    if (addCustomerRes.error === false) {
      Swal.fire({
        title: "Customer Added Successfully!",
        confirmButtonText: "OK",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          router.push('/customers');
        }
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleAudioRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAudio(null);
  }

  const handleImageRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setWebcamImage(null);
  }

  return (
    <div className="min-w-full min-h-screen px-1 py-20">
      <h1 className="text-center text-2xl pb-5 uppercase">Add Customer</h1>
      <form action="" className="overflow-hidden p-6 space-y-10">
        {addCustomerFields.map(({ key, label, type }) => {
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
            );
          }
          if (key === "shop_type") {
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
            );
          } else {
            return (
              <div key={key} className="flex flex-col space-y-2">
                <FormInput
                  value={customer[key]}
                  label={label}
                  key={key}
                  name={key}
                  onChange={handleChange}
                  type={type}
                />
              </div>
            );
          }
        })}
        {webcamImage ? <div className="space-y-2">
          <h4 className="text-left text-lg text-gray-400 font-lg">Image</h4>
          <div className="flex flex-row justify-between items-center">
          <ImageViewer imageUrl={webcamImage} /> 

          <button 
            className="bg-transparent text-red-500 border-0 outline-0"
            onClick={handleImageRemove}
            >remove</button>

          </div>
        </div> : null}
        {audio ? <div className="space-y-2">
          <h4 className="text-left text-lg text-gray-400 font-lg">Audio</h4>
          <div className="flex flex-row justify-between items-center">
            <AudioPlayerComponent url={audio} size="w-16 h-16" iconSize="w-6 h-6" buttonColor="border-gray-500" color="gray" />
            <button 
            className="bg-transparent text-red-500 border-0 outline-0"
            onClick={handleAudioRemove}
            >remove</button> 
          </div>
        </div> : null}
        <ExpandableFloatingButton>
          <FloatingButton
            contentType="audio"
            color="bg-blue-500 hover:bg-blue-700"
            onClick={() => setOpenRecorder(true)}
            position="absolute left-[20px] w-20"
            text="Record Audio"
          />
          <FloatingButton
            contentType="photo"
            color="bg-blue-500 hover:bg-blue-700"
            onClick={() => setOpenCamera(true)}
            position="absolute left-[120px] w-20"
            text="Take Photo"
          />
        </ExpandableFloatingButton>
        <PrimaryButton
          onClick={handleClick}
          buttonText="Submit"
          variant="secondary"
          classNames="w-full mt-2"
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
