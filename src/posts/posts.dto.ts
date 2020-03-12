import { UsersDTO } from "src/auth/users.dto";

export class PostsDTO {
  id: number;
  title: string;
  content: string;
  user: UsersDTO;
  votesSum: number;
  votesCount: number;
  votesYesCount: number;
  votesNoCount: number;
}