import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './common/db/db.config';
import { Connection } from 'typeorm';
import { AuthModule } from './common/auth/auth.module';
import { StrategyModule } from './common/strategy/strategy.module';

@Module({
  imports: [UserModule,TypeOrmModule.forRoot(typeOrmConfig), AuthModule, StrategyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection:Connection){
    console.log('connection status', connection.isConnected);
  }
}
