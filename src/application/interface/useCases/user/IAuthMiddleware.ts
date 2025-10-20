


import { IDecodedUserPayload } from "../../../../domain/types/IDecodedUserPayload";

export interface IAuthMiddleware{
    authenticateUser(token:string):Promise<IDecodedUserPayload>
    validateRefreshToken(refreshToken:string):Promise<IDecodedUserPayload>
}