import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../typeorm/User';
import { encodePassword } from '../../utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateAvatarDto } from './dto/UpdateAvatar.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserEntity } from './users.entity';
import { paginateResponse } from '../../common/paginate';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const imgUrl = `https://robohash.org/${new Date().getTime()}.png`;
    const createAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const updateAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const user = await this.userRepository.create({
      ...createUserDto,
      password,
      imgUrl,
      createAt,
      updateAt,
    });

    return await this.userRepository.save(user);
  }

  async getAllUsers(queries?: any) {
    const take = queries?.take || 10;
    const page = queries?.page || 1;
    const skip = (page - 1) * take;
    const res = await this.userRepository.findAndCount({
      select: {
        id: true,
        fullName: true,
        email: true,
        imgUrl: true,
        createAt: true,
      },
      order: { createAt: 'DESC' },
      take,
      skip,
    });
    return paginateResponse(res, page, take);
  }

  async findOne(condition: any) {
    return this.userRepository.findOneBy(condition);
  }

  async updateUser(updateUserDto: UpdateUserDto, user: UserEntity) {
    const userId = user.id;
    delete user.id;
    const updateUser = {
      ...user,
      ...updateUserDto,
      updateAt: new Date().toISOString().slice(0, 19),
    };
    return await this.userRepository.update({ id: userId }, { ...updateUser });
  }

  async updateAvatar(updateAvatarDto: UpdateAvatarDto, userId: string) {
    const imgUrl = updateAvatarDto.imgUrl;
    const id = parseInt(userId);

    return await this.userRepository.update({ id }, { imgUrl });
  }
}
