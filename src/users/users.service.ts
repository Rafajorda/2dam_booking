import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

 getHello(): string {
    return 'Hello form Users Service!';
  }

}
