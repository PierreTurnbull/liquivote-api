import { Injectable } from '@nestjs/common';
import { VotesEntity } from './votes.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class VotesService {
  async find() {
    const votes = await getRepository(VotesEntity)
      .find()
    ;
    return votes;
  }

  async findOne(id: number) {
    const vote = await getRepository(VotesEntity)
      .findOne(id)
    ;
    return vote;
  }

  async create(votes, user) {
    let votesModel: VotesEntity[] = votes.map(vote => {
      let voteModel = new VotesEntity();
      voteModel.userId = user.id
      voteModel.postId = vote.postId
      voteModel.value = vote.value
      return voteModel
    })
    await getRepository(VotesEntity)
      .insert(votesModel)
    ;
    return null;
  }

  async updateOne(id, vote) {
    let voteModel = new VotesEntity();
    voteModel.value = vote.value
    await getRepository(VotesEntity)
      .update(id, voteModel)
    ;
    return null;
  }

  async deleteOne(id) {
    await getRepository(VotesEntity)
      .delete(id)
    ;
    return null;
  }
}