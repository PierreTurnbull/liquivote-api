import { PostsDTO } from "./posts.dto";
import { UsersFormatter } from "src/auth/user.formatter";

export abstract class PostsFormatter {
  static getFormattedPosts (data): PostsDTO[] {
    return data.map((item) => {
      const { id, title, content, user, votes } = item;
      const votesSum = votes.reduce((a, b) => {
        return a + (b.value ? 1 : - 1);
      }, 0)
      const votesYesCount = votes.filter(vote => vote.value).length
      const votesNoCount = votes.filter(vote => !vote.value).length
      const votesCount = votes.length

      const post: PostsDTO = {
        id,
        title,
        content,
        user: UsersFormatter.getFormattedUser(user),
        votesSum,
        votesCount,
        votesYesCount,
        votesNoCount,
      }
      return post;
    })
  }
}