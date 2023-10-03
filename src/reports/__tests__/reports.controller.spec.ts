import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from '../reports.controller';
import { ReportsService } from '../reports.service';
import { User } from 'src/users/user.entity';
import { Report } from '../report.entity';

describe('ReportsController', () => {
  let controller: ReportsController;
  let mockReportsService: Partial<ReportsService>;
  beforeEach(async () => {
    mockReportsService = {
      create(createReportDto, user) {
        return Promise.resolve({
          id: 1,
          price: 1,
          make: "Cdd",
          model: "tt",
          year: 2000,
          mileage: 2000,
          lat: 11,
          lng: 122,
          approved: false,
          user: 1 as unknown as User,
        } as Report)
      },
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [
        ReportsService,
        {
          provide: ReportsService,
          useValue: mockReportsService
        }
      ]
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('createUser', () => {
    it('should create and return the user with sessions', async () => {
      const session = { userId: 1 };
      const report = await controller.createReport(
        {
          price: 1,
          make: "Cdd",
          model: "tt",
          year: 2000,
          mileage: 2000,
          lat: 11,
          lng: 122,
        },
        1 as unknown as User
      );

      expect(report).toBeDefined();
      expect(session.userId).not.toBeNull();
      expect(session.userId).toEqual(1);
    });
  })

});
