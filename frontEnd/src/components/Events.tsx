import { useCallback, useEffect, useState } from "react";
import StockEvent from "./StockEvent";

function Events() {
  const [events, setEvents] = useState<{
    [key: string]: {
      owner: string;
      description: string;
      createdAt: string;
      endTime: string;
      isActive: boolean;
    };
  } | null>(null);
  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/events");
      const data = await response.json();
      console.log(data);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }, []);

  useEffect(() => {
    fetchEvents(); // Call the function to fetch events
  }, [fetchEvents]); // Empty dependency array to run once on mount

  return (
    <div className="w-full flex-grow bg-[#F5F5F5] px-6   pt-[60px]">
      {events ? (
        <div>
          {Object.keys(events).map((key) => (
            <StockEvent
              key={key}
              stockSymbol={key}
              owner={events[key].owner}
              description={events[key].description}
              createdAt={events[key].createdAt}
              endTime={events[key].endTime}
              isActive={events[key].isActive}
            />
          ))}
          <button
            className="fixed bottom-1 left-1/2 transform -translate-x-1/2 bg-[#0c2838] text-white text-2xl px-4 py-2 rounded-lg align-middle"
            onClick={() => fetchEvents()}
          >
            Refresh Events
          </button>
        </div>
      ) : (
        <p>Loading events...</p> // Show loading text while fetching
      )}
    </div>
  );
}

export default Events;
