import { Controller, Get, Request, Post, UseGuards, Body, Param, Put, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostsService } from './posts.service';
import { PostsDTO } from './posts.dto';
import { PostsFormatter } from './posts.formatter';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(@Request() request): Promise<PostsDTO[]> {
    const data = await this.postsService.find();
    return PostsFormatter.getFormattedPosts(data, request.user.id);
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
    const persistedPost = await this.postsService.findOne(id);
    if (persistedPost.userId !== req.user.id) {
      throw new ForbiddenException()
    }
    return this.postsService.updateOne(id, post, req.user);
  }
}