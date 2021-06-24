import {Component, OnInit, Input, ElementRef} from '@angular/core';
import {Router} from '@angular/router';

import {
  ModalController,
  ToastController,
  AlertController,
  LoadingController,
} from '@ionic/angular';

import {AuthService} from 'src/services/AuthService/auth.service';
import {FirestoreService} from 'src/services/FirestoreService/firestore.service';

import {CommentsPage} from '../comments/comments.page';
import {PostEditorPage} from '../post-editor/post-editor.page';

import {VisualPost} from 'src/models/VisualPost';
import {Post} from 'src/models/Post';
import {Discussion} from 'src/models/Discussion';
import {User} from 'src/models/User';
import {Message} from 'src/models/Message';

@Component({
  selector: 'post-buttons',
  templateUrl: './post-buttons.component.html',
  styleUrls: ['./post-buttons.component.scss'],
})
export class PostButtonsComponent implements OnInit {
  @Input() post: VisualPost;
  @Input() card: ElementRef;
  @Input() isProfile: boolean;

  public likeLoaded: boolean = false;
  public favoriteLoaded: boolean = false;
  public isCurrentUserPost: boolean = false;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.checkIfLiked();
    this.checkIfFavorite();
    this.checkIfCurrentUserPost();
  }

  checkIfLiked() {
    this.firestoreService
      .checkIfLikedPost(this.post, this.authService.user)
      .then((isLiked: boolean) => {
        this.post.isLiked = isLiked;
        this.likeLoaded = true;
      });
  }

  checkIfFavorite() {
    this.firestoreService
      .checkIfFavoritePost(this.post, this.authService.user)
      .then((isFavorite: boolean) => {
        this.post.isFavorite = isFavorite;
        this.favoriteLoaded = true;
      });
  }

  checkIfCurrentUserPost() {
    this.isCurrentUserPost = this.post.user.id === this.authService.user.id;
  }

  heartClick() {
    if (!this.likeLoaded) {
      return;
    }

    this.post.isLiked = !this.post.isLiked;

    if (this.post.isLiked) {
      this.post.likesCount++;
      this.firestoreService.likePost(this.post, this.authService.user);
    } else {
      this.post.likesCount--;
      this.firestoreService.unlikePost(this.post, this.authService.user);
    }
  }

  favoriteClick() {
    if (!this.favoriteLoaded) {
      return;
    }

    this.post.isFavorite = !this.post.isFavorite;

    if (this.post.isFavorite) {
      this.presentToast('Post added to your favorites.');

      this.firestoreService.addFavoritePost(
        this.visualPostToPost(this.post),
        this.authService.user
      );
    } else {
      this.presentToast('Post removed from your favorites.');

      this.firestoreService.removeFavoritePost(
        this.visualPostToPost(this.post),
        this.authService.user
      );
    }
  }

  editPost() {
    this.openPostEditorModal();
  }

  deletePost() {
    this.presentAlert(
      'Delete post?',
      'The post will no longer be available.',
      () => {
        this.presentLoading('Deleting post...').then(() => {
          this.firestoreService
            .deletePost(this.post)
            .then(
              () => {
                this.loadingCtrl.dismiss();
                this.presentToast('Post has been deleted.');
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
      }
    );
  }

  async openPostEditorModal() {
    const modal = await this.modalCtrl.create({
      component: PostEditorPage,
      componentProps: {
        user: this.authService.user,
        post: this.post,
      },
    });

    return await modal.present();
  }

  publish() {
    this.presentAlert(
      'Publish post?',
      'The post will now be visible to all users.',
      () => {
        this.setPublishState(true);
      }
    );
  }

  unpublish() {
    this.presentAlert(
      'Unpublish post?',
      'The post will not be publicly visible anymore.',
      () => {
        console.log('setting publish state: ' + false);
        this.setPublishState(false);
      }
    );
  }

  setPublishState(isPublished: boolean) {
    var postCopy = <VisualPost>Object.assign(this.post);
    postCopy.isPublished = isPublished;

    this.firestoreService
      .updatePost(postCopy)
      .then(
        () => {
          this.presentToast(
            isPublished ? 'Post is now published.' : 'Post is unpublished.'
          );
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
  }

  visualPostToPost(visualPost: VisualPost): Post {
    return <Post>{
      id: visualPost.id,
      user: visualPost.user,
      shop: visualPost.shop,
      pictureURLs: visualPost.pictureURLs,
      title: visualPost.title,
      description: visualPost.description,
      priceRange: visualPost.priceRange,
      type: visualPost.type,
      dateCreated: visualPost.dateCreated,
      likesCount: visualPost.likesCount,
    };
  }

  showCommments() {
    this.openCommentsModal();
  }

  async openCommentsModal() {
    const modal = await this.modalCtrl.create({
      component: CommentsPage,
      componentProps: {
        post: this.post,
      },
    });

    return await modal.present();
  }

  showDiscussion() {
    // Check that it's not the current user's post
    if (this.post.user.id === this.authService.user.id) {
      this.presentSimpleAlert(
        'Cannot start discussion.',
        'You cannot start a business discussion on your own post.'
      );
      return;
    }

    // Retrieve any existing discussion if any
    this.presentLoading('Retrieving business discussion...').then(() => {
      this.firestoreService
        .businessDiscussionExists(this.authService.user, this.post)
        .then((discussion: Discussion) => {
          this.loadingCtrl.dismiss();

          // Discussion already exists, navigate to messages
          if (discussion) {
            this.navigateToMessages(discussion);
          }
          // Discussion doesn't exist, create it
          else {
            this.createDiscussion();
          }
        })
        .catch((error) => {
          this.loadingCtrl.dismiss();

          console.log(error);
          this.presentAlert('Error', error.message);
        });
    });
  }

  createDiscussion() {
    this.presentLoading('Creating business discussion...').then(() => {
      var discussion = <Discussion>{
        postId: this.post.id,
        postTitle: this.post.title,
        user1: <User>{
          id: this.authService.user.id,
          name: this.authService.user.name,
          pictureURL: this.authService.user.pictureURL,
          currency: this.authService.user.currency,
          location: this.authService.user.location,
        },
        user2: this.post.user,
        lastMessage: <Message>{},
      };

      this.firestoreService
        .addBusinessDiscussion(this.authService.user, this.post, discussion)
        .then(() => {
          this.loadingCtrl.dismiss();
          this.post.discussionsCount++;

          this.navigateToMessages(discussion);
        })
        .catch((error) => {
          this.loadingCtrl.dismiss();

          console.log(error);
          this.presentAlert('Error', error.message);
        });
    });
  }

  navigateToMessages(discussion: Discussion) {
    this.router.navigate(['/messages', discussion.id]);
  }

  async presentLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      message: message,
      spinner: 'bubbles',
    });

    await loading.present();
  }

  async presentSimpleAlert(header: string, message: string, callback?: any) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlert(header: string, message: string, callback?: any) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          handler: () => {
            if (callback) {
              callback();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      animated: true,
      position: 'bottom',
    });

    toast.present();
  }
}
