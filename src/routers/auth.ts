import { Router } from "../classes/Router";
import { Express } from "express";
import { authController } from "../controllers/auth";

export class authRouter extends Router {

    public build(app: Express): void{
        this.router.post('/registration', authController.registration);
        this.router.post('/authentication', authController.authentication);
        this.router.post('/login', authController.login);
        this.router.post('/logout', authController.logout);

        app.use('/auth', this.router);
    }

    public getRouter() {
        return this.router;
    }
}