import { VotesDTO } from "./votes.dto";

export abstract class VotesFormatter {
  static getFormattedVote (vote): VotesDTO {
    if (!vote) { return null }
    const { id, value } = vote;
    const formattedVote: VotesDTO = {
      id,
      value,
    }
    return formattedVote;
  }
}