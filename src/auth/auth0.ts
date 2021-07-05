import { verify } from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";

export const client = new JwksClient({
    jwksUri: "https://dev-fptcog10.us.auth0.com/.well-known/jwks.json",
  });
  
export const getKey = (header: any, callback: any) => {
    client.getSigningKey(header.kid, (error, key: any) => {
      const signingKey = key.publicKey || key.rsaPublicKey || "";
      callback(null, signingKey);
    });
  };
export const GetUser = (request: any) => {
    const authHeader: string = request.headers.authorization || null;
  
    if (authHeader === null)
      return null;

    const token = authHeader.split(" ")[1];
  
    const user = new Promise((resolve, reject) => {
      verify(
        token,
        getKey,
        {
          algorithms: ["RS256"],
          issuer: "https://dev-fptcog10.us.auth0.com/",
          audience: "https://grocery-app.com",
        },
        (err, decoded) => {
          if (err) return reject(err);
          console.log('decoded:', decoded)
          resolve(decoded.iss);
        }
      );
    });
    return user;
  };
  
  