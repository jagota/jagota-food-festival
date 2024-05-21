import {
    FC,
    ReactNode,
    useEffect,
    useState,
    Dispatch,
    SetStateAction,
  } from "react";
  import { ChipItem } from "./chipItem.type";
  import { Chip } from "./chip";
import { useOnOutsideClick } from "@/hooks/useOutsideClick";
  
  interface InputChipComponent {
    list: ChipItem[];
    originalList: ChipItem[];
    chips: ChipItem[];
    labelUnique: string;
    children: ReactNode;
    handleList: Dispatch<SetStateAction<ChipItem[]>>;
    handleChip: Dispatch<SetStateAction<ChipItem[]>>;
    placeholder: string;
  }
  
  const InputChipComponent: FC<InputChipComponent> = ({
    chips,
    labelUnique,
    children,
    handleList,
    handleChip,
    originalList,
    placeholder,
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isToBeDeleted, setIsToBeDeleted] = useState({
      isReadyToDelete: false,
      data: null,
    });

    const ref = useOnOutsideClick(() => {
      setIsFocused(false);
    })
    const handleFocus = () => {
      setIsFocused(true);
    };
  
    const handleBlur = () => {
      setTimeout(() => {
        setIsToBeDeleted({
          isReadyToDelete: false,
          data: null,
        });
      }, 300);
    };
    const [searchText, setSearchText] = useState<string>("");
  
    const common = originalList
      .filter((originalChipItem) =>
        chips.some((ChipItem) => ChipItem.name === originalChipItem.name)
      )
      .map((filteredChipItem) => {
        // @ts-ignore
        return filteredChipItem[labelUnique];
      });
    //@ts-ignore
    const handleBackDelete = (e) => {
      const keyType = e.code;
      const isInputText = e.target.value === "";
      if (keyType == "Backspace" && isInputText && chips.length > 0) {
        if (isToBeDeleted.isReadyToDelete) {
          let item: ChipItem;
          handleChip((prevList) => {
            item = prevList[prevList.length - 1];
            return [...prevList.slice(0, prevList.length - 1)];
          });
  
          handleList((prev) => {
            return [...prev, item];
          });
          setIsToBeDeleted({
            isReadyToDelete: false,
            data: null,
          });
        } else {
          setIsToBeDeleted({
            isReadyToDelete: true,
            //@ts-ignore
            data: chips[chips.length - 1],
          });
        }
      }
    };
  
    useEffect(() => {
      const filteredList = originalList;
      const updatedList = filteredList.filter((item) => {
        return common.every((elem) => elem !== item.id);
      });
  
      // @ts-ignore
      handleList((prevList) => {
        return updatedList.filter((item: ChipItem) => {
          // @ts-ignore
          return item.name.toLowerCase().includes(searchText.toLowerCase());
        });
      });
    }, [searchText])
  
    useEffect(() => {
      setSearchText("");
    }, [chips.length]);
  
    return (
      <div ref={ref} className="relative">
        <div
          className={`border-2 min-w-[400px] transition-all rounded-md ${
            isFocused ? "border-[#3b82f6]" : "border-[#ddd]"
          }`}
        >
          <div className="flex gap-2 p-1 items-center flex-wrap">
            {chips.map((item) => {
              return (
                <Chip
                  key={item.id}
                  // @ts-ignore
                  handleChip={handleChip}
                  // @ts-ignore
                  handleList={handleList}
                  selectedId={item.id}
                  item={item}
                  isHighlight={isToBeDeleted}
                />
              );
            })}
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="text-base p-2 outline-none flex-1"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyUp={(e) => handleBackDelete(e)}
              placeholder={placeholder}
            />
          </div>
        </div>
        {isFocused && <div className="absolute w-full z-10">{children}</div>}
      </div>
    );
  };
  
  export default InputChipComponent;
  