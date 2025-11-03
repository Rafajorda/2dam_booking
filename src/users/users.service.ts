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

  async getUserById(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    return user;
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

  async updateUser(id: number, updateUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, updateUserDto);
    
    if (updateUserDto.password) {
      user.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    user.updatedAt = new Date();
    await this.usersRepository.save(user);
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('User not found');
    }
  }


}
