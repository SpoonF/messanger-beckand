import { Router } from "../classes/Router";
import { Express } from "express";
import { dialogController } from "../controllers/dialog";


export class dialogRouter extends Router {

    public build(app: Express): void{
        this.router.get('/', this.verifyToken, dialogController.connect_dialog);

        app.use('/dialog', this.router);
    }

    public getRouter() {
        return this.router;
    }
}

