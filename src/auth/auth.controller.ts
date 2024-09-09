import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {

  constructor(private userService: UsersService) {}
  
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Request() req) {
    return this.userService.createUserAndAccount(createUserDto, req);
  }

  @UseGuards(AuthGuard('local')) 
  @Post('login')
  async login(@Request() req) {
    req.session.user = req.user;
    req.session.save();
    return req.user;
  }

  @Post('logout')
  async logout(@Request() req) {
    req.logout();
  }
}