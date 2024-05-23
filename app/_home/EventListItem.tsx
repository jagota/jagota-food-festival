import { Card, CardContent } from "@/components/ui/card"
import { useEvent } from "@/context/EventContext";
import { IEvent } from "@/interfaces/Event.interface";

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
        <Card className={isSelected ? "border-blue-500" : ""} onClick={handleClick}>
            <CardContent>
                <p>{event.name}</p>
            </CardContent>
        </Card>
    )
}