import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {LoadingController, AlertController, IonContent} from '@ionic/angular';

import * as moment from 'moment';

import {AuthService} from 'src/services/AuthService/auth.service';
import {FirestoreService} from 'src/services/FirestoreService/firestore.service';

import {Message} from 'src/models/Message';
import {VisualMessage} from 'src/models/VisualMessage';
import {User} from 'src/models/User';
import {Discussion} from 'src/models/Discussion';
import {Post} from 'src/models/Post';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  @ViewChild('content', {
    read: IonContent,
    static: true,
  })
  private content: IonContent;

  private routeSub: any;
  private discussionSub: any;
  private messagesSubscription: any;

  private discussion: Discussion;
  private showLoading: boolean = false;

  public post: Post;
  public messages: Message[] = [];
  public messagesLoaded = false;
  public messageContent = '';
  public sendingMessage = false;

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      var discussionId = params['id'];

      this.presentLoading('Loading messages...').then(() => {
        this.showLoading = true;

        this.discussionSub = this.firestoreService
          .getBusinessDiscussion(this.authService.user.id, discussionId)
          .subscribe(
            (discussion: Discussion) => {
              this.discussion = discussion;

              this.getMessages();
              this.getPost();
            },
            (error) => {
              this.showLoading = false;
              this.loadingCtrl.dismiss();

              this.presentAlert('Error', error.message);
            }
          );
      });
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }

    if (this.discussionSub) {
      this.discussionSub.unsubscribe();
    }

    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }

  getMessages() {
    if (!this.messagesLoaded) {
      this.messagesSubscription = this.firestoreService
        .getMessages(this.discussion.id)
        .subscribe((messages: Message[]) => {
          this.messages = this.messageToVisualMessages(messages);
          this.messagesLoaded = true;

          setTimeout(() => {
            this.content.scrollToBottom();
          }, 100);

          this.setDiscussionAsRead();

          if (this.showLoading) {
            this.loadingCtrl.dismiss();
            this.showLoading = false;
          }
        });
    }
  }

  getPost() {
    this.firestoreService.getPost(this.discussion.postId).then((post: Post) => {
      this.post = post;
    });
  }

  setDiscussionAsRead() {
    this.firestoreService.setDiscussionAsRead(
      this.authService.user.id,
      this.discussion.id
    );
  }

  messageToVisualMessages(messages: Message[]): VisualMessage[] {
    var visualMessages: VisualMessage[] = [];

    messages.forEach((message) => {
      visualMessages.push(this.messageToVisualMessage(message));
    });

    return visualMessages;
  }

  messageToVisualMessage(message: Message): VisualMessage {
    var visualMessage = <VisualMessage>Object.assign(message);

    visualMessage.timeAgo = message.dateCreated
      ? moment(message.dateCreated.toDate()).fromNow()
      : 'Just now';
    visualMessage.isCurrentUser = message.user.id === this.authService.user.id;

    return visualMessage;
  }

  sendMessage() {
    if (this.messageContent === '' || this.sendingMessage) {
      return;
    }

    this.sendingMessage = true;

    var message = <Message>{
      user: <User>{
        id: this.authService.user.id,
        name: this.authService.user.name,
        pictureURL: this.authService.user.pictureURL,
      },
      content: this.messageContent,
    };

    this.firestoreService.sendMessage(this.discussion, message).then(() => {
      this.messageContent = '';
      this.sendingMessage = false;
    });
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
