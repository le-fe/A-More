import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FileModule } from './file/file.module';
import { PostCategoriesModule } from './post-categories/post-categories.module';

const modules = [AuthModule, UsersModule, FileModule, PostCategoriesModule];
export default modules;
