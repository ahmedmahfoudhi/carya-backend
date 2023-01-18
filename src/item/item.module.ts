import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { CarService } from './car.service';
import { HomeService } from './home.service';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { Car, CarSchema } from './schemas/car.entity';
import { Home, HomeSchema } from './schemas/home.entity';
import { Item, ItemSchema } from './schemas/item.entity';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Item.name,
        schema: ItemSchema,
        discriminators: [
          { name: Car.name, schema: CarSchema },
          { name: Home.name, schema: HomeSchema },
        ],
      },
    ]),
    UserModule,
  ],
  exports: [ItemService, CarService, HomeService],
  providers: [ItemService, CarService, HomeService],
  controllers: [ItemController],
})
export class ItemModule {}
