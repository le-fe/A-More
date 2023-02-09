import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Texture } from '../../typeorm/Texture';
import { TextureController } from './texture.controller';
import { TextureService } from './texture.service';

@Module({
  imports: [TypeOrmModule.forFeature([Texture])],
  controllers: [TextureController],
  providers: [
    {
      provide: 'POST_CATEGORIES_SERVICE',
      useClass: TextureService,
    },
  ],
})
export class TextureModule {}
