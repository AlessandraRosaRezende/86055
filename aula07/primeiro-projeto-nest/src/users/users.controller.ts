import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Request,
  // Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // return this.usersService.create(createUserDto);
    if (
      !createUserDto.first_name ||
      !createUserDto.last_name ||
      !createUserDto.email ||
      !createUserDto.password
    ) {
      throw new HttpException('Incomplete values', HttpStatus.BAD_REQUEST);
    }
    const user = this.usersService.create(createUserDto);
    return { status: 'success', payload: user };
  }

  // @Post('/:id')
  // create(@Request() req: any) {
  //   // return this.usersService.create(createUserDto);
  //   console.log(req.query);
  //   console.log(req.params);
  //   console.log(req.body);
  //   return 'This action adds a new user';
  // }

  @Get()
  findAll() {
    // return this.usersService.findAll();
    const users = this.usersService.findAll();
    return { status: 'success', payload: users };
  }

  // @Get() // http://localhost:3000/users?limit=2
  // findAll(@Query() query) {
  //   const { limit } = query;
  //   console.log(limit);
  //   const users = this.usersService.findAll();
  //   return { status: 'success', payload: users };
  // }

  // @Get() // http://localhost:3000/users?limit=20
  // findAll(@Query('limit') limit) {
  //   console.log(limit);
  //   const users = this.usersService.findAll();
  //   return { status: 'success', payload: users };
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(+id)) {
      throw new HttpException('Invalid param', HttpStatus.BAD_REQUEST);
    }
    const user = this.usersService.findOne(+id);
    return { status: 'success', payload: user };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (isNaN(+id)) {
      throw new HttpException('Invalid param', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (isNaN(+id)) {
      throw new HttpException('Invalid param', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.remove(+id);
  }
}
