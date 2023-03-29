import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AlertController, Platform,NavController} from '@ionic/angular';
import {Storage} from "@ionic/storage";
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showFirstPage:any;
  fullNameLogin:any;
  emailLogin:any;
  public dir: string
  public language:any
  public checkLanguage: any=0;
  public userId:any;
  public departmentId:any;
  public type:any;
  public email:any;
  public photo:any;
  public fullName:any;
  constructor(private splashScreen: SplashScreen,private navCtrl: NavController,private globalization: Globalization, private translate: TranslateService,private alertController:AlertController,private router : Router,private platform : Platform,private storage: Storage) {
    this.platform.ready().then(() => {
      splashScreen.hide();
    });
    this.getDeviceLanguage();
    this.goPageValue();
  }
  async goPageValue(){
    this.fullName = await this.storage.get('fullName');
    this.userId = await this.storage.get('userId');
    this.departmentId = await this.storage.get('departmentId');
    this.type = await this.storage.get('type');
    this.email = await this.storage.get('email');
    if(this.userId == null || this.type == null || this.email == null){
      this.storage.remove('userId');
      this.storage.remove('departmentId');
      this.storage.remove('departmentNameAr');
      this.storage.remove('departmentNameEn');
      this.storage.remove('fullName');
      this.storage.remove('mobile');
      this.storage.remove('jobTitle');
      this.storage.remove('email');
      this.storage.remove('photo');
      this.storage.remove('type');
      this.storage.remove('typeId');
      this.navCtrl.navigateRoot('login');
    }else
      this.navCtrl.navigateRoot('home');
  }
  initialiseTranslation(){
    this.translate.get('dir').subscribe((res: string) => {
      this.dir = res;
    });
  }
  async getDeviceLanguage() {
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    if(this.checkLanguage){
      this.translate.setDefaultLang(this.checkLanguage);
      this.language = this.checkLanguage;
      this.translate.use(this.language);
      this.initialiseTranslation();
    }else{
      if (window.Intl && typeof window.Intl === 'object') {
        let Val  = navigator.language.split("-");
        this.translate.setDefaultLang(Val[0]);
        if (Val[0])
          this.language = Val[0];
        else
          this.language = 'en';
        this.translate.use(this.language);
        this.initialiseTranslation();
      }
      else{
        this.globalization.getPreferredLanguage().then(res => {
          let Val  = res.value.split("-");
          this.translate.setDefaultLang(Val[0]);
          if (Val[0])
            this.language = Val[0];
          else
            this.language = 'en';
          this.translate.use(this.language);
          this.initialiseTranslation();
        }).catch(e => {console.log(e);});
      }
    }
  }
}
