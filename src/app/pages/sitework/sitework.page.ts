import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import { Network } from '@ionic-native/network/ngx';
@Component({
  selector: 'app-sitework',
  templateUrl: './sitework.page.html',
  styleUrls: ['./sitework.page.scss'],
})
export class SiteworkPage implements OnInit {
  backToPage:any;
  constructor(private network:Network,private navCtrl: NavController,private storage:Storage ) {
  }
  ngOnInit() {
  }
  async backToHomePage(){
    this.navCtrl.navigateRoot("/home");
  }
}
