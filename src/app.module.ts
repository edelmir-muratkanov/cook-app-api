import { Module } from '@nestjs/common'

import { RatingModule } from './feedback/rating/rating.module'
import { AuthModule } from './users/auth/auth.module'
import { UserModule } from './users/user/user.module'

@Module({
	imports: [AuthModule, UserModule, RatingModule],
})
export class AppModule {}
