import { Express } from "express";

export interface IRouter {
    build(app: Express): void;
}