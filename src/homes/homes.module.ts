import { Module } from '@nestjs/common';
import { HomesService } from './homes.service';
import { HomesController } from './homes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Home, HomeSchema } from './entities/Home.entity';

@Module({
  imports:[MongooseModule.forFeature([
    {name: Home.name, schema : HomeSchema},
  ])],
  controllers: [HomesController],
  providers: [HomesService]
})
export class HomesModule {}
