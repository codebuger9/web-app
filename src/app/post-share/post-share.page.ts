import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NavController} from '@ionic/angular';

import {PostsService} from 'src/services/PostsService/posts.service';
import {Post} from 'src/data/Post';
import {UserService} from 'src/services/UserService/user.service';

@Component({
  selector: 'post-share',
  templateUrl: './post-share.page.html',
  styleUrls: ['./post-share.page.scss'],
})
export class PostSharePage implements OnInit, OnDestroy {
  pictureUrl: string;
  postContent: string;

  routeSub: any;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private postsService: PostsService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.routeSub = this.route.queryParams.subscribe((params) => {
      this.pictureUrl = params.pictureUrl;

      const picture = document.getElementById('picture');
      if (picture) {
        picture.classList.add(params.filter);
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  share() {
    const pictureUrls = [this.pictureUrl];

    const post = new Post(
      this.userService,
      true,
      this.postContent,
      pictureUrls
    );

    this.postsService.addHomePost(post);

    this.navCtrl.navigateRoot('/');
  }
}
