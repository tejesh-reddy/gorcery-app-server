import axios from "axios";
import { verify } from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";
import { createUser, findOrCreateUser } from "../service/UserService";

export const client = new JwksClient({
    jwksUri: "https://dev-fptcog10.us.auth0.com/.well-known/jwks.json",
  });
  
export const getKey = (header: any, callback: any) => {
    client.getSigningKey(header.kid, (error, key: any) => {
      const signingKey = key.publicKey || key.rsaPublicKey || "";
      callback(null, signingKey);
    });
  };

const getUserinfo = (authHeader: string) => {
  return axios.get("https://dev-fptcog10.us.auth0.com/userinfo", {
    headers: {
      'Authorization': authHeader,
    }
  }).then(result=>{
    let data = result.data;
    return {
      id: data.sub,
      username: data.nickname||data.name,
      email: data.email,
    }
  })
  .catch(console.log)
}
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
        async (err, decoded) => {
          if (err) return reject(err);
          resolve(findOrCreateUser(decoded.sub, getUserinfo, authHeader))
        }
      );
    });
    return user;
  };
  
  