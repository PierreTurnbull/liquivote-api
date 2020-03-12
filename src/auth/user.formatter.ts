import { UsersDTO } from "./users.dto";

export abstract class UsersFormatter {
  static getFormattedUser (data): UsersDTO {
    const { id, username } = data;

    return {
      id,
      username
    }
  }
}