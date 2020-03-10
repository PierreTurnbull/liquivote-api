import { Injectable } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class UsersService {
  async findOne(username: string) {
    const user = await getRepository(UsersEntity)
      .findOne({ username })
    ;
    return user;
  }

  async createOne(username: string, hashedPassword: string) {
    const userModel = new UsersEntity();
    userModel.username = username;
    userModel.hashedPassword = hashedPassword;
    const result = await getRepository(UsersEntity)
      .insert(userModel)
    ;
    return result;
  }
}