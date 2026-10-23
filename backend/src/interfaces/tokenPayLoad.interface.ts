import { JwtPayload } from "jsonwebtoken";

export interface TokenPayLoad extends JwtPayload {
    id: number;
    username: string;
    esAdmin: boolean;
}