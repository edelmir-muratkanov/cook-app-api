import { Module } from '@nestjs/common'

import { CommentModule } from './feedback/comment/comment.module'
import { RatingModule } from './feedback/rating/rating.module'
import { AuthModule } from './users/auth/auth.module'
import { UserModule } from './users/user/user.module'

@Module({
	imports: [AuthModule, UserModule, RatingModule, CommentModule],
})
export class AppModule {}
