import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';

import {IonSlides} from '@ionic/angular';

import {AuthService} from 'src/services/AuthService/auth.service';
import {FirestoreService} from 'src/services/FirestoreService/firestore.service';

import {VisualPost} from 'src/models/VisualPost';

@Component({
  selector: 'post-images-slider',
  templateUrl: './post-images-slider.component.html',
  styleUrls: ['./post-images-slider.component.scss'],
})
export class PostImagesSliderComponent implements OnInit {
  @Input() post: VisualPost;
  @Input() card: ElementRef;

  @ViewChild('slides', {
    read: IonSlides,
    static: true,
  })
  private slides: IonSlides;

  public slideOpts = {
    zoom: false,
  };

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {}

  postDoubleClick() {
    if (!this.post.isLiked) {
      this.post.isLiked = true;
      this.firestoreService.likePost(this.post, this.authService.user);
    }

    if (this.post.pictureURLs.length > 0) {
      this.animateHeart();
    }
  }

  animateHeart() {
    const heartButtons = this.card.nativeElement.getElementsByClassName(
      'heart-button'
    );

    if (heartButtons.length > 0) {
      const heartButton = heartButtons[0] as HTMLElement;

      if (heartButton) {
        heartButton.style.display = 'block';
        heartButton.classList.add('animated');
        heartButton.classList.add('heartBeat');

        setTimeout(() => {
          heartButton.classList.remove('heartBeat');
          heartButton.classList.add('zoomOut');

          setTimeout(() => {
            heartButton.style.display = 'none';
            heartButton.classList.remove('zoomOut');
            heartButton.classList.remove('animated');
          }, 1000);
        }, 1000);
      }
    }
  }

  onSlideChange(post: VisualPost) {
    this.slides.getActiveIndex().then((x) => {
      post.pictureIndex = x + 1;
    });
  }
}
