import { Controller } from "../classes/Controller";

interface User {
    id: number;
    name: string;
    age: number;
}

const users = [
    { id: 1, name: 'BOMJ', age: 13 },
    { id: 2, name: 'Alex', age: 25 },
    { id: 3, name: 'Jeremi', age: 174 },
];

export class usersController extends Controller {

    public static getUser_get( req: any, res: any) {
        const { id } = req.params;
        const user = users.find(user => user.id == id);
        res.statusCode = 200;
        res.send(user);
    }
    public static getUsers_get( req: any, res: any ) {
        res.statusCode = 200;
        res.send(users);
    }

    public static addUser_post( req: any, res: any ) {
        const user: User = req.body;
        user.id = users[users.length - 1].id + 1;
        users.push(user);

        res.statusCode = 201;
        res.send();
    }
    public static addUsers_post( req: any, res: any ) {
        
    }

    public static updateUser_put( req: any, res: any ) {
        const { id } = req.params;
        const user: User = req.body;
        user.id = id;

        users.forEach((element, index, array) => {
            if(element.id == id) {
                array[index] = user;
            }
        })

        res.statusCode = 201;
        res.send();
    }
    public static updateUsers_put( req: any, res: any ) {
        
    }

    public static deleteUser_delete( req: any, res: any ) {
        const { id } = req.params;

        for (const user of users) {
            if(user.id == id) {
                const index = users.findIndex(element => element.id == id)
                users.splice(index, 1);
                break;
            }
        }

        res.statusCode = 200;
        res.send();
    }
    public static deleteUsers_delete( req: any, res: any ) {
        
    }
}