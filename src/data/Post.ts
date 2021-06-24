import { User } from './User';
import { Comment } from './Comment';

import { UserService } from 'src/services/UserService/user.service';

import { LoremIpsumGenerator } from './Helpers/LoremIpsumGenerator';
import { Randomizer } from './Helpers/Randomizer';
import { GuidGenerator } from './Helpers/GuidGenerator';
import { FiltersList } from './Helpers/FiltersList';

export class Post {
  constructor(
    private userService: UserService,
    isNewPost?: boolean,
    postContent?: string,
    pictureUrls?: string[],
    filter?: string
  ) {
    this.id = GuidGenerator.guid();
    this.hasLocation = Randomizer.randomIntFromInterval(0, 2) === 1;
    this.location = 'Brisbane, Australia';

    this.author = isNewPost
      ? this.userService.mainUser
      : this.userService.getRandomUser();

    if (isNewPost) {
      this.pictureUrls = pictureUrls;
    } else {
      this.pictureUrls = [];
    }

    if (isNewPost) {
      this.content = postContent;
    } else {
      this.content = LoremIpsumGenerator.getText(
        0,
        Randomizer.randomIntFromInterval(50, 250)
      );
    }

    if (!isNewPost) {
      this.likesCount = Randomizer.randomIntFromInterval(0, 20);
      this.isLiked =
        Randomizer.randomIntFromInterval(0, 1) === 1 && this.likesCount > 0;

      this.isBookmarked = Randomizer.randomIntFromInterval(0, 2) === 0;

      const commentsCount = Randomizer.randomIntFromInterval(0, 5);
      for (let i = 0; i < commentsCount; i++) {
        this.comments.push(new Comment(userService));
      }
    }

    if (isNewPost) {
      this.filter = filter;
    } else {
      const hasFilter = Randomizer.randomIntFromInterval(0, 3) === 0;

      if (hasFilter) {
        this.filter =
          FiltersList.filters[
            Randomizer.randomIntFromInterval(0, FiltersList.filters.length - 1)
          ];
      }
    }
  }

  id: string;
  author: User;
  location: string;
  hasLocation: boolean;
  pictureUrls: string[] = [];
  content: string;
  isLiked: boolean;
  likesCount: number;
  comments: Comment[] = [];
  pictureIndex = 1;
  isBookmarked: boolean;
  filter: string;
}
