import {Component, OnInit} from '@angular/core';

import {NavController, Platform} from '@ionic/angular';

@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent implements OnInit {
  constructor(public navCtrl: NavController, public platform: Platform) {}

  ngOnInit() {}
}
