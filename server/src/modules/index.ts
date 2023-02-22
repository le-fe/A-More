import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FileModule } from './file/file.module';
import { PostCategoriesModule } from './post-categories/post-categories.module';
import { TextureModule } from './texture/texture.module';
import { BoardModule } from './board/board.module';
import { ElementModule } from './element/element.module';
import { BoardElementModule } from './board-elements/board-elements.module';

const modules = [
  AuthModule,
  UsersModule,
  FileModule,
  PostCategoriesModule,
  TextureModule,
  BoardModule,
  ElementModule,
  BoardElementModule,
];
export default modules;
