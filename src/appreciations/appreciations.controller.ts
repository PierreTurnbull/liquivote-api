import { Controller, Get, Request, Post, UseGuards, Body, Param, Put, ForbiddenException, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AppreciationsService } from './appreciations.service';

@Controller('appreciations')
export class AppreciationsController {
  constructor(private readonly appreciationsService: AppreciationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async find() {
    return this.appreciationsService.find();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() appreciations, @Request() req) {
    return this.appreciationsService.create(appreciations, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateOne(@Param() id, @Body() post, @Request() req) {
    const persistedAppreciation = await this.appreciationsService.findOne(id);
    if (persistedAppreciation.userId !== req.user.id) {
      throw new ForbiddenException()
    }
    return this.appreciationsService.updateOne(id, post);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOne(@Param() id, @Request() req) {
    const persistedAppreciation = await this.appreciationsService.findOne(id);
    if (persistedAppreciation.userId !== req.user.id) {
      throw new ForbiddenException()
    }
    return this.appreciationsService.deleteOne(id);
  }
}