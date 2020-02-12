import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { User } from './user.model';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  findAll() {
    return this.userRepository.find({
      relations: [ 'teams' ],
    });
  }

  findById(id: number) {
    return this.userRepository.findOne({ id }, {
      relations: [ 'teams' ],
    });
  }

  findByIds(ids: number[]) {
    return this.userRepository.find({
      where: { id: In(ids) },
      relations: [ 'teams' ],
    });
  }

}
