import { Controller, Get, Request, Post, UseGuards, Body, Param, Put } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async find() {
    return this.postsService.find();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() id) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() posts, @Request() req) {
    return this.postsService.create(posts, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateOne(@Param() id, @Body() post, @Request() req) {
    return this.postsService.updateOne(id, post, req.user);
  }
}