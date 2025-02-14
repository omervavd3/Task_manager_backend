import { Body, Controller, Get, HttpCode, Post, UseGuards, Request, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  getUserInfo(@Request() req) {
    return req.user;
  }


}
