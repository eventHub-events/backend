import { JwtPayload } from "jsonwebtoken";

export type IDecodedUserPayload = JwtPayload & { id: string; role: string };
