import express, { Express } from "express"
import { IRouter } from "../interface/IRouter";

export class Router implements IRouter{
    // protected express = express;
    // protected app = express();
    protected router = express.Router();

    public build(app: Express): void {};
}