import { Router } from "../classes/Router";
import { Express } from "express";
import { usersController } from "../controllers/users";
import { routers } from "./routers";

class usersRouter extends Router {

    public build(app: Express): void{
        this.router.get('/:id', usersController.getUser_get);
        this.router.get('/', usersController.getUsers_get);
        this.router.post('/', usersController.addUser_post);
        this.router.put('/:id', usersController.updateUser_put);
        this.router.delete('/:id', usersController.deleteUser_delete);

        app.use('/users', this.router);
    }

    public getRouter() {
        return this.router;
    }
}

routers.add(new usersRouter);
