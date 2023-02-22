import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../../typeorm/Board';
import { Element } from '../../typeorm/Element';
import { BoardElementItem } from '../../typeorm/BoardElementItem';
import { BoardElementController } from './board-elements.controller';
import { BoardElementService } from './board-elements.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardElementItem, Board, Element])],
  controllers: [BoardElementController],
  providers: [
    {
      provide: 'BOARD_ELEMENT_SERVICE',
      useClass: BoardElementService,
    },
  ],
})
export class BoardElementModule {}
