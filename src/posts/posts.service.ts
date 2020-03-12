import { Injectable } from '@nestjs/common';
import { PostsEntity } from './posts.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class PostsService {
  async find() {
    const posts = await getRepository(PostsEntity)
      .find({ relations: ['user', 'votes'] })
    ;
    return posts;
  }

  async findOne(id: number) {
    const post = await getRepository(PostsEntity)
      .findOne(id, { relations: ['user', 'votes'] })
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
    let persistedPost = await this.findOne(id)
    persistedPost.title = post.title
    persistedPost.content = post.content
    return await getRepository(PostsEntity)
      .save(persistedPost)
    ;
  }
}