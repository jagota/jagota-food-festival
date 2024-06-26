"use client";

import { useEffect, useState } from "react";
import { IEvent } from "@/interfaces/Event.interface";
import { getEvent } from "@/apihandler/event.api";
import { EventListItem } from "./EventListItem";
import { useEvent } from "@/context/EventContext";

interface EventListProps {
  searchTerm?: string
}
export const EventList = ({ searchTerm }: EventListProps) => {
  let [events, setEvents] = useState<IEvent[]>([]);
  let [showEvents, setShowEvents] = useState<IEvent[]>([]);
  const { selectedEvent} = useEvent();

  useEffect(() => {
    async function fetchEvent() {
      const res = await getEvent();
      if (!res.error) {
        setEvents(res.data || []);
        setShowEvents(res.data || []);
      }
    }
    fetchEvent();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredEvents = events.filter((event) =>  event.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setShowEvents(filteredEvents);
    } else {
      setShowEvents(events);
    }
  }, [searchTerm, events])

  const onGoingEvents = () => {
    return (
        <div>
        <h2 className="text-lg font-semibold text-[#192434]">On Going</h2>
        <div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-[2rem] md:grid-cols-2 grid-cols-1">
          {events &&
            showEvents.map((item, index) => {
              return <EventListItem key={index} event={item} />;
            })}
        </div>
      </div>
    )
  }

  const renderSelectedEvent = () => {
    const selected: IEvent | undefined = events.find((event) => event.code === selectedEvent?.code);
    if (!selected) return null;
    return (
      <div className="mb-8">
      <h2 className="text-lg font-semibold text-[#192434]">Selected</h2>
      <div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-[2rem] md:grid-cols-2 grid-cols-1">
        {selected ? <EventListItem event={selected} /> : null}
      </div>
    </div>
  )
  }

  return (
    <div className="mx-auto">
      {/* {renderSelectedEvent()} */}
      {onGoingEvents()}
    </div>
  );
};
