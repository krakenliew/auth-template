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
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateUserDTO {
}
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiProperty({
        description: 'user email',
        required: true,
        type: String
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiProperty({
        description: 'user name',
        required: true,
        type: String
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "username", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsAlphanumeric(),
    class_validator_1.MinLength(8),
    class_validator_1.MaxLength(12),
    class_validator_1.Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])/, { message: "must be at least one digit,one Uppercase and one Lowercase" }),
    swagger_1.ApiProperty({
        description: 'user password',
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "password", void 0);
exports.CreateUserDTO = CreateUserDTO;
class User {
}
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsAlphanumeric(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
exports.User = User;
class UpdateUser {
}
__decorate([
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], UpdateUser.prototype, "email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateUser.prototype, "username", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateUser.prototype, "password", void 0);
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateUser.prototype, "new_email", void 0);
exports.UpdateUser = UpdateUser;
class userLogin {
}
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], userLogin.prototype, "email", void 0);
__decorate([
    class_validator_1.IsAlphanumeric(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], userLogin.prototype, "password", void 0);
exports.userLogin = userLogin;
//# sourceMappingURL=user.dto.js.map