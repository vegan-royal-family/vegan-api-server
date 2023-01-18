import { Test, TestingModule } from '@nestjs/testing';
import { VeganTypeService } from './vegan-type.service';

describe('VeganTypeService', () => {
  let service: VeganTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VeganTypeService],
    }).compile();

    service = module.get<VeganTypeService>(VeganTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
