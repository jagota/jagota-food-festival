"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Home, MapPin } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboxProps {
    value: string
    setValue: (value: string) => void
    list: { id: string; name: string }[],
    placeholder: string,
    name?: string
}

export function Combobox({ value = "", setValue, list = [], placeholder, name }: ComboxProps) {
  const [open, setOpen] = React.useState(false)
//   const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between relative border border-[#1A3860]/10 rounded-[4px] h-[52px] py-2.5 px-3 w-full text-lg text-[#1C304A] text-opacity-50"
        >
          {value
            ? list.find((item) => item.name === value)?.name
            : (placeholder ? placeholder : "Select ...")}
          {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
          {name === "province" 
          ? <MapPin 
          stroke={value ? "#006CFA" : "#1A3860"} 
          className="ml-2 h-5 w-5 shrink-0 opacity-50"/> 
          : <Home 
          stroke={value ? "#006CFA" : "#1A3860"} 
          className="ml-2 h-5 w-5 shrink-0 opacity-50"/>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-white">
        <Command>
          <CommandInput placeholder="Search ..." />
          <CommandEmpty>Not found.</CommandEmpty>
          <CommandGroup>
           <CommandList>
           {list.map((item) => (
              <CommandItem
                className="p-1 text-base text-[#1C304A] text-opacity-50"
                key={item.id}
                value={item.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.name}
              </CommandItem>
            ))}
           </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
