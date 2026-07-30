import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './application/use-cases/auth.service';
import { AuthRepository } from './infrastructure/database/auth.repository';
import { JwtStrategy } from './infrastructure/validators/jwt.strategy';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'hvapi_default_secret_key',
        signOptions: {
          expiresIn: (configService.get<string>('JWT_EXPIRATION') || '15m') as any,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: 'IAuthRepository',
      useClass: AuthRepository,
    },
  ],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
