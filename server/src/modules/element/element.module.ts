import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element } from '../../typeorm/Element';
import { ElementController } from './element.controller';
import { ElementService } from './element.service';

@Module({
  imports: [TypeOrmModule.forFeature([Element])],
  controllers: [ElementController],
  providers: [
    {
      provide: 'ELEMENTS_SERVICE',
      useClass: ElementService,
    },
  ],
})
export class ElementModule {}
