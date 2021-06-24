import {Component, OnInit} from '@angular/core';

import {PostNavigatorService} from 'src/services/PostNavigatorService/postNavigator.service';

import {Post} from 'src/models/Post';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.page.html',
  styleUrls: ['./post-container.page.scss'],
})
export class PostContainerPage implements OnInit {
  public post: Post;

  constructor(private postNavigatorService: PostNavigatorService) {}

  ngOnInit() {
    this.post = this.postNavigatorService.getPost();
  }
}
