import express from "express";
import http from "http";
import { Server } from "socket.io";

const expressServer = express();
const httpServer = http.createServer(expressServer);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});


