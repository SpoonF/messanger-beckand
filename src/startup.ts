const config = require("../config.json");
const cookieParser = require('cookie-parser');
import express, { Express } from "express";
import { routers } from "./tools/routers";
import cors from "cors";
import { usersRouter } from "./routers/users";
import { authRouter } from "./routers/auth";
import { dialogRouter } from "./routers/dialog";

import WebSocket, { WebSocketServer } from "ws";
import { createServer } from 'http';

const app = express();



export function run() {
    setSettings(app);

    app.use('/form', (req, res) => {
        res.render("cont.hbs");
    });

    routers.add(new usersRouter());
    routers.add(new authRouter());
    routers.add(new dialogRouter());
    routers.build(app);

    app.listen( config.port, () => {
        console.log(`Example app listeneing on port ${ config.port }`);
        console.log(`Location: http://localhost:${ config.port }`);
    });

}

export function runWebSocket() {
    const server = createServer();
    const wss = new WebSocketServer({ port: 3002 });

    wss.on('connection', (ws: any, request: any, client: any) => {
        ws.on('error', console.error);

        ws.on('message', (data: any) => {
            console.log(`Received message ${data} from user ${client}`);
        });
    });

    server.on('upgrade', (request, socket, head) => {
        socket.on('error', console.error);

    // This function is not defined on purpose. Implement it with your own logic.

        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    });

    // server.listen(3002);
}


function setSettings(app: Express) {
    const corsOptions = {
        origin: '*',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }

    app.set("view engine", "hbs");
    app.use(express.urlencoded());
    app.use(cookieParser());
    app.use(cors(corsOptions));
}

