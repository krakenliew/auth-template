import { UserEntity } from 'src/common/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO, userLogin, UpdateUser, User, LoginRsp } from 'src/common/dto/user.dto';
import { AuthService } from 'src/common/auth/auth.service';
import { JwtService } from "@nestjs/jwt";
export declare class UserService {
    private readonly userEntity;
    private authService;
    private jwtService;
    private logger;
    constructor(userEntity: Repository<UserEntity>, authService: AuthService, jwtService: JwtService);
    register(body: CreateUserDTO): Promise<User>;
    login(body: userLogin, ip: string): Promise<LoginRsp>;
    updateUser(body: UpdateUser, type: string): Promise<User>;
    updateRes(user: any, email: any): Promise<UserEntity>;
}
