import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { UserInfoController } from '../controllers/userInfo.controller'
import { UserInfoService } from '../services/userInfo.service'
import { UserInfo, UserInfoSchema } from 'src/schemas/user-info.schema'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    MongooseModule.forFeature([
      { name: UserInfo.name, schema: UserInfoSchema }
    ])
  ],

  controllers: [UserInfoController],
  providers: [UserInfoService]
})
export class AppModule {}
