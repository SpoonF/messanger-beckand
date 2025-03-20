import { Controller } from "../classes/Controller";
import argon2 from "argon2";
import { db } from "../tools/db";

export class usersController extends Controller {

    public static async getUser_get( req: any, res: any) {
        const { id } = req.params;

        const result = await db.user.findUnique({where: { id: id }});

        res.statusCode = 200;
        res.send(JSON.stringify(result));
    }

    public static async getUsers_get( req: any, res: any ) {

        const users = await db.user.findMany();

        res.statusCode = 200;
        res.send(users);
    }

    public static async addUser_post( req: any, res: any ) {
        const { phone, username, password, age } = req.body;

        const user = {
            phone,
            username,
            hash: await argon2.hash(password),
            age: age ? age : null
        }

        const result = await db.user.create({data: user});
        
        res.statusCode = 201;
        res.send(JSON.stringify(result));
    }

    public static updateUser_put( req: any, res: any ) {

        res.statusCode = 201;
        res.send();
    }

    public static deleteUser_delete( req: any, res: any ) {
        const { id } = req.params;


        res.statusCode = 200;
        res.send();
    }

}