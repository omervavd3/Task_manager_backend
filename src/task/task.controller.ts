import { Controller, Param, Post, Get, Query, Body, ValidationPipe, Patch, Delete, HttpCode } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get() //Get /task or /task?userId=1234
    @HttpCode(200)
    @ApiQuery({ name: 'userId', required: false, description: 'Filter task by userId' })
    @ApiOkResponse({ description: 'Get all tasks, with filter if added' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiNotFoundResponse({ description: 'Task not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    getAll(@Query('userId') userId?: string) {
        return this.taskService.getAll(userId)
    }

    @Get(':id') //Get task by id /task/:id
    @HttpCode(200)
    @ApiOkResponse({ description: 'Get a task by id' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiNotFoundResponse({ description: 'Task not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    getOne(@Param('id') id: string) {
        return this.taskService.getOne(id)
    }

    @Post() //Create task /task
    @HttpCode(201)
    @ApiCreatedResponse({ description: 'Create a task' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiNotFoundResponse({ description: 'Task not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    create(@Body(ValidationPipe) task: CreateTaskDto) {
        return this.taskService.create(task)
    }

    @Patch(':id') //Update task by id /task/:id
    @HttpCode(200)
    @ApiOkResponse({ description: 'Update a task by id' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiNotFoundResponse({ description: 'Task not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    updateOne(@Param('id') id: string, @Body(ValidationPipe) task: UpdateTaskDto) {
        return this.taskService.updateOne(id, task)
    }

    @Delete(':id') //Delete task by id /task/:id
    @HttpCode(200)
    @ApiOkResponse({ description: 'Delete a task by id' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiNotFoundResponse({ description: 'Task not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    deleteOne(@Param('id') id: string) {
        return this.taskService.deleteOne(id)
    }
}


