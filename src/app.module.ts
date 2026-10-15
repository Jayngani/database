import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { CasesModule } from './cases/cases.module';
import { CpusModule } from './cpus/cpus.module';
import { MotherboardModule } from './motherboard/motherboard.module';

@Module({
imports: [CasesModule,DatabaseModule, UsersModule, AuthModule,CpusModule,MotherboardModule],
})

export class AppModule {}