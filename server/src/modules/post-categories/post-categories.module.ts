import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostCategory } from '../../typeorm/PostCategory';
import { PostCategoriesController } from './post-categories.controller';
import { PostCategoriesService } from './post-categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostCategory])],
  controllers: [PostCategoriesController],
  providers: [
    {
      provide: 'POST_CATEGORIES_SERVICE',
      useClass: PostCategoriesService,
    },
  ],
})
export class PostCategoriesModule {}
