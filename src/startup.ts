const config = require("../config.json");
import express from "express";
import WebSocket, { WebSocketServer } from "ws";
import { usersRouter } from "./routers/users";

const app = express();


export function run() {
    app.use(express.urlencoded());

    app.get('/', (req, res) => {
        res.statusCode = 200;
        res.send('Hello World!');
    });

    const userR = new usersRouter();
    
    userR.build(app);
    
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


