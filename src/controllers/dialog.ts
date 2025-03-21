import { Controller } from "../classes/Controller";
import argon2 from "argon2";
import { db } from "../tools/db";
import { getObject } from "../tools/jwt";

export class dialogController extends Controller {

    public static async connect_dialog( req: any, res: any) {
        res.send('ohohoh');
    }

    public static async send_message( req: any, res: any ) {

    }

}