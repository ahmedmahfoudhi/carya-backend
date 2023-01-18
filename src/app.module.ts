import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RentRequestModule } from './rent-request/rent-request.module';
import { ItemController } from './item/item.controller';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    RentRequestModule,
    ItemModule,
  ],
  controllers: [AppController, ItemController],
  providers: [AppService],
})
export class AppModule {}
