import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios';
import { AuthenticationController } from './authentication.controller'
import { AuthenticationService } from './authentication.service'
import { LoggerModule } from '@/modules/logger/logger.module'
import { LocalStrategy } from '@/modules/authentication/local.strategy';
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    LoggerModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET')
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy],
  
})
export class AuthenticationModule {}
