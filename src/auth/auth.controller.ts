import { Body, Controller, Get, HttpCode, Post, UseGuards, Request, Delete, Query, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  getAccess(@Request() req, @Param() userId) {
    return this.authService.getAccess(req.user, userId.id);
  }

  @UseGuards(AuthGuard)
  @Get()
  isLoggedIn(@Request() req) {
    return this.authService.isLoggedIn(req.user);
  }

}
