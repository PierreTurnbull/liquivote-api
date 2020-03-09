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
}