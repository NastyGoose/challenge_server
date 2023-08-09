import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { type HydratedDocument } from 'mongoose'

export type UserInfoDocument = HydratedDocument<UserInfo>

export enum Discount {
  Commercial = 'commercial',
  Agents = 'agents',
  Summer = 'summer',
  StrongCar = 'strong_car',
}

export enum Coverage {
  BonusProtection = 'bonus_protection',
  AOPlus = 'ao_plus',
  GlassCoverage = 'glass_coverage'
}

@Schema()
export class UserInfo {
  @Prop()
    name: string

  @Prop()
    birthday: Date

  @Prop()
    city: string

  @Prop()
    vehiclePower: number

  @Prop()
    voucher: number

  @Prop()
    priceMatch: string

  @Prop()
    coverages: Coverage[]

  @Prop()
    discountAndSurcharges: Discount[]
}

export const UserInfoSchema = SchemaFactory.createForClass(UserInfo)
