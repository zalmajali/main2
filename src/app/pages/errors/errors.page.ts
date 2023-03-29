import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import { Network } from '@ionic-native/network/ngx';
@Component({
  selector: 'app-errors',
  templateUrl: './errors.page.html',
  styleUrls: ['./errors.page.scss'],
})
export class ErrorsPage implements OnInit {
  backToPage:any;
  constructor(private network:Network,private navCtrl: NavController,private storage:Storage ) {
    let connectSubscription = this.network.onConnect().subscribe(() => {
      this.storage.set('internetBack','1');
    });
  }
  ngOnInit() {
    let connectSubscription = this.network.onConnect().subscribe(() => {
      this.storage.set('internetBack','1');
    });
  }
  async backToHomePage(){
    this.backToPage = await this.storage.get('thisPageReturn');
    if(this.backToPage == null || this.backToPage == undefined || this.backToPage == 0)
      this.navCtrl.navigateRoot("/home");
    else
      this.navCtrl.navigateRoot("/"+this.backToPage);
  }
}
