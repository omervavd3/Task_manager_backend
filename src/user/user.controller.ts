import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get() //Get /user or /user?name=John
    getAll(@Query('role') role: string) {
        return this.userService.getAll(role)
    }

    @Get(':id') //Get user by id /user/:id
    getOne(@Param('id') id: string) {
        return this.userService.getOne(id)
    }

    @Post() //Create user /user
    create(@Body(ValidationPipe) user: CreateUserDto) {
        return this.userService.create(user)
    }

    @Patch(':id') //Update user by id /user/:id
    updateOne(@Param('id') id: string, @Body(ValidationPipe) updateUser: UpdateUserDto) {
        return this.userService.updateOne(id, updateUser)
    }

    @Delete(':id') //Delete user by id /user/:id
    deleteOne(@Param('id') id: string) {
        return this.userService.deleteOne(id)
    }
}
