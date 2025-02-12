import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  private id = 4;
  private users = [
    {
      id: 1,
      name: 'John',
      email: 'john@email.com',
    },
    {
      id: 2,
      name: 'Jane',
      email: 'jane@email.com',
    },
    {
      id: 3,
      name: 'Doe',
      email: 'doe@email.com',
    },
  ];
  async getAll(name?: string) {
    if (name) {
      const userByName = await this.userRepository.find({ where: { name } });
      if (userByName.length > 0) {
        return userByName;
      } else {
        throw new NotFoundException('Name not found');
      }
    } else {
      return await this.userRepository.find();
    }
  }

  async getOne(id: string) {
    return await this.userRepository.findOne({ where: { id: +id } });
  }

  async register(user: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    return await this.userRepository.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return 'Login successful';
      } else {
        throw new NotFoundException('Invalid credentials');
      }
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async updateOne(id: string, updateUser: UpdateUserDto) {
    const userToUpdate = await this.userRepository.findOne({
      where: { id: +id },
    });
    if (userToUpdate) {
      await this.userRepository.update({ id: +id }, updateUser);
      const newUpdateUser = await this.userRepository.findOne({
        where: { id: +id },
      });
      return `User ${newUpdateUser?.name} updated`;
    } else {
      throw new NotFoundException('User not found for update');
    }
  }

  async deleteOne(id: string) {
    const userToDelete = await this.userRepository.findOne({
      where: { id: +id },
    });
    if (userToDelete) {
      const name = userToDelete.name;
      await this.userRepository.delete({ id: +id });
      return `User ${name} deleted`;
    } else {
      throw new NotFoundException('User not found for delete');
    }
  }
}
