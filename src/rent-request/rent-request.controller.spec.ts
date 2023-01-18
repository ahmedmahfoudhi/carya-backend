import { Test, TestingModule } from '@nestjs/testing';
import { RentRequestController } from './rent-request.controller';
import { RentRequestService } from './rent-request.service';

describe('RentRequestController', () => {
  let controller: RentRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentRequestController],
      providers: [RentRequestService],
    }).compile();

    controller = module.get<RentRequestController>(RentRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
