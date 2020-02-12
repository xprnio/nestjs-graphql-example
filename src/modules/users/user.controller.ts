import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Get()
  async getAllUsers() {
    const users = await this.userService.findAll();

    return { users };
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { user };
  }
}
