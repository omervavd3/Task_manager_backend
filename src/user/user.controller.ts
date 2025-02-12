import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get() //Get /user or /user?name=John
    @HttpCode(200)
    @ApiQuery({ name: 'name', required: false, description: 'Filter users by name' })
    @ApiOkResponse({ description: 'Get all users, with filter if added' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    getAll(@Query('name') name?: string) {
        return this.userService.getAll(name)
    }

    @Get(':id') //Get user by id /user/:id
    @HttpCode(200)
    @ApiOkResponse({ description: 'Get a user by id' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    getOne(@Param('id') id: string) {
        return this.userService.getOne(id)
    }

    @Post('/register') //Register user /user/register
    @HttpCode(201)
    @ApiCreatedResponse({ description: 'Register a user' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    register(@Body(ValidationPipe) user: CreateUserDto) {
        return this.userService.register(user)
    }

    @Post('/login') //Login user /user/login
    @HttpCode(200)
    @ApiOkResponse({ description: 'Login a user' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    login(@Body('email') email: string, @Body('password') password: string) {
        return this.userService.login(email, password)
    }

    @Patch(':id') //Update user by id /user/:id
    @HttpCode(200)
    @ApiOkResponse({ description: 'Update a user by id' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    updateOne(@Param('id') id: string, @Body(ValidationPipe) updateUser: UpdateUserDto) {
        return this.userService.updateOne(id, updateUser)
    }

    @Delete(':id') //Delete user by id /user/:id
    @HttpCode(200)
    @ApiOkResponse({ description: 'Delete a user by id' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    deleteOne(@Param('id') id: string) {
        return this.userService.deleteOne(id)
    }
}

