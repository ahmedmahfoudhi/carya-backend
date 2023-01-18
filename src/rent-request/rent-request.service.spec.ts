import { Test, TestingModule } from '@nestjs/testing';
import { RentRequestService } from './rent-request.service';

describe('RentRequestService', () => {
  let service: RentRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentRequestService],
    }).compile();

    service = module.get<RentRequestService>(RentRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
