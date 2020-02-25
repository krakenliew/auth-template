import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from 'src/common/entity/user.entity';
import { AuthService } from 'src/common/auth/auth.service';
import { StrategyService } from 'src/common/strategy/strategy.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConst } from 'src/common/jwt/jwt.constant';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),JwtModule.register({secret:jwtConst.secretKey})],
  controllers: [UserController],
  providers: [UserService,AuthService,StrategyService]
})
export class UserModule {}
