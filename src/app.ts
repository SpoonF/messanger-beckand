import { run, runWebSockets } from "./startup";
import { jwtVerifyI } from "./tools/jwt";


jwtVerifyI()

run();
runWebSockets();

