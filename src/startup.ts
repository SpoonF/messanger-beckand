const config = require("../config.json");
const cookieParser = require('cookie-parser');
import express from "express";
import WebSocket, { WebSocketServer } from "ws";
import { routers } from "./tools/routers";
import cors from "cors";
import { usersRouter } from "./routers/users";
import { authRouter } from "./routers/auth";

const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

export function run() {
    app.set("view engine", "hbs");
    app.use(express.urlencoded());
    app.use(cookieParser('hello'));
    app.use(cors(corsOptions));
    app.use('/form', (req, res) => {
        res.render("cont.hbs");
    });

    routers.add(new usersRouter());
    routers.add(new authRouter());
    routers.build(app);
    
    app.listen( config.port, () => {
        console.log(`Example app listeneing on port ${ config.port }`);
        console.log(`Location: http://localhost:${ config.port }`);
    });

}

export function runWebSocket() {
    const wss = new WebSocketServer({ port: config.wsPort });
    console.log(wss)

    wss.on('connection', ( wsClient: WebSocket ) =>{

        wsClient.on('message', ( data, isBinary ) => {
            wss.clients.forEach((client) => {
                if(client.readyState === WebSocket.OPEN) {
                    console.log(client);
                    client.send(data, {binary: isBinary});
                    console.log(Buffer.from(data.toString()))
                }
            })
        })
    });

}


