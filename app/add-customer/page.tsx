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

const addCustomerFields = [
  {
    key: "salesPerson",
    label: "Sales Person",
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

const interests: ChipItem[] = [{id: 1, name: "Shoes"}, {id: 2, name: "Clothes"}, {id: 3, name: "Bags"}, {id: 4, name: "Accessories"}, 
{id: 5, name: "Others"}, {id: 6, name: "Toys"}, {id: 7, name: "Electronics"}, {id: 8, name: "Furniture"}, {id: 9, name: "Food"}];

const initialCustomerState: { [key: string]: string | string[] } = {};
addCustomerFields.forEach(({key}) => {
  if (key === "interested_in" || key === "shop_type") {
    initialCustomerState[key] = [];
  } else {
    initialCustomerState[key] = "";
  }
});
export default function AddCustomer() {

  const [interestList, setInterestList] = useState(interests);
  const [selectedInterestList, setSelectedInterestList] = useState<ChipItem[]>([]);

  const [openCamera, setOpenCamera] = useState(false);
  const [openRecorder, setOpenRecorder] = useState(false);
  const [customer, setCustomer] = useState(initialCustomerState);
  const [webcamImage, setWebcamImage] = useState<string | null | undefined>(
    null
  );
  const handleClick = () => {
    console.log("Floating button clicked");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.id", e, e.currentTarget.id, e.target.value);
    setCustomer({...customer,[e.target.id]:e.target.value});
  }

  const handleMenuItem = (selectedUser: ChipItem) => {
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

  const handleAttachmentClick = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      if (e.target.files) {
        await Promise.all(
          Array.from(e.target.files).map(async (file) => {
            const url = await uploadFile(file);
            return url;
          })
        );
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  if (webcamImage) {
    console.log("webcamImage", webcamImage);
  }
  return (
    <div className="min-w-full min-h-screen px-1 py-10">
      <h1 className="text-center text-2xl pb-5 uppercase">Add Customer</h1>
      <form action="" className="overflow-hidden p-6 space-y-10">
        {addCustomerFields.map(({key, label}) => {

          return (
            <div key={key} className="flex flex-col space-y-2">
              {key === "interested_in" || key === "shop_type" ? (
                <InputChipComponent
                list={interestList}
                chips={selectedInterestList}
                originalList={interests}
                labelUnique="id"
                handleList={setInterestList}
                // @ts-ignore
                handleChip={setSelectedInterestList}
                placeholder="Add new user..."
              >
                <Menu>
          {interests.map((user) => {
            return (
              <MenuItem key={user.id} onClick={() => handleMenuItem(user)}>
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
              ) : (
                <FormInput value={customer[key] as string} label={label} key={key} name={key} onChange={handleChange} />
              )}
            </div>
          );
        })}
        <ExpandableFloatingButton />
        <PrimaryButton
          onClick={handleClick}
          buttonText="Submit"
          variant="secondary"
          classNames="w-full"
        >
        </PrimaryButton>
      </form>
      <div>
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
      </div>
      <button onClick={() => setOpenCamera(true)}>Open Camera</button>
      <button onClick={() => setOpenRecorder(true)}>Open Recorder</button>
      {openCamera ? (
        <WebCamComponent
            onSave={(url) => setWebcamImage(url)}
            onClose={() => setOpenCamera(false)}
        />
      ) : null}

      {openRecorder ? (
        <AudioRecorderComponent
            onSave={(url) => setWebcamImage(url)}
            onClose={() => setOpenRecorder(false)}
        />
      ) : null}
      
    </div>
  );
}
