export enum UserInfoField {
  AGENTS_DISCOUNT = 'agentsDiscount',
  COMMERCIAL_DISCOUNT = 'commercialDiscount',
  STRONG_CAR_DISCOUNT = 'strongCarDiscount',
  SUMMER_DISCOUNT = 'summerDiscount',

  BONUS_PROTECTION = 'bonusProtection',
  AO_PLUS = 'aoPlus',
  GLASS_COVERAGE = 'glassCoverage',

  BIRTHDAY = 'birthday',
  CITY = 'city',
  NAME = 'name',
  VEHICLE_POWER = 'vehiclePower',

  PRICE_MATCH = 'priceMatch',
  VOUCHER = 'voucher',
}

export interface UserInfoFormBody {
  [UserInfoField.NAME]: string
  [UserInfoField.BIRTHDAY]: string
  [UserInfoField.CITY]: string
  [UserInfoField.VEHICLE_POWER]: number
  [UserInfoField.VOUCHER]?: number
  [UserInfoField.PRICE_MATCH]?: number

  [UserInfoField.STRONG_CAR_DISCOUNT]: boolean
  [UserInfoField.AGENTS_DISCOUNT]: boolean
  [UserInfoField.COMMERCIAL_DISCOUNT]: boolean
  [UserInfoField.SUMMER_DISCOUNT]: boolean

  [UserInfoField.AO_PLUS]: boolean
  [UserInfoField.GLASS_COVERAGE]: boolean
  [UserInfoField.BONUS_PROTECTION]: boolean
}

export interface PriceDescription {
  totalPrice: number
  discountAndSurcharges: number[]
  coverages: number[]
}
