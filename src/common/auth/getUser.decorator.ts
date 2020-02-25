import { createParamDecorator } from "@nestjs/common";
import { UserEntity } from "../entity/user.entity";

export const getUser = createParamDecorator((data,req):UserEntity=>{
    return req.user;
})
