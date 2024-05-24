import { HiOutlineMagnifyingGlass } from "react-icons/hi2"

export const SearchBar = () => {
    return (
        <div className="w-full bg-[#193B67]/5 rounded-[4px] py-3 px-4 flex relative my-3">
            <HiOutlineMagnifyingGlass className="w-6 h-6 mr-2" />
            <input type="text" placeholder="Search" className="bg-transparent border-none focus:outline-none placeholder:text-black" />
        </div>
    )
}