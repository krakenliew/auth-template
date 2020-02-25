"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../common/entity/user.entity");
const typeorm_2 = require("typeorm");
const user_dto_1 = require("../common/dto/user.dto");
const auth_service_1 = require("../common/auth/auth.service");
const http_exception_filter_1 = require("../common/filter/http-exception.filter");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(userEntity, authService, jwtService) {
        this.userEntity = userEntity;
        this.authService = authService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger('UserService');
    }
    async register(body) {
        body.password = await this.authService.hashPassword(body.password);
        try {
            return this.userEntity.save(body);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(error.message, 404);
        }
    }
    async login(body, ip) {
        let user = await this.userEntity.findOne({ email: body.email });
        if (!user) {
            this.logger.error('Email is not registered');
            throw new common_1.UnauthorizedException('Email is not registered');
        }
        let password = await this.authService.comparePassword(body.password, user.password);
        if (!password) {
            this.logger.error('Password is not match');
            throw new common_1.UnauthorizedException('Password is not match');
        }
        let update = Object.assign(Object.assign({}, user), {
            updated_date: new Date().toISOString().replace('T', ' ').substr(0, 19) + " " + new Date().toString().slice(new Date().toString().search('GMT'), new Date().toString().length),
            lastIp: ip
        });
        const token = await this.jwtService.signAsync({ email: body.email }, { expiresIn: 60 * 30 });
        try {
            this.logger.log('User login success');
            await this.userEntity.update(update.id, update);
            return { status: 'Success', token: token };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, 404);
        }
    }
    async updateUser(body, type) {
        let user = await this.userEntity.findOne({ email: body.email });
        if (!user) {
            throw new common_1.UnauthorizedException('User is not registered');
        }
        if (type.toLowerCase() == 'email') {
            user.email = body.new_email;
        }
        if (type.toLowerCase() == 'password') {
            user.password = await this.authService.hashPassword(body.password);
        }
        if (type.toLowerCase() == 'username') {
            user.username = body.username;
        }
        try {
            if (type.toLowerCase() == 'email') {
                return this.updateRes(user, body.new_email);
            }
            else {
                return this.updateRes(user, body.email);
            }
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(error.message, 404);
        }
    }
    async updateRes(user, email) {
        await this.userEntity.update(user.id, user);
        this.logger.log('User update successfully');
        return await this.userEntity.findOne({ email: email });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    common_1.UsePipes(common_1.ValidationPipe),
    common_1.UseFilters(http_exception_filter_1.HttpExceptionFilter),
    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map