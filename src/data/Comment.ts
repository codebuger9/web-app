import { User } from './User';

import { UserService } from 'src/services/UserService/user.service';

import { LoremIpsumGenerator } from './Helpers/LoremIpsumGenerator';
import { Randomizer } from './Helpers/Randomizer';

export class Comment {
  constructor(
    private userService: UserService,
    private isMainUser?: boolean,
    private commentContent?: string
  ) {
    this.author = this.isMainUser
      ? this.userService.mainUser
      : this.userService.getRandomUser();

    this.content = this.isMainUser
      ? this.commentContent
      : LoremIpsumGenerator.getText(
          0,
          Randomizer.randomIntFromInterval(20, 200)
        );
    this.isLiked = Randomizer.randomIntFromInterval(0, 5) === 1;
  }

  author: User;
  content: string;
  isLiked: boolean;
}
