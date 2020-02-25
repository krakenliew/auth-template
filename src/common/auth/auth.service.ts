import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService{
    async hashPassword(password:string){
        return await bcrypt.hash(password,10);
    }

    async comparePassword(password:string,encryptPassword : string){
        return await bcrypt.compare(password,encryptPassword);
    }
}