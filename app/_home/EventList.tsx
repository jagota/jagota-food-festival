"use client"

import { useEffect, useState } from "react";
import { IEvent } from "@/interfaces/Event.interface";
import { getEvent } from "@/apihandler/event.api";
import { EventListItem } from "./EventListItem";

export const EventList = () => {
    let [events, setEvents] = useState<IEvent[]>([]);
    useEffect(() => {
        async function fetchEvent() { 
            const res = await getEvent();
            console.log("events", res);
            if (!res.error) {
                setEvents(res.data || []);
            }
        }
        fetchEvent();
    }, []);
    
    return (
        <div className='container mx-auto'>
            <div className='grid lg:grid-cols-4 xl:grid-cols-4 gap-[2rem] md:grid-cols-2 grid-cols-2'>
            {events && events.map((item, index) => {
                return <EventListItem key={index} event={item}/>
            })}
        </div>
        </div>
    )
}