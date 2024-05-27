import { HiOutlineMagnifyingGlass } from "react-icons/hi2"

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}
export const SearchBar = ({ onChange, value }: SearchInputProps) => {
    return (
        <div className="w-full bg-[#193B67]/5 rounded-[4px] py-3 px-4 flex relative my-3">
            <HiOutlineMagnifyingGlass className="w-6 h-6 mr-2" />
            <input type="text" placeholder="Search" value={value} onChange={onChange} className="bg-transparent border-none focus:outline-none placeholder:text-black" />
        </div>
    )
}