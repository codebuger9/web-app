import { UserService } from 'src/services/UserService/user.service';
import { PostsService } from 'src/services/PostsService/posts.service';

import { NotificationType } from './NotificationType';
import { User } from './User';
import { Post } from './Post';
import { Comment } from './Comment';

import { Randomizer } from './Helpers/Randomizer';
import { GuidGenerator } from './Helpers/GuidGenerator';

export class Notification {
  constructor(
    private userService: UserService,
    private postsService: PostsService
  ) {
    this.id = GuidGenerator.guid();
    this.notificationType = <NotificationType>(
      Randomizer.randomIntFromInterval(0, 2)
    );

    switch (this.notificationType) {
      case NotificationType.Like:
        {
          this.userLikes = this.userService.getRandomUsers(
            Randomizer.randomIntFromInterval(1, 10)
          );
          this.avatar = this.userLikes[0].pictureUrl;
          this.post = this.postsService.getRandomPost();
        }
        break;

      case NotificationType.Comment:
        {
          this.commentUser = this.userService.getRandomUser();
          this.post = this.postsService.getRandomPost();
          this.comment = new Comment(this.userService);
          this.avatar = this.commentUser.pictureUrl;
        }
        break;

      case NotificationType.Follow:
        {
          this.follower = this.userService.getRandomUser();
          this.avatar = this.follower.pictureUrl;
        }
        break;
    }
  }

  id: string;
  post: Post;
  notificationType: NotificationType;
  avatar: string;

  // Like
  userLikes: User[] = [];

  // Comment
  commentUser: User;
  comment: Comment;

  // Follow
  follower: User;
}
