import { Body, Injectable, Logger, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @Post('register')
  async register(@Body() registerUser: RegisterUserDto) {
    console.log('registerUser: ', registerUser);
    return 'hello registerUser';
  }
}
