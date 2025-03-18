import { SignJWT } from 'jose';
import { jwtVerify } from 'jose';
import { createSecretKey, KeyObject } from 'crypto';
const config = require("../../config.json");


export async function jwtVerifyI() {
    const secretKey = createSecretKey(config.secret, 'utf-8');

    const jwt = await getToken(secretKey);

    (async () => {
        // extract token from request
        // const token = req.header('Authorization').replace('Bearer ', '');
        try {
          // verify token
          const { payload, protectedHeader } = await jwtVerify(jwt, secretKey, {
            issuer: process.env.JWT_ISSUER, // issuer
            audience: process.env.JWT_AUDIENCE, // audience
          });
          // log values to console
          console.log(payload);
          console.log(protectedHeader);
        } catch (e) {
          // token verification failed
          console.log("Token is invalid");
        }
    })();
}
const getToken = async(secretKey: KeyObject) => {
    const token = await new SignJWT({ id: '12345' }) // details to  encode in the token
        .setProtectedHeader({ alg: 'HS256' }) // algorithm
        .setIssuedAt()
        .setIssuer('urn:example:issuer') // issuer
        .setAudience('urn:example:audience') // audience
        .setExpirationTime('2h') // token expiration time, e.g., "1 day"
        .sign(secretKey); // secretKey generated from previous step
    return token;
}
const getObject = async() => {

}