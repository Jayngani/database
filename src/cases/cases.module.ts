import { Module } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/jwt-strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET || 'access_secret',
      signOptions: {
        expiresIn: (process.env.ACCESS_TOKEN_EXPIRES_IN || '900s') as any,
      },
    }),
  ],
  providers: [CasesService, JwtStrategy],
  controllers: [CasesController],
  exports: [CasesService]
})
export class CasesModule {}