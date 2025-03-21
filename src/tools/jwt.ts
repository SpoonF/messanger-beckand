import { JWTPayload, JWTVerifyResult, SignJWT } from 'jose';
import { jwtVerify } from 'jose';
import { createSecretKey, KeyObject } from 'crypto';
const config = require("../../config.json");

const secretKey = createSecretKey(config.secret, 'utf-8');

export const getToken = async (object: object) => {

  const token = await new SignJWT({ id: '12345' }) // details to  encode in the token
    .setProtectedHeader({ alg: 'HS256' }) // algorithm
    .setIssuedAt()
    .setIssuer('urn:example:issuer') // issuer
    .setAudience('urn:example:audience') // audience
    .setExpirationTime('2h') // token expiration time, e.g., "1 day"
    .sign(secretKey); // secretKey generated from previous step
  return token;
}
export const getObject = async (jwt: string): Promise<void | JWTVerifyResult<JWTPayload>> => {
  try {
    // verify token
    const result = await jwtVerify(jwt, secretKey, {
      issuer: process.env.JWT_ISSUER, // issuer
      audience: process.env.JWT_AUDIENCE, // audience
    });
    // log values to console
    return result;
  } catch (e) {
    // token verification failed
    console.log("Token is invalid");
  }
}

export async function mv_VerifyToken(req: any, res: any, next: any) {
  if ("tkn" in req.cookies) {
    const result = await getObject(req.cookies.tkn);
    if (result) {
      req.session.user = result;
      next();
    } else {
      res.status(400).send('Token is not valid');
    }
  }
  res.status(400).send('Not auth');
}