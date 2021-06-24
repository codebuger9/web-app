import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

import {ModalController, AlertController} from '@ionic/angular';

import {FirestoreService} from 'src/services/FirestoreService/firestore.service';
import {UserNavigatorService} from 'src/services/UserNavigatorService/userNavigator.service';
import {AuthService} from 'src/services/AuthService/auth.service';

import {MallEditorPage} from '../mall-editor/mall-editor.page';

import {MallDetails} from 'src/models/MallDetails';
import {User} from 'src/models/User';

@Component({
  selector: 'mall',
  templateUrl: './mall.component.html',
  styleUrls: ['./mall.component.scss'],
})
export class MallComponent implements OnInit {
  @Input() mall: MallDetails;
  @Input() isProfile: boolean;

  public canEdit: boolean = false;

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private userNavigatorService: UserNavigatorService,
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.canEdit = this.authService.user.id === this.mall.owner.id;
  }

  goToUserProfile(user: User) {
    this.userNavigatorService.setUser(user);
    this.router.navigate(['/user-profile']);
  }

  deleteMall() {
    this.presentDeleteAlert();
  }

  async presentDeleteAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Delete mall?',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          handler: () => {
            this.firestoreService.deleteMall(this.mall);
          },
        },
      ],
    });

    await alert.present();
  }

  editMall() {
    this.openMallEditorModal();
  }

  async openMallEditorModal() {
    const modal = await this.modalCtrl.create({
      component: MallEditorPage,
      componentProps: {
        mall: this.mall,
      },
    });

    return await modal.present();
  }
}
