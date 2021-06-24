import { Injectable } from '@angular/core';

import { UserService } from '../UserService/user.service';

import { Post } from 'src/data/Post';

import { Shuffler } from 'src/data/Helpers/Shuffler';
import { Dictionary } from 'src/data/Helpers/Dictionary';
import { Randomizer } from 'src/data/Helpers/Randomizer';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  postsDictionary = new Dictionary<Post>();
  homePosts: Post[] = [];

  constructor(private userService: UserService) {
    this.initialisePosts();
  }

  initialisePosts() {
    for (let i = 1; i <= 20; i++) {
      const post = new Post(this.userService);

      const pictureCount = Randomizer.randomIntFromInterval(1, 3);

      for (let j = 0; j < pictureCount; j++) {
        post.pictureUrls.push(
          'assets/images/posts/image ' +
            Randomizer.randomIntFromInterval(1, 40) +
            '.jpeg'
        );
      }

      this.postsDictionary.Add(post.id, post);
    }
  }

  initialiseHomePosts() {
    this.homePosts = this.getRandomPosts(10);
  }

  getPost(postId: string) {
    if (this.postsDictionary.ContainsKey(postId)) {
      return this.postsDictionary.Item(postId);
    }

    return null;
  }

  getRandomPosts(postsCount: number): Post[] {
    return Shuffler.shuffle(this.postsDictionary.Values().slice()).splice(
      0,
      postsCount
    );
  }

  getRandomPost(): Post {
    return this.postsDictionary.Values().slice()[
      Randomizer.randomIntFromInterval(0, 19)
    ];
  }

  addHomePost(post: Post) {
    this.homePosts.unshift(post);
  }
}
