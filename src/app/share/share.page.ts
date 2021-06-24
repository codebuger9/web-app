import { Component, OnInit } from '@angular/core';

import { ModalService } from 'src/services/ModalService/modal.service';
import { UserService } from 'src/services/UserService/user.service';

import { User } from 'src/data/User';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss']
})
export class SharePage implements OnInit {
  users: User[] = [];
  sendDisable = true;

  constructor(
    private modalService: ModalService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

  selectedChanged(user: User) {
    user.isSelected = !user.isSelected;
    this.sendDisable = !this.checkCanSend();
  }

  checkCanSend() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].isSelected) {
        return true;
      }
    }

    return false;
  }

  closeModal() {
    this.modalService.dismiss();
  }
}
