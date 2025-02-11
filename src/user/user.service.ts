import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
    private id = 4
    private users = [
        {
            "id": 1,
            "name": "John",
            "email": "john@email.com",
            "role": "INTERN"
        },
        {
            "id": 2,
            "name": "Jane",
            "email": "jane@email.com",
            "role": "INTERN"
        },
        {
            "id": 3,
            "name": "Doe",
            "email": "doe@email.com",
            "role": "ADMIN"
        }
    ]
    getAll(role?: string) {
        if(role) {
            const roleUsers = this.users.filter(user => user.role === role)
            if(roleUsers.length > 0) {
                return roleUsers
            } else {
                throw new NotFoundException("Role not found")
            }
        } else {
            return this.users
        }
    }

    getOne(id: string) {
        return this.users.find(user => user.id === +id)
    }

    create(user: CreateUserDto) {
        const newUser = {
            id: this.id++,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }

    updateOne(id: string, updateUser: UpdateUserDto) {
        const index = this.users.findIndex(user => user.id === +id)
        if(index > -1) {
            this.users[index] = {
                ...this.users[index],
                ...updateUser
            }
            return this.users[index]
        } else {
            throw new NotFoundException("User not found for update")
        }
    }

    deleteOne(id: string) {
        const index = this.users.findIndex(user => user.id === +id)
        if(index > -1) {
            const deletedUser = this.users[index]
            this.users = this.users.filter(user => user.id !== +id)
            return `User ${deletedUser.name} deleted`
        } else {
            throw new NotFoundException("User not found for delete")
        }
    }
}
