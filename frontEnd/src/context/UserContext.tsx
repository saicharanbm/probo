import { createContext, useEffect, useState } from "react";

// Create the context
export const UserContext = createContext({
  userId: "",
  setUserId: (userId: string) => {},
  socket: null as WebSocket | null,
});

// Create a provider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState(""); // This is your shared state
  const [socket, setSocket] = useState<WebSocket | null>(null);
  useEffect(() => {
    if (userId) {
      // Only connect if the user is logged in
      const ws = new WebSocket("ws://localhost:8080");

      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      setSocket(ws);

      // Clean up WebSocket on unmount
      return () => {
        ws.close();
      };
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId, socket }}>
      {children}
    </UserContext.Provider>
  );
};
