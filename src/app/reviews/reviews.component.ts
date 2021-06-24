import {Component, OnInit, Input} from '@angular/core';

import {AlertController, LoadingController} from '@ionic/angular';

import * as moment from 'moment';
import {Subscription} from 'rxjs';

import {FirestoreService} from 'src/services/FirestoreService/firestore.service';
import {AuthService} from 'src/services/AuthService/auth.service';

import {UserDetails} from 'src/models/UserDetails';
import {VisualReview} from 'src/models/VisualReview';
import {Review} from 'src/models/Review';
import {User} from 'src/models/User';

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  @Input() user: UserDetails;

  reviewsSub: Subscription;

  public reviews: VisualReview[] = [];
  public reviewsLoaded: boolean = false;
  public canAddReview: boolean = false;
  private reviewIntervals: any[] = [];

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.reviewsSub = this.firestoreService
      .getReviews(this.user.id)
      .subscribe((reviews) => {
        this.reviews = this.reviewsToVisualReviews(reviews);
        this.reviewsLoaded = true;

        this.canAddReview =
          this.authService.user.id !== this.user.id &&
          reviews.filter(
            (review) => review.user.id === this.authService.user.id
          ).length == 0;
      });
  }

  ngOnDestroy(): void {
    if (this.reviewsSub) {
      this.reviewsSub.unsubscribe();
    }

    // Make sure to clear all review intervals
    this.reviewIntervals.forEach((interval) => {
      if (interval) {
        clearInterval(interval);
      }
    });
  }

  reviewsToVisualReviews(reviews: Review[]): VisualReview[] {
    var visualReviews: VisualReview[] = [];

    reviews.forEach((review) => {
      var visualReview = <VisualReview>Object.assign(review);

      visualReview.timeAgo = this.getTimeAgo(review);

      // Update review time ago every 15 seconds
      var reviewInterval = setInterval(() => {
        visualReview.timeAgo = this.getTimeAgo(review);
      }, 5000);

      this.reviewIntervals.push(reviewInterval);

      visualReviews.push(visualReview);
    });

    return visualReviews;
  }

  getTimeAgo(review: Review) {
    return review.dateCreated
      ? moment(review.dateCreated.toDate()).fromNow()
      : 'Just now';
  }

  addReview() {
    this.presentReviewAlert();
  }

  async presentReviewAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Add a review.',
      inputs: [
        {
          name: 'review',
          id: 'review',
          type: 'textarea',
          placeholder: 'Write a review',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (data) => {
            var review = <Review>{
              user: <User>{
                id: this.authService.user.id,
                name: this.authService.user.name,
                pictureURL: this.authService.user.pictureURL,
              },
              content: data.review,
            };

            this.presentLoading('Adding review...').then(() => {
              this.firestoreService
                .addReview(review, this.user)
                .then(
                  () => {
                    this.loadingCtrl.dismiss();
                  },
                  (error) => {
                    this.loadingCtrl.dismiss();
                    this.presentAlert('Error', error.message);
                  }
                )
                .catch((error) => {
                  this.loadingCtrl.dismiss();
                  this.presentAlert('Error', error.message);
                });
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async presentLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      message: message,
      spinner: 'bubbles',
    });

    await loading.present();
  }

  async presentAlert(header: string, errorMessage: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: errorMessage,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
