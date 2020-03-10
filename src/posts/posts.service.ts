import { Injectable } from '@nestjs/common';
import { PostsEntity } from './posts.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class PostsService {
  async find() {
    const posts = await getRepository(PostsEntity)
      .find()
    ;
    return posts;
  }

  async findOne(id: number) {
    const post = await getRepository(PostsEntity)
      .findOne(id)
    ;
    return post;
  }

  async create(posts, user) {
    let postsModel: PostsEntity[] = posts.map(post => {
      let postModel = new PostsEntity();
      postModel.title = post.title
      postModel.content = post.content
      postModel.user = user
      return postModel
    })
    const result = await getRepository(PostsEntity)
      .save(postsModel)
    ;
    return result;
  }

  async updateOne(id, post, user) {
    let postModel = new PostsEntity();
    postModel.title = post.title
    postModel.content = post.content
    await getRepository(PostsEntity)
      .update(id, postModel)
    ;
    return null;
  }
}