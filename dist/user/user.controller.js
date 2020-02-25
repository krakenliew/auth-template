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
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("../common/dto/user.dto");
const passport_1 = require("@nestjs/passport");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger('User Controller');
    }
    async register(body) {
        try {
            let result = this.userService.register(body);
            this.logger.log('User register success');
            return result;
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(error.message, 404);
        }
    }
    async login(body, ip) {
        try {
            let result = await this.userService.login(body, ip);
            this.logger.log('User login success');
            return result;
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(error.message, 404);
        }
    }
    async updateData(body, type) {
        try {
            let result = await this.userService.updateUser(body, type);
            this.logger.log('User update success');
            return result;
        }
        catch (error) {
            this.logger.error(error.message);
            if (error.message == 'ER_BAD_NULL_ERROR: Column \'email\' cannot be null') {
                throw new common_1.HttpException('please provide a valid new email', 404);
            }
            if (error.message == 'data and salt arguments required') {
                throw new common_1.HttpException('please provide a valid new password', 404);
            }
            if (error.message == 'ER_BAD_NULL_ERROR: Column \'username\' cannot be null') {
                throw new common_1.HttpException('please provide a valid new username', 404);
            }
        }
    }
};
__decorate([
    common_1.Post('/register'),
    swagger_1.ApiCreatedResponse({ description: "object" }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    common_1.Post('login'),
    swagger_1.ApiCreatedResponse({ description: "object" }),
    __param(0, common_1.Body()),
    __param(1, common_1.Ip()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.userLogin, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    common_1.Post('update/:type'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiCreatedResponse({ description: "object" }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateUser, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateData", null);
UserController = __decorate([
    common_1.Controller('user'),
    swagger_1.ApiTags('User'),
    common_1.UsePipes(common_1.ValidationPipe),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map