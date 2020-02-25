import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entity/user.entity";
import { Repository } from "typeorm";
import { jwtConst } from "../jwt/jwt.constant";

@Injectable()
export class StrategyService extends PassportStrategy(Strategy){
    private logger = new Logger('Authenticate')
    constructor(
        @InjectRepository(UserEntity)
        private userEntity:Repository<UserEntity>,
    ){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey : jwtConst.secretKey
        });
    }
    async validate(payload:any){
        const user = await this.userEntity.findOne({email:payload.email})
        if(user){
            return user;
        }else{
            this.logger.error('user is unauthorised');
            throw new UnauthorizedException('user is unauthorised')
        }
    }
}