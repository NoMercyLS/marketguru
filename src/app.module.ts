import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { DbModule } from './_common/database/db.module';
import { AuthModule } from './_common/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    UserModule,
    AuthModule,
    CacheModule.register()
  ],
})
export class AppModule {
}
