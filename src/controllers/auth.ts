import { Controller } from "../classes/Controller";
import argon2 from "argon2";
import { db } from "../tools/db";
import { getToken } from "../tools/jwt";

export class authController extends Controller {

    public static async registration( req: any, res: any, next: any ){

        if (!req.body.username) return res.send({success: 'error'});
        const { phone, username, password, age } = req.body;

        const hash = await argon2.hash(password);

        const user = {
            phone,
            username,
            hash,
            age: age ? new Date(age) : null
        }
        
        try{
            const result = await db.user.create({data: user});

            console.log(result);

            req.regResult = result;

            res.statusCode = 200;
            res.send(JSON.stringify({success: 'ok'}));

        }catch(error) {
            res.statusCode = 500;
            res.send(JSON.stringify({success: 'error'}));
            
        }
    }
    public static async authentication( req: any, res: any, next: any ){
        console.log('Попытка авторизации');
        const { phone, password } = req.body;

        const user = await db.user.findFirst({ where: { phone } });
        
        if(user){
            const isPassValid = await argon2.verify(user.hash, password);

            if(isPassValid){
                const token = await getToken(user);
                
                let options = {
                    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
                    httpOnly: true, // The cookie only accessible by the web server
                    signed: true // Indicates if the cookie should be signed
                }
                res.cookie('tkn',token, options);
                res.statusCode = 200;
                res.send(JSON.stringify({success: 'ok'}));
            }else{
                res.statusCode = 200;
                res.send(JSON.stringify({success: 'error', message: 'Wrong password'}));
            }
        }else {
            res.statusCode = 200;
            res.send(JSON.stringify({success: 'error', message: 'User not found'}));
        }

    }
    public static async login( req: any, resp: any, next: any ){

    }
    public static async logout( req: any, resp: any, next: any ){

    }
}