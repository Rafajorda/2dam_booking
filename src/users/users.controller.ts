import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

 @Get()
 
  @Get('users')
   async getUsers(): Promise<User[]> {

    const result = await this.userService.getUsers();
    if (Array.isArray(result)) {
      return result;
    } else {
      throw new Error('Failed to retrieve users');
    }
  }
  
  @Post('user')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
