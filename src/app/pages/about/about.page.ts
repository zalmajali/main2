import { Component, OnInit } from '@angular/core';
import {LoadingController,MenuController, NavController, Platform} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@ionic-native/network/ngx';
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  description:any;
  isThere:any = 1;
  returnData:any;
  operationResult:any;
  fullNameLogin:any;
  emailLogin:any;
  productInShopingCart:any;
  title:any;
  constructor(private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private usersService:UsersService,private loading: LoadingController) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','about');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/home");
    });
  }
  ngOnInit() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','about');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.usersService.aboutApp().then(async data=>{
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 2500,
      });
      await loading.present();
      this.returnData = data;
      this.operationResult = this.returnData.Error.ErrorCode;
      if(this.operationResult==1){
       this.description = this.returnData.Data.description;
       this.title = this.returnData.Data.title;
       if(this.description)
         this.isThere = 1;
       else
         this.isThere = 0;
      }
      else if(this.operationResult==2){
        this.isThere = 0;
      }
    });
  }
  async functionOpenMenue(){
    this.fullNameLogin = await this.storage.get('fullNameLogin');
    this.emailLogin = await this.storage.get('emailLogin');
    if(this.fullNameLogin!=null || this.emailLogin!=null) {
      this.menu.enable(true,"last");
      this.menu.open("last");
    }else{
      this.menu.enable(true,"first");
      this.menu.open("first");
    }
  }
}
