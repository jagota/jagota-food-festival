import { Card, CardContent } from "@/components/ui/card"
import { useEvent } from "@/context/EventContext";
import { IEvent } from "@/interfaces/Event.interface";
import cntl from 'cntl';
import Image from "next/image";

const bgColors: { [key: string]: string } = {
    '1':'bg-[#ED1D26]',
    '2': 'bg-blue-500'
}

const classes = {
    card: (isSelected: boolean, bgColor?: string) => cntl`
        cursor-pointer
        w-full h-48 m-auto
        rounded-[10px] relative
        flex flex-row justify-center items-center
        ${isSelected ? 'bg-[#ED1D26]' : ''}
        ${bgColor ? bgColor : ''}
    `,
    selected: cntl`
        border-blue-500
    `

}
interface Props {
    event: IEvent;
  }
export const EventListItem = ({ event}: Props) => {
    const {selectEvent, selectedEvent} = useEvent();
    const isSelected = selectedEvent?.code === event.code;
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        selectEvent(event);
    }
    return (
        <Card className={classes.card(isSelected, bgColors[event.code] )} onClick={handleClick}>
            <div className="flex-1 flex justify-center items-center">
                   {event.thumbnail ? <Image src={event.thumbnail} width={140} height={140} alt={event.name} /> : null}
            </div>
            <div className="flex-1">
                <p className="absolute right-5 bottom-10 text-white">{event.name}</p>
            </div>
            {/* <p className={isSelected ? "text-white text-2xl" : "text-black text-2xl"}>{event.name}</p> */}
        </Card>
    )
}