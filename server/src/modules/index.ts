import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FileModule } from './file/file.module';
import { TextureModule } from './texture/texture.module';
import { ShapeModule } from './shape/shape.module';
import { BoardModule } from './board/board.module';
import { ElementModule } from './element/element.module';
import { BoardElementModule } from './board-elements/board-elements.module';

const modules = [
  AuthModule,
  UsersModule,
  FileModule,
  TextureModule,
  ShapeModule,
  BoardModule,
  ElementModule,
  BoardElementModule,
];
export default modules;
