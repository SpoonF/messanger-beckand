const config = require("../config.json");
import express from "express";
import WebSocket, { WebSocketServer } from "ws";
import { routers } from "./routers/routers";
import cors from "cors";

const app = express();

// const CORS_OPTIONS = {
//     origin: '*'
// }


export function run() {
    app.use(express.urlencoded());
    app.use(cors())

    routers.build(app);
    
    app.listen( config.port, () => {
        console.log(`Example app listeneing on port ${ config.port }`);
        console.log(`Location: http://localhost:${ config.port }`);
    });
}

export function runWebSockets() {
    const wss = new WebSocketServer({ port: config.wsPort });

    wss.on('connection', ( wsClient: WebSocket ) =>{

        wsClient.on('message', ( data, isBinary ) => {
            wss.clients.forEach((client) => {
                if(client.readyState === WebSocket.OPEN) {
                    client.send(data, {binary: isBinary});
                }
            })
            
        })
    });
}


