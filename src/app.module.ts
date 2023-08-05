import { Module } from '@nestjs/common'

import { AuthModule } from './users/auth/auth.module'
import { UserModule } from './users/user/user.module'

@Module({
	imports: [AuthModule, UserModule],
})
export class AppModule {}
