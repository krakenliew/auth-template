import { Module } from '@nestjs/common';
import { StrategyService } from './strategy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])],
    providers:[StrategyService],
    exports:[
        StrategyService
    ]
})
export class StrategyModule {}
