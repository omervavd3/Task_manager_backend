import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Update } from '@reduxjs/toolkit';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
    constructor(
            @Inject('TASK_REPOSITORY')
            private taskRepository: Repository<Task>,
        ) {}

    async getAll(userId?: string) {
        if(userId) {
            const userById = await this.taskRepository.find({ where: { userId } })
            if(userById.length > 0) {
                return userById
            } else {
                throw new NotFoundException("User not found")
            }
        } else {
            return await this.taskRepository.find()
        }
    }

    async getOne(id: string) {
        const task = await this.taskRepository.findOne({ where: { id: +id } })
        if(task) {
            return task
        } else {
            throw new NotFoundException("Task not found by ID")
        }
    }

    async create(task: CreateTaskDto) {
        return await this.taskRepository.save(task)
    }

    async updateOne(id: string, task: UpdateTaskDto) {
        const taskToUpdate = await this.taskRepository.findOne({ where: { id: +id } })
        if(taskToUpdate) {
            await this.taskRepository.update({ id: +id }, task)
            return `Task updated`
        } else {
            throw new NotFoundException("Task not found for update")
        }
    }

    async deleteOne(id: string) {
        const taskToDelete = await this.taskRepository.findOne({ where: { id: +id } })
        if(taskToDelete) {
            await this.taskRepository.delete({ id: +id })
            return `Task deleted`
        } else {
            throw new NotFoundException("Task not found for delete")
        }
    }

}



