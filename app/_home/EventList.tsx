"use client";

import { useEffect, useState } from "react";
import { IEvent } from "@/interfaces/Event.interface";
import { getEvent } from "@/apihandler/event.api";
import { EventListItem } from "./EventListItem";

export const EventList = () => {
  let [events, setEvents] = useState<IEvent[]>([]);
  useEffect(() => {
    async function fetchEvent() {
      const res = await getEvent();
      if (!res.error) {
        setEvents(res.data || []);
      }
    }
    fetchEvent();
  }, []);

  const onGoingEvents = () => {
    return (
        <div>
        <h2 className="text-lg font-semibold text-[#192434]">On Going</h2>
        <div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-[2rem] md:grid-cols-2 grid-cols-1">
          {events &&
            events.map((item, index) => {
              return <EventListItem key={index} event={item} />;
            })}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto">
      {onGoingEvents()}
    </div>
  );
};
