import { Test, TestingModule } from '@nestjs/testing';
import { RestApiController } from './restapi.controller';
import { RestApiService } from './restapi.service';
import { JwtDashboardStrategy } from './auth/strategies/jwt-dashboard.strategy';
import { JwtShareStrategy } from './auth/strategies/jwt-share.strategy';
import { NotesController } from './entities/note/note.controller';
import { NotesService } from './entities/note/note.service';
import { UserController } from './entities/user/user.controller';
import { UserService } from './entities/user/user.service';

describe('RestApiController', () => {
  let appController: RestApiController;
  let restApiService: RestApiService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RestApiController, UserController, NotesController],
      providers: [
        RestApiService,
        UserService,
        NotesService,
        JwtDashboardStrategy,
        JwtShareStrategy,
        // Add other dependencies here if RestApiService depends on them
      ],
    }).compile();

    appController = app.get<RestApiController>(RestApiController);
    restApiService = app.get<RestApiService>(RestApiService); // Inject RestApiService
  });

  describe('root', () => {
    it('should return "Yeah, Miro!"', () => {
      expect(appController.getHello()).toBe('Yeah, Miro!');
    });
  });

  describe('RestApiService', () => {
    it('should be defined', () => {
      expect(restApiService).toBeDefined();
    });

    // Add more tests for RestApiService if needed
  });
});
