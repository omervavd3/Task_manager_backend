import { Injectable, NestMiddleware, BadRequestException, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CheckUserLoginMiddleware implements NestMiddleware {
  constructor(@Inject('USER_REPOSITORY')
      private userRepository: Repository<User>,) {}

  async use(req: Request, res: Response, next: NextFunction) {
    

    next(); 
  }
}
