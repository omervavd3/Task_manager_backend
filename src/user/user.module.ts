import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { CheckUserRegisterMiddleware } from 'src/middlewares/user-register.middleware';
import { CheckUserLoginMiddleware } from 'src/middlewares/user-login.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [DatabaseModule, ConfigModule.forRoot()],
    controllers: [UserController],
    providers: [UserService, ...userProviders],
})
export class UserModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(CheckUserRegisterMiddleware).forRoutes('user/register')
        .apply(CheckUserLoginMiddleware).forRoutes('user/login')
    }
}
