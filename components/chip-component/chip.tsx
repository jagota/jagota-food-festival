import { FC } from "react";
import { ChipItem } from "./chipItem.type";

interface Chip {
  image?: string;
  label?: string;
  handleChip: (item: ChipItem) => void;
  handleList: () => void;
  selectedId: string | number;
  item: ChipItem;
}

const Chip: FC<Chip> = ({
  image,
  label,
  handleChip,
  handleList,
  selectedId,
  item,
  // @ts-ignore
  isHighlight,
}) => {

  return (
    <div
      className={`rounded-full bg-[#ddd] px-3 py-1 flex gap-1 flex-row items-center transition-all hover:text-white hover:bg-blue-500 ${
        isHighlight.data?.id === selectedId &&
        isHighlight.isReadyToDelete &&
        "bg-[#a8a29e] text-[#fff]"
      }`}
    >
      <span className="text-xs pr-1">{item.name}</span>
      <button
        className="text-xs rounded-full hover:bg-[#aaa] flex justify-center items-center transition-all"
        title="Remove"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          // @ts-ignore
          handleList((prev) => {
            return [...prev, item];
          });
          // @ts-ignore
          handleChip(item);
        }}
      >
        <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={"currentColor"}
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
      </button>
    </div>
  );
};

export {Chip};
