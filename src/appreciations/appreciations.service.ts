import { Injectable } from '@nestjs/common';
import { AppreciationsEntity } from './appreciations.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class AppreciationsService {
  async find() {
    const appreciations = await getRepository(AppreciationsEntity)
      .find()
    ;
    return appreciations;
  }

  async findOne(id: number) {
    const appreciation = await getRepository(AppreciationsEntity)
      .findOne(id)
    ;
    return appreciation;
  }

  async create(appreciations, user) {
    let appreciationsModel: AppreciationsEntity[] = appreciations.map(appreciation => {
      let appreciationModel = new AppreciationsEntity();
      appreciationModel.userId = user.id
      appreciationModel.postId = appreciation.postId
      appreciationModel.value = appreciation.value
      return appreciationModel
    })
    await getRepository(AppreciationsEntity)
      .insert(appreciationsModel)
    ;
    return null;
  }

  async updateOne(id, appreciation) {
    let appreciationModel = new AppreciationsEntity();
    appreciationModel.value = appreciation.value
    await getRepository(AppreciationsEntity)
      .update(id, appreciationModel)
    ;
    return null;
  }

  async deleteOne(id) {
    await getRepository(AppreciationsEntity)
      .delete(id)
    ;
    return null;
  }
}