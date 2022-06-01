import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Offer from './entities/offer.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), UserModule],
  controllers: [OfferController],
  providers: [OfferService],
  exports: [OfferService]
})
export class OfferModule {}
