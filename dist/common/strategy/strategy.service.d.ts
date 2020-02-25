import { Strategy } from "passport-jwt";
import { UserEntity } from "../entity/user.entity";
import { Repository } from "typeorm";
declare const StrategyService_base: new (...args: any[]) => Strategy;
export declare class StrategyService extends StrategyService_base {
    private userEntity;
    private logger;
    constructor(userEntity: Repository<UserEntity>);
    validate(payload: any): Promise<UserEntity>;
}
export {};
