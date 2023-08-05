import { Module } from '@nestjs/common'

import { AuthModule } from './users/auth/auth.module'

@Module({
	imports: [AuthModule],
})
export class AppModule {}
