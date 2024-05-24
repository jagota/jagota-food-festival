import { Card, CardContent } from "@/components/ui/card"
import { useEvent } from "@/context/EventContext";
import { IEvent } from "@/interfaces/Event.interface";
import cntl from 'cntl';

const classes = {
    card: (isSelected: boolean) => cntl`
        cursor-pointer
        border-2
        border-gray-200
        hover:border-blue-400
        bg-gray-200
        rounded-md
        w-[95%] h-24 m-auto
        rounded-[10px]
        flex flex-col justify-center items-center
        ${isSelected ? 'bg-blue-500' : ''}
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
    const isSelected = selectedEvent === event.code;
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        selectEvent(isSelected ? null : event.code);
    }
    return (
        <Card className={classes.card(isSelected)} onClick={handleClick}>
            <p className={isSelected ? "text-white text-2xl" : "text-black text-2xl"}>{event.name}</p>
        </Card>
    )
}