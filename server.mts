import { createServer } from "node:http";
import { Server } from "socket.io";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000");

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer);

  const userSockets: Map<string, string> = new Map();

  io.on("authenticate", (userId: string) => {
    console.log(`User ${userId} authenticated`);
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.on("authenticate", (userId: string) => {
      userSockets.set(userId, socket.id);
      console.log(`User ${userId} authenticated with socket ${socket.id}`);
    });
  });

  (global as any).io = io;

  httpServer.listen(port, () => {
    console.log(`Socket.io server is running on http://${hostname}:${port}`);
  });
});
