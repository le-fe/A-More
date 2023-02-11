import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Texture } from 'src/typeorm/Texture';
import { Board } from '../../typeorm/Board';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Texture])],
  controllers: [BoardController],
  providers: [
    {
      provide: 'BOARD_SERVICE',
      useClass: BoardService,
    },
  ],
})
export class BoardModule {}
