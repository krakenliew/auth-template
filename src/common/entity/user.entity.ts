
import { Entity, Unique, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity({name:'template'})
@Unique(['username'])
@Unique(['email'])
export class UserEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    username : string;

    @Column({length:100})
    password:string;

    @Column({length:30})
    email:string;

    @Column({default:`${new Date().toISOString().replace('T',' ').substr(0, 19)+" "+new Date().toString().slice(new Date().toString().search('GMT'),new Date().toString().length)}`})
    created_date : string;

    @Column({default:null})
    updated_date : string;

    @Column({default:null})
    lastIp:string;
}
