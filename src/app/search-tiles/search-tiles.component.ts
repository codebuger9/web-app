import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from 'src/data/Post';

import { PostsService } from 'src/services/PostsService/posts.service';

@Component({
  selector: 'app-search-tiles',
  templateUrl: './search-tiles.component.html',
  styleUrls: ['./search-tiles.component.scss']
})
export class SearchTilesComponent implements OnInit {
  @Input() leftAlign = false;

  posts: Post[] = [];

  constructor(private router: Router, private postsService: PostsService) {}

  ngOnInit() {
    this.initialisePosts();
  }

  initialisePosts() {
    this.posts = this.postsService.getRandomPosts(9);
  }

  goToPost(post: Post) {
    this.router.navigate(['/post-container', post.id]);
  }
}
