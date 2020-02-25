export declare class CreateUserDTO {
    email: string;
    username: string;
    password: string;
}
export declare class User {
    email: string;
    username: string;
    password: string;
}
export declare class UpdateUser {
    email: string;
    username: string;
    password: string;
    new_email: string;
}
export interface LoginRsp {
    status: string;
    readonly token: string;
}
export declare class userLogin {
    email: string;
    password: string;
}
