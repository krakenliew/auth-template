import { Controller, UsePipes, ValidationPipe, Post, Body, Logger, HttpException, Ip, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiCreatedResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDTO, User, LoginRsp, userLogin, UpdateUser } from 'src/common/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiTags('User')
@UsePipes(ValidationPipe)
export class UserController {
    private readonly logger = new Logger('User Controller')
    constructor(private readonly userService:UserService){}

    @Post('/register')
    @ApiCreatedResponse({description:"object"})
    async register(
        @Body() body:CreateUserDTO
    ):Promise<User>{
        try {
            let result = this.userService.register(body)
            this.logger.log('User register success')
            return result;
        } catch (error) {
            this.logger.error(error.message);
            throw new HttpException(error.message,404)
        }
    }

    @Post('login')
    @ApiCreatedResponse({description:"object"})
    async login(
        @Body() body: userLogin,
        @Ip() ip
    ):Promise<LoginRsp>{
        try {
            let result = await this.userService.login(body,ip)
            this.logger.log('User login success')
            return result;
        } catch (error) {
            this.logger.error(error.message);
            throw new HttpException(error.message,404)
        }
    }

    @Post('update/:type')
    @ApiBearerAuth()
    @ApiCreatedResponse({description:"object"})
    @UseGuards(AuthGuard('jwt'))
    async updateData(
        @Body() body: UpdateUser,
        @Param('type') type 
    ):Promise<User>{
        try {
            let result = await this.userService.updateUser(body,type)
            this.logger.log('User update success');
            return result;
        } catch (error) {
            this.logger.error(error.message);
            if(error.message=='ER_BAD_NULL_ERROR: Column \'email\' cannot be null'){
                throw new HttpException('please provide a valid new email',404)
            }
            if(error.message=='data and salt arguments required'){
                throw new HttpException('please provide a valid new password',404)
            }
            if(error.message=='ER_BAD_NULL_ERROR: Column \'username\' cannot be null'){
                throw new HttpException('please provide a valid new username',404)
            }
        }
    }
}
