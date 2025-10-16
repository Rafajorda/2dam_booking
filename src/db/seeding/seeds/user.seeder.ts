// src/database/seeders/user/user.seeder.ts

import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import userData from '../../../data/users';
import { User } from '../../../users/user.entity';
import * as bcrypt from 'bcrypt';

export class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const userRepository = dataSource.getRepository(User);

    const userEntries = await Promise.all(
      userData.map(async (item) => {
        const user = new User();
        user.firstName = item.firstName;
        user.lastName = item.lastName;
        user.username = item.username;
        user.email = item.email;
        user.role = item.role;
        user.address = item.address;
        user.password = await bcrypt.hash(item.password, 10);

        return user;
      }),
    );

    await userRepository.save(userEntries);

    console.log('✅ Users seeding completed!');
  }
}
