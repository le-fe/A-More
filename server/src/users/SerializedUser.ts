import { Exclude, plainToClassFromExist } from 'class-transformer';

export class SerializedUser {
  id: number;
  username: string;
  email: string;
  imgUrl: string;
  createAt?: Date;
  updateAt?: Date;
  role?: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}

export class SerializedUserList {
  id: number;
  username: string;
  email: string;
  imgUrl: string;

  constructor(partial: Partial<SerializedUserList>) {
    return Object.assign(this, partial);
    //return {
    //  id: 2,
    //  username: 'string',
    //  email: 'string',
    //  imgUrl: 'string',
    //};
  }
}
