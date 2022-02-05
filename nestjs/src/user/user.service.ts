import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { User } from 'src/entity/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = plainToClass(User, createUserDto);
    this.usersRepository.create(user);
    await this.usersRepository.save(user);

    return user;
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.usersRepository.find();
    if (!allUsers) {
      throw new NotFoundException('Users not found');
    }

    return allUsers;
  }

  async findOne(id: string): Promise<User> {
    const singleUser = await this.usersRepository.findOne({ id });
    if (!singleUser) {
      throw new NotFoundException('User not found');
    }
    return singleUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    const singleUser = await this.findOne(id);
    if (singleUser) {
      return singleUser;
    }
    throw new NotFoundException('User not found');
  }

  async remove(id: string): Promise<User[]> {
    const singleUser = await this.findOne(id);
    if (singleUser) {
      await this.usersRepository.delete(id);
      return this.findAll();
    }
    throw new NotFoundException('User not found');
  }
}
