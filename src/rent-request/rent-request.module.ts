import { Module } from '@nestjs/common';
import { RentRequestService } from './rent-request.service';
import { RentRequestController } from './rent-request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RentRequest, RentRequestSchema } from './schemas/rent-request.entity';
import { UserModule } from 'src/user/user.module';
import { ItemModule } from 'src/item/item.module';

@Module({
  controllers: [RentRequestController],
  providers: [RentRequestService],
  imports: [
    MongooseModule.forFeature([
      { name: RentRequest.name, schema: RentRequestSchema },
    ]),
    UserModule,
    ItemModule,
  ],
  exports: [RentRequestService],
})
export class RentRequestModule {}
