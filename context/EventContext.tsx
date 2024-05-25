'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { LocalStorage } from "@/utils/LocalStorage.utils";
import { IEvent } from "@/interfaces/Event.interface";

const apiCall = () => Promise.resolve({ data: "Hello World!" });
// Create a context to manage authentication-related data and functions
const EventContext = createContext<{
  selectedEvent: IEvent | null;
  selectEvent: (event: IEvent | null) => void;
}>({
    selectedEvent: null,
    selectEvent: (event: IEvent | null) => {},
});

const useEvent = () => useContext(EventContext);

const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const router = useRouter()


  const selectEvent = (event: IEvent | null) => {
    setSelectedEvent(event);
    LocalStorage.set("selectedEvent", event);
    router.replace("/event-details")
  };

  useEffect(() => {
    const _event = LocalStorage.get("selectedEvent");
    if (_event) {
      setSelectedEvent(_event);
    }
  }, []);

  // Provide authentication-related data and functions through the context
  return (
    <EventContext.Provider value={{ selectedEvent, selectEvent }}>
      {children}
    </EventContext.Provider>
  );
};

// Export the context, provider component, and custom hook
export { EventContext, EventProvider, useEvent };
