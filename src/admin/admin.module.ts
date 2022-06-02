import { Module } from '@nestjs/common';
import { OfferModule } from 'src/offer/offer.module';
import { UserModule } from 'src/user/user.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [UserModule, OfferModule],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
