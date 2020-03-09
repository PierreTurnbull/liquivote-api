import { Injectable } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { getRepository } from 'typeorm';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  async findOne(username: string): Promise<User | undefined> {
    const user = await getRepository(UsersEntity)
      .findOne({ username })
    ;
    return user;
  }

  async createOne(username: string, hashedPassword: string) {
    const user = new UsersEntity();
    user.username = username;
    user.hashedPassword = hashedPassword;
    const result = await getRepository(UsersEntity)
      .insert(user)
    ;
    return result;
  }
}