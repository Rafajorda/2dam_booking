import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
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

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    try {
      return this.userService.getUserById(Number(id));
    } catch (error) {
      throw new Error('Failed to retrieve user by ID');
    }
  }
  
  @Post('user')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.updateUser(Number(id), updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(Number(id));
  }
}
