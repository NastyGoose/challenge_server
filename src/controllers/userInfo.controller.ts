import { Body, Controller, Post } from '@nestjs/common'
import { UserInfoService } from '../services/userInfo.service'
import { type PriceDescription, UserInfoFormBody } from 'src/types/userInfo.types'

@Controller()
export class UserInfoController {
  constructor (private readonly userInfoService: UserInfoService) {}

  @Post('user')
  async addUserInfo (@Body() userInfoBody: UserInfoFormBody): Promise<PriceDescription> {
    return await this.userInfoService.addUserAndCalculatePrice(userInfoBody)
  }
}
