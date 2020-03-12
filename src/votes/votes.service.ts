import { Injectable } from '@nestjs/common';
import { VotesEntity } from './votes.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class VotesService {
  async find(userId: number = null, postId: number = null) {
    const where = {}
    if (userId !== null) { where['userId'] = userId }
    if (postId !== null) { where['postId'] = postId }
    const votes = await getRepository(VotesEntity)
      .find({ where })
    return votes;
  }

  async findOne(id: number) {
    const vote = await getRepository(VotesEntity)
      .findOne(id)
    return vote
  }

  async createOne(vote, user) {
    let voteModel = new VotesEntity();
    voteModel.userId = user.id
    voteModel.postId = vote.postId
    voteModel.value = vote.value
    let persistedVote = await getRepository(VotesEntity)
      .save(voteModel)
    ;
    return persistedVote;
  }

  async updateOne(id, vote) {
    let persistedVote = await this.findOne(id);
    persistedVote.value = vote.value
    return await getRepository(VotesEntity)
      .save(persistedVote)
    ;
  }

  async deleteOne(id) {
    await getRepository(VotesEntity)
      .delete(id)
    ;
    return null;
  }
}