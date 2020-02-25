export declare class AuthService {
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, encryptPassword: string): Promise<boolean>;
}
