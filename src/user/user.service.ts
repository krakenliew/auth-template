import { Injectable, Logger, HttpException, UsePipes, ValidationPipe, UseFilters, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO, userLogin, UpdateUser, User, LoginRsp } from 'src/common/dto/user.dto';
import { AuthService } from 'src/common/auth/auth.service';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { JwtService } from "@nestjs/jwt";

@Injectable()
@UsePipes(ValidationPipe)
@UseFilters(HttpExceptionFilter)
export class UserService {
    private logger = new Logger('UserService')
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntity : Repository<UserEntity>,
        private authService : AuthService,
        private jwtService:JwtService
    ){}

    async register(
        body:CreateUserDTO
    ):Promise<User>{
        //get the password and hash it using the bcrypt service
        body.password = await this.authService.hashPassword(body.password)
        try {
            return this.userEntity.save(body);
        } catch (error) {
            this.logger.error(error.message);
            throw new HttpException(error.message,404);
        }
    }

    async login(
        body: userLogin,
        ip : string
    ):Promise<LoginRsp>{
        //check if user exist
        let user = await this.userEntity.findOne({email:body.email});
        if(!user){
            this.logger.error('Email is not registered');
            throw new UnauthorizedException('Email is not registered');
        }
        //check if user password correct
        let password = await this.authService.comparePassword(body.password,user.password);
        if(!password){
            this.logger.error('Password is not match');
            throw new UnauthorizedException('Password is not match')
        }
        //get the login date and ip
        let update = {
            ...user,...{
            updated_date : new Date().toISOString().replace('T',' ').substr(0, 19)+" "+new Date().toString().slice(new Date().toString().search('GMT'),new Date().toString().length),
            lastIp: ip
        }}
        //get the token for login
        const token = await this.jwtService.signAsync({email:body.email},{expiresIn: 60*30})
        //update to table
        try {
            this.logger.log('User login success')
            await this.userEntity.update(update.id,update);
            return {status:'Success',token:token}
        } catch (error) {
            throw new HttpException(error.message,404);
        }
    }

    async updateUser(
        body:UpdateUser,
        type:string
    ):Promise<User>{
        //check if user exist
        let user = await this.userEntity.findOne({email:body.email})
        if(!user){
            throw new UnauthorizedException('User is not registered')
        }
        //check the type of update data
        if(type.toLowerCase()=='email'){
            user.email = body.new_email
        }
        if(type.toLowerCase()=='password'){
            user.password = await this.authService.hashPassword(body.password)
        }
        if(type.toLowerCase()=='username'){
            user.username = body.username
        }
        try {
            if(type.toLowerCase()=='email'){
                return this.updateRes(user,body.new_email);
            }else{
                return this.updateRes(user,body.email);
            }
        } catch (error) {
            this.logger.error(error.message);
            throw new HttpException(error.message,404);
        }
    }

    async updateRes(user,email){
        await this.userEntity.update(user.id,user)
        this.logger.log('User update successfully')
        return await this.userEntity.findOne({email:email})
    }
}
