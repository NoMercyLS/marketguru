import { CacheModule, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userDbProvider } from './providers';
import { DbModule } from '../_common/database/db.module';
import { AuthModule } from '../_common/auth/auth.module';
import { JwtStrategy } from '../_common/auth/strategies';
import { AuthService } from '../_common/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module(
  {
    imports:
      [
        DbModule,
        AuthModule,
        CacheModule.register(),
        JwtModule.register({
          secret: process.env.JWT_SECRET,
        }),
      ],
    controllers: [UserController],
    providers:
      [
        UserService,
        ...userDbProvider,
        JwtStrategy,
        AuthService,
      ],
    exports: [...userDbProvider],
  },
)
export class UserModule {
}