import { UsersDTO } from "src/auth/users.dto";
import { VotesDTO } from "src/votes/votes.dto";

export class PostsDTO {
  id: number;
  title: string;
  content: string;
  user: UsersDTO;
  votesSum: number;
  votesCount: number;
  votesYesCount: number;
  votesNoCount: number;
  currentUserVote: VotesDTO;
}