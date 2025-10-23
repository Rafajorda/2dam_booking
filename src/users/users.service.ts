import { Injectable } from '@nestjs/common';
import { User, UserRole } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
 
   constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

   async createUser(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create({
      ...createUserDto, role: UserRole.USER,
      status: 'active',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    user.password = await bcrypt.hash(await createUserDto.password, 10);
    this.usersRepository.save(user);
    return user;

  }


}
