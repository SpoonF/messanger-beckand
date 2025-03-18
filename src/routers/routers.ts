import { IRouter } from "../interface/IRouter";
import { Express } from "express";

class Routers {
    private list: IRouter[] = [];
    public add(router: IRouter): void{
        this.list.push(router)
    }
    public build(app: Express): void{
        this.list.forEach(router => {
            router.build(app);
        })   
    }
}

export const routers = new Routers();