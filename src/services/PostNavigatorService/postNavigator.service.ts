import {Injectable} from '@angular/core';

import {Post} from 'src/models/Post';

@Injectable({
  providedIn: 'root',
})
export class PostNavigatorService {
  private post: Post;

  constructor() {}

  setPost(post: Post) {
    this.post = post;
  }

  getPost(): Post {
    return this.post;
  }
}
