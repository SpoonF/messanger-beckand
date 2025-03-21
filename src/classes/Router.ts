import express, { Express } from "express"
import { IRouter } from "../interface/IRouter";
import { mv_VerifyToken } from "../tools/jwt";

export class Router implements IRouter{
    // protected express = express;
    // protected app = express();
    protected router = express.Router();
    protected verifyToken = mv_VerifyToken;

    public build(app: Express): void {};
}