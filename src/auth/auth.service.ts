import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'typeorm/entities/user.entity';
import { User as UserType } from 'utils/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validateUserSignIn(user: UserType) {
    const result = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (result) return result;

    const newUser = await this.userRepository.create(user);

    return this.userRepository.save(newUser);
  }

  async findUser(id: number) {
    const user = this.userRepository.findOne({ where: { id } });

    return user;
  }
}
