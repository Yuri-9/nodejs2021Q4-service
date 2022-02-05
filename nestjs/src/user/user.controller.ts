import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entity/user';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const newUser = await this.usersService.create(createUserDto);
    const singleUser = await this.usersService.findOne(newUser.id);
    return new CreateUserDto(singleUser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  async findAll(): Promise<CreateUserDto[]> {
    const allUsers = await this.usersService.findAll();

    return allUsers.map((u) => new CreateUserDto(u));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':userId')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: User })
  async findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    const singleUser = await this.usersService.findOne(userId);
    return new CreateUserDto(singleUser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':userId')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  @ApiBody({ type: CreateUserDto })
  async update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.update(userId, updateUserDto);
    const singleUser = await this.usersService.findOne(userId);

    return new CreateUserDto(singleUser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 204 })
  async remove(@Param('userId', ParseUUIDPipe) userId: string) {
    await this.usersService.remove(userId);
    const allUsers = await this.usersService.findAll();

    return allUsers.map((u) => new CreateUserDto(u));
  }
}
