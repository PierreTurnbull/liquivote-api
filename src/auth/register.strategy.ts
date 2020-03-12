import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcrypt');

@Injectable()
export class RegisterStrategy extends PassportStrategy(Strategy, 'register') {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async validate(req: any) {
    const { username, password } = req.body;
    // request body must be valid
    if (!username || !password) { throw new BadRequestException() }

    const user = await this.usersService.findOne(username);
    // user must not already exist
    if (user) { throw new ConflictException() }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await this.usersService.createOne(username, hashedPassword);
    return result
  }
}