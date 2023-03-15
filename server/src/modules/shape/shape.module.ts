import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shape } from '../../typeorm/Shape';
import { ShapeController } from './shape.controller';
import { ShapeService } from './shape.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shape])],
  controllers: [ShapeController],
  providers: [
    {
      provide: 'SHAPE_SERVICE',
      useClass: ShapeService,
    },
  ],
})
export class ShapeModule {}
