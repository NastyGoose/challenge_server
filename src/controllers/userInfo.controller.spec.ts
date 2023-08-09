import { Test, TestingModule } from '@nestjs/testing';
import { UserInfoController } from './userInfo.controller';
import { UserInfoService } from '../services/userInfo.service';

describe('UserInfoController', () => {
  let appController: UserInfoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserInfoController],
      providers: [UserInfoService],
    }).compile();

    appController = app.get<UserInfoController>(UserInfoController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
