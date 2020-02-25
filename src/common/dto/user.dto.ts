import { IsEmail, IsNotEmpty, IsString, IsAlphanumeric, MinLength, MaxLength, Matches, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO{
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description:'user email',
        required : true,
        type : String
    })
    email : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description : 'user name',
        required : true,
        type : String
    })

    username : string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @MinLength(8)
    @MaxLength(12)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])/,
        {message:"must be at least one digit,one Uppercase and one Lowercase"}
    )
    @ApiProperty({
        description: 'user password',
        required : true,
        type : String,
    })

    password : string;
}

export class User{
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    username:string;

    @IsNotEmpty()
    @IsAlphanumeric()
    password : string;

    
}

export class UpdateUser{
    @IsEmail()
    email:string;

    @IsOptional()
    @IsString()
    username:string;

    @IsOptional()
    @IsString()
    password : string;

    @IsEmail()
    @IsOptional()
    new_email : string;
}

export interface LoginRsp{
    status:string,
    readonly token : string;
}

export class userLogin{
    @IsEmail()
    @IsNotEmpty()
    email : string;

    @IsAlphanumeric()
    @IsNotEmpty()
    password : string;
}