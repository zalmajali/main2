import { Component, OnInit,Input } from '@angular/core';
import {ModalController, Platform,NavController} from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-alertdata',
  templateUrl: './alertdata.component.html',
  styleUrls: ['./alertdata.component.scss'],
})
export class AlertdataComponent implements OnInit {
  @Input() opera: string;
  constructor(private activaterouter : ActivatedRoute,private navCtrl: NavController,private router : Router,private modalController: ModalController,private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
  }
  closeModel(){
    this.modalController.dismiss({
    });
  }
  functionGoInvitations(){
    this.navCtrl.navigateRoot("/sendinvitation");
    this.modalController.dismiss({
    });
  }
  ngOnInit() {

  }

}
