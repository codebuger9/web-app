import {Component, OnInit, Input, ViewChild} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.page.html',
  styleUrls: ['./image-cropper.page.scss'],
})
export class ImageCropperPage implements OnInit {
  @Input() imageBlob: Blob;

  @ViewChild('imageCropper', undefined)
  private imageCropper: ImageCropperComponent;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  done() {
    var event: ImageCroppedEvent = this.imageCropper.crop();
    var croppedImageBlob = this.base64ToBlob(event.base64);

    this.modalCtrl.dismiss({
      croppedImageBlob: croppedImageBlob,
    });
  }

  base64ToBlob(base64String: string) {
    var byteString = atob(base64String.split(',')[1]);

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], {type: 'image/jpeg'});
  }
}
