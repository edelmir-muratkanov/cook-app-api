import { Module } from '@nestjs/common'

import { CommentModule } from './comment/comment.module'
import { RatingModule } from './rating/rating.module'

@Module({
	imports: [RatingModule, CommentModule],
})
export class FeedbackModule {}
