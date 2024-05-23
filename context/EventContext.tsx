'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import { LocalStorage } from "@/utils/LocalStorage.utils";

const apiCall = () => Promise.resolve({ data: "Hello World!" });
// Create a context to manage authentication-related data and functions
const EventContext = createContext<{
  selectedEvent: string | null;
  selectEvent: (event: null | string) => void;
}>({
    selectedEvent: null,
    selectEvent: (event: null | string) => {},
});

const useEvent = () => useContext(EventContext);

const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const selectEvent = (event: null | string) => {
    setSelectedEvent(event);
    LocalStorage.set("selectedEvent", event);
  };

  useEffect(() => {
    const _event = LocalStorage.get("selectedEvent");
    console.log("user", _event)
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
