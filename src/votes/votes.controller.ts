import { Controller, Get, Request, Post, UseGuards, Body, Param, Put, ForbiddenException, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VotesService } from './votes.service';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async find() {
    return this.votesService.find();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body, @Request() req) {
    return this.votesService.createOne(body, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateOne(@Param() id, @Body() post, @Request() req) {
    const persistedVote = await this.votesService.findOne(id);
    if (persistedVote.userId !== req.user.id) {
      throw new ForbiddenException()
    }
    return this.votesService.updateOne(id, post);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOne(@Param() id, @Request() req) {
    const persistedVote = await this.votesService.findOne(id);
    if (persistedVote.userId !== req.user.id) {
      throw new ForbiddenException()
    }
    return this.votesService.deleteOne(id);
  }
}