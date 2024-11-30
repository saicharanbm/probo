import express from "express";
import { WebSocket, WebSocketServer } from "ws";
import { createClient } from "redis";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
const app = express();

// create a subscriber client
const subscriberClient = createClient();
const getLastMessageClient = createClient();

getLastMessageClient.on("error", (err) => {
  console.log(`There was an error creating Redis subscriber client. ${err}`);
});
subscriberClient.on("error", (err) => {
  console.log(`There was an error creating Redis subscriber client. ${err}`);
});

// connect the client to Redis
async function connectToRedis() {
  try {
    await getLastMessageClient.connect();
    await subscriberClient.connect();
  } catch (error) {
    console.log(`Error connecting client to Redis: ${error}`);
  }
}
connectToRedis();

// Users object which holds the connection details
const users: {
  [key: string]: {
    ws: WebSocket;
    rooms: string[];
  };
} = {};

// Create an HTTP server listening on port 8080
app.use(cors());
const server = app.listen(8080, () => {
  console.log("Server is listening on port 8080.");
});

// Create WebSocket server
const wss = new WebSocketServer({ server });

//We create a connection from our ws server to the client hitting the http server
//After the connection is made client request to the room they want to subscribe to
//when there is a first connection to a perticular room our ws subscribes to that room
// with the help of the subscriber client that we have created and our api backend updtes the room
//according to the changes made in orderbook.
// when there is a particular room published with the new data by our api backend
// Our redis will broadcast it to our ws server if there is any connection made
//our es server will loop through all the clients subscribed to the room and
// broadcast the data to them.

// Handle WebSocket connection
wss.on("connection", (userSocket) => {
  // Create a record for this connection
  const id = uuidv4();
  users[id] = {
    ws: userSocket,
    rooms: [],
  };
  console.log(`Connection ${id} established.`);

  // Handle incoming messages
  userSocket.on("message", async (data) => {
    const parsedData = JSON.parse(data as unknown as string);
    const { roomId } = parsedData;

    if (parsedData.type === "subscribe") {
      // Subscribe to the room if not already subscribed
      if (!users[id].rooms.includes(roomId)) {
        users[id].rooms.push(roomId);
      }

      // Check if this is the first subscription request to this room
      if (isThisFirstUserToSubscribe(roomId)) {
        console.log(`Subscribing to room ${roomId} on pub/sub`);
        subscriberClient.subscribe(roomId, (message) => {
          Object.keys(users).forEach((userId) => {
            const { ws, rooms } = users[userId];
            if (rooms.includes(roomId)) {
              ws.send(message);
            }
          });
        });
      }
      // Get the last data published to Pub/Sub
      try {
        const lastMessage = await getLastMessageClient.get(
          `lastMessage:${roomId}`
        );
        if (lastMessage) {
          userSocket.send(lastMessage);
        }
      } catch (error) {
        console.log(`Error fetching last message for room ${roomId}: ${error}`);
      }
    }
    // Unsubscribe from the room
    else if (parsedData.type === "unsubscribe") {
      users[id].rooms = users[id].rooms.filter((room) => room !== roomId);
      if (isThisTheLastUserToUnSubscribe(roomId)) {
        console.log(`Unsubscribing from room ${roomId} on pub/sub`);
        subscriberClient.unsubscribe(roomId);
      }
    }
  });

  // Clean up on socket close
  userSocket.on("close", () => {
    users[id].rooms.forEach((roomId) => {
      if (isThisTheLastUserToUnSubscribe(roomId)) {
        subscriberClient.unsubscribe(roomId);
      }
    });
    delete users[id];
    console.log(`Connection ${id} closed.`);
  });
});

// Function to check if this is the first user subscribing to the room
function isThisFirstUserToSubscribe(roomId: string): boolean {
  let totalInterestedPeople = 0;
  Object.keys(users).forEach((userId) => {
    if (users[userId].rooms.includes(roomId)) {
      totalInterestedPeople++;
    }
  });
  return totalInterestedPeople === 1;
}

// Function to check if this is the last user unsubscribing from the room
function isThisTheLastUserToUnSubscribe(roomId: string): boolean {
  let totalInterestedPeople = 0;
  Object.keys(users).forEach((userId) => {
    if (users[userId].rooms.includes(roomId)) {
      totalInterestedPeople++;
    }
  });
  return totalInterestedPeople === 0;
}
