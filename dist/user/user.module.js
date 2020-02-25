"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../common/entity/user.entity");
const auth_service_1 = require("../common/auth/auth.service");
const strategy_service_1 = require("../common/strategy/strategy.service");
const jwt_1 = require("@nestjs/jwt");
const jwt_constant_1 = require("../common/jwt/jwt.constant");
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]), jwt_1.JwtModule.register({ secret: jwt_constant_1.jwtConst.secretKey })],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, auth_service_1.AuthService, strategy_service_1.StrategyService]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map