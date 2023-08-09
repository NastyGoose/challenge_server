import { isNumber } from 'lodash'

import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Coverage, Discount, UserInfo } from 'src/schemas/user-info.schema'
import { differenceInYears } from 'date-fns'
import {
  type PriceDescription,
  type UserInfoFormBody
} from 'src/types/userInfo.types'

@Injectable()
export class UserInfoService {
  constructor (
    @InjectModel(UserInfo.name) private readonly userInfoModel: Model<UserInfo>
  ) {}

  private calculatePrice (userInfo: UserInfo): PriceDescription {
    const baseTownPrice = userInfo.city.length * 100
    const userAge = differenceInYears(
      new Date(userInfo.birthday).getTime(),
      Date.now()
    )

    const basePrice = baseTownPrice + baseTownPrice * (userAge / 10)
    const coveragesPrices = []
    const discountAndSurcharges = []

    if (userInfo.coverages.includes(Coverage.BonusProtection)) {
      coveragesPrices.push({
        name: Coverage.BonusProtection,
        value: basePrice * 0.12
      })
    }

    if (userInfo.coverages.includes(Coverage.AOPlus)) {
      coveragesPrices.push({
        name: Coverage.AOPlus,
        value: userAge > 29 ? 105 : 55
      })
    }

    if (userInfo.coverages.includes(Coverage.GlassCoverage)) {
      coveragesPrices.push({
        name: Coverage.GlassCoverage,
        value: userInfo.vehiclePower * 0.8
      })
    }

    if (userInfo.discountAndSurcharges.includes(Discount.Commercial)) {
      discountAndSurcharges.push({
        name: Discount.Commercial,
        value: -(basePrice * 0.1)
      })
    }

    if (
      userInfo.discountAndSurcharges.includes(Discount.Agents) &&
      userInfo.coverages.length > 1
    ) {
      discountAndSurcharges.push({
        name: Discount.Agents,
        value: -(
          coveragesPrices.reduce((acc: number, item: { name: string, value: number }) => acc + item.value, 0) *
          0.2
        )
      })
    }

    if (
      isNumber(userInfo.voucher)
    ) {
      discountAndSurcharges.push({
        name: 'Voucher',
        value: -(userInfo.voucher)
      })
    }

    if (
      userInfo.discountAndSurcharges.includes(Discount.StrongCar) &&
      userInfo.vehiclePower > 80
    ) {
      discountAndSurcharges.push({
        name: Discount.StrongCar,
        value: basePrice * 0.1
      })
    }

    const totalBasePrice =
      basePrice +
      coveragesPrices.reduce((acc: number, item: { name: string, value: number }) => acc + item.value, 0) +
      discountAndSurcharges.reduce((acc, item: { name: string, value: number }) => acc + item.value, 0)

    if (userInfo.discountAndSurcharges.includes(Discount.Summer)) {
      discountAndSurcharges.push({
        name: Discount.Summer,
        value: -(totalBasePrice * 0.05)
      })

      return {
        totalPrice: totalBasePrice - totalBasePrice * 0.05,
        discountAndSurcharges,
        coverages: coveragesPrices
      }
    }

    return {
      totalPrice: totalBasePrice,
      discountAndSurcharges,
      coverages: coveragesPrices
    }
  }

  async addUser (userBody: UserInfoFormBody): Promise<UserInfo> {
    const result = await this.userInfoModel.create(userBody)

    return result
  }

  async addUserAndCalculatePrice (
    userBody: UserInfoFormBody
  ): Promise<PriceDescription> {
    const userInfo = await this.addUser(userBody)

    return this.calculatePrice(userInfo)
  }
}
