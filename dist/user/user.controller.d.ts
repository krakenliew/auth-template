import { UserService } from './user.service';
import { CreateUserDTO, User, LoginRsp, userLogin, UpdateUser } from 'src/common/dto/user.dto';
export declare class UserController {
    private readonly userService;
    private readonly logger;
    constructor(userService: UserService);
    register(body: CreateUserDTO): Promise<User>;
    login(body: userLogin, ip: any): Promise<LoginRsp>;
    updateData(body: UpdateUser, type: any): Promise<User>;
}
