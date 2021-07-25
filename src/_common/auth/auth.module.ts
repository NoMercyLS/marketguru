import { JwtModule } from '@nestjs/jwt';
import { CacheModule, Module } from '@nestjs/common';
import { JwtStrategy } from './strategies';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { userDbProvider } from '../../user/providers';

@Module(
  {
    imports: [
      JwtModule.register({
        secret: process.env.JWT_SECRET,
      }),
      CacheModule.register({ max: 1000 }),
    ],
    providers: [AuthService, JwtStrategy, ...userDbProvider],
    controllers: [AuthController],
  },
)
export class AuthModule {
}
