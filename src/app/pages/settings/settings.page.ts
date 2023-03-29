import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform,ModalController, ToastController,AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@ionic-native/network/ngx';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {AboutComponent} from "../about/about.component";
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public menu1:any;
  public menu2:any;
  public menu3:any;
  public menu4:any;

  public menu5:any;
  public menu6:any;
  public menu7:any;
  public menu8:any;

  public checkLanguage: any=0;
  public language: string;
  public message:any;
  public float: any;
  public dir: any;
  public internetMessage: any;
  public settingsTitle: any;
  public isLogin:any = "2";
  public userId:any;
  public departmentId:any;
  public type:any;
  public email:any;
  public settingsChangPass:any;
  public settingsLanguage:any;
  public settingsAllowPn:any;
  public settingsShowImage:any;
  public settingsYas:any;
  public settingsNo:any;

  public checkLangSelected:any;
  public checkAllowPn:any;
  public checkShowImage:any;
  public signOut:any;
  public signMsg:any;
  public imageInformation:any=1;
  public toastStyle:any;
  public newNotifications:any='';
  public returnNotfiData:any;
  public operationResult:any;
  public addMessageSuccess:any;
  public addMessageFailedOne:any;
  public addMessageFaileTow:any;
  public newTasks:any;
  constructor(private alertController:AlertController,private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private http:HttpClient,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private usersService:UsersService,private toastCtrl: ToastController,private loading: LoadingController) {
    this.checkInternetData();
    this.menu.enable(false,"last");
    this.menu.enable(false,"first");
    this.backPageValues();
  }
  async backPageValues(){
  this.platform.backButton.subscribeWithPriority(10, async () => {
    this.userId = await this.storage.get('userId');
    if(this.userId == null)
    this.navCtrl.navigateRoot('/login');
    else
    this.navCtrl.navigateRoot('/home');

  });
}
  initialiseTranslation(){
    this.translate.get('settings_Title').subscribe((res: string) => {
      this.settingsTitle = res;
    });
    this.translate.get('floatD').subscribe((res: string) => {
      this.float = res;
    });
    this.translate.get('internet_message').subscribe((res: string) => {
      this.internetMessage = res;
    });
    this.translate.get('dir').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('settings_chang_pass').subscribe((res: string) => {
      this.settingsChangPass = res;
    });
    this.translate.get('settings_language').subscribe((res: string) => {
      this.settingsLanguage = res;
    });
    this.translate.get('settings_allow_Pn').subscribe((res: string) => {
      this.settingsAllowPn = res;
    });
    this.translate.get('settings_show_image').subscribe((res: string) => {
      this.settingsShowImage = res;
    });
    this.translate.get('settings_yas').subscribe((res: string) => {
      this.settingsYas = res;
    });
    this.translate.get('settings_No').subscribe((res: string) => {
      this.settingsNo = res;
    });
    this.translate.get('signOut').subscribe((res: string) => {
      this.signOut = res;
    });
    this.translate.get('signMsg').subscribe((res: string) => {
      this.signMsg = res;
    });
    this.translate.get('message_success').subscribe((res: string) => {
      this.addMessageSuccess = res;
    });
    this.translate.get('message_failed_one').subscribe((res: string) => {
      this.addMessageFailedOne = res;
    });
    this.translate.get('message_failed_tow').subscribe((res: string) => {
      this.addMessageFaileTow = res;
    });
    this.translate.get('new_tasks').subscribe((res: string) => {
      this.newTasks = res;
    });
    //menue
    //first menue
    this.translate.get('menu1').subscribe((res: string) => {
      this.menu1 = res;
    });
    this.translate.get('menu2').subscribe((res: string) => {
      this.menu2 = res;
    });
    this.translate.get('menu3').subscribe((res: string) => {
      this.menu3 = res;
    });
    this.translate.get('menu4').subscribe((res: string) => {
      this.menu4 = res;
    });
    //last menue
    this.translate.get('menu5').subscribe((res: string) => {
      this.menu5 = res;
    });
    this.translate.get('menu6').subscribe((res: string) => {
      this.menu6 = res;
    });
    this.translate.get('menu7').subscribe((res: string) => {
      this.menu7 = res;
    });
    this.translate.get('menu8').subscribe((res: string) => {
      this.menu8 = res;
    });
    //menue
  }
  async changeLange(event){
    if(event == 1){
      await this.storage.set('checkLanguage','ar');
    }
    else{
      await this.storage.set('checkLanguage','en');
    }
    await this.getDeviceLanguage()
  }
  async clickedAllowPn(event){
    if(event == 1){
      await this.storage.set('checkAllowPn',1);
      this.checkAllowPn = 1;
    }
    else{
      await this.storage.set('checkAllowPn',2);
      this.checkAllowPn = 2
    }
    if(this.userId != null) {
      this.usersService.updateUpdatePush(this.userId, this.checkAllowPn).then(async data => {
        this.message = this.addMessageSuccess;
        this.displayResult(this.message);
      }).catch(e=>{
        this.message = this.addMessageFailedOne;
        this.displayResult(this.message);
      })
    }else{
      this.message = this.addMessageFaileTow;
      this.displayResult(this.message);
    }
  }
  async clickedShowImage(event){
    if(event == 1){
      await this.storage.set('checkShowImage',1);
      this.checkShowImage = 1;
    }
    else{
      await this.storage.set('checkShowImage',2);
      this.checkShowImage = 2
    }
    if(this.userId != null) {
      this.usersService.updateUpdateImage(this.userId, this.checkShowImage).then(async data => {
        this.message = this.addMessageSuccess;
        this.displayResult(this.message);
      }).catch(e=>{
        this.message = this.addMessageFailedOne;
        this.displayResult(this.message);
      })
    }else{
      this.message = this.addMessageFaileTow;
      this.displayResult(this.message);
    }
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.checkInternetData();
    this.userId = await this.storage.get('userId');
    this.departmentId = await this.storage.get('departmentId');
    this.type = await this.storage.get('type');
    this.email = await this.storage.get('email');
    if(this.departmentId!=1 && this.type=='suber')
      this.imageInformation = 2;
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
      this.isLogin = 0;
    }else{
      this.isLogin = 1;
    }
    await this.storage.get('checkShowImage').then(async checkShowImage=> {
      if (checkShowImage != null && checkShowImage != 0 && checkShowImage != "" && checkShowImage != undefined && checkShowImage != "null")
        this.checkShowImage = checkShowImage
      else {
        await this.storage.set('checkShowImage', 2);
        this.checkShowImage = 2
      }
      if(this.userId != null){
        this.usersService.updateUpdateImage(this.userId, this.checkShowImage).then(async data => {
        })
      }
    });
    await this.storage.get('checkAllowPn').then(async checkAllowPn=>{
      if(checkAllowPn!=null && checkAllowPn!=0 && checkAllowPn!="" && checkAllowPn!=undefined && checkAllowPn!="null")
        this.checkAllowPn = checkAllowPn
      else{
        await this.storage.set('checkAllowPn',1);
        this.checkAllowPn = 1
      }
      if(this.userId != null){
        this.usersService.updateUpdatePush(this.userId,this.checkAllowPn).then(async data=>{
        })
      }
    });
    this.notifications();
  }
  async notifications(){
    this.usersService.newNotifications(this.userId).then(async data=>{
      this.returnNotfiData = data;
      this.operationResult = this.returnNotfiData.Error.ErrorCode;
      if(this.operationResult==1){
        this.newNotifications = this.returnNotfiData.Data.numSelectNotifications;
      }else{
        this.newNotifications = 0;
      }
    }).catch(e=>{
      this.newNotifications = 0;
    })
    setTimeout(()=>{
      this.notifications();
    },3500)
  }
  async getDeviceLanguage() {
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    if(this.checkLanguage){
      if(this.checkLanguage == "en")
        this.checkLangSelected = 2;
      else if(this.checkLanguage == "ar")
        this.checkLangSelected = 1;
      else
        this.checkLangSelected = 2;
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
        if(this.language == "en")
          this.checkLangSelected = 2;
        else if(this.language == "ar")
          this.checkLangSelected = 1;
        else
          this.checkLangSelected = 2;
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
          if(this.language == "en")
            this.checkLangSelected = 2;
          else if(this.language == "ar")
            this.checkLangSelected = 1;
          else
            this.checkLangSelected = 2;
          this.translate.use(this.language);
          this.initialiseTranslation();
        }).catch(e => {console.log(e);});
      }
    }
  }
  checkInternetData(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.message = this.internetMessage;
      this.displayResult(this.message);
    })
  }
  async displayResult(message){
    this.translate.get('toastStyle').subscribe((res: string) => {
      this.toastStyle = res;
    });
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 50000,
      position: 'bottom',
      cssClass:this.toastStyle,
      color:""
    });
    await toast.present();
  }
  async logOut(){
    const alert = await this.alertController.create({
      cssClass: 'alertBac',
      mode: 'ios',
      message: this.signMsg,
      buttons: [
        {
          text: this.settingsNo,
          cssClass: 'alertButton',
          handler: () => {
          }
        },{
          text: this.settingsYas,
          cssClass: 'alertButton',
          handler: () => {
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
            this.navCtrl.navigateRoot("/login");
          }
        }
      ]
    });
    await alert.present();
  }
  //last menue;
  changePassword(){
    this.navCtrl.navigateRoot("/changepassword");
  }
  functionHome(){
    this.navCtrl.navigateRoot("/home");
  }
  functionAccount(){
    this.navCtrl.navigateRoot("/account");
  }
  functionPushNotifications(){
    this.navCtrl.navigateRoot("/pushnotification");
  }
  functionRequest(){
    if(this.departmentId==1 && this.type=='suber')
      this.navCtrl.navigateRoot("/newtasks")
    else
      this.navCtrl.navigateRoot("/myrequests")
  }
  functionTeam(){
    this.navCtrl.navigateRoot("/team");
  }
  functionNewtasks(){
    this.navCtrl.navigateRoot("/newtasks");
  }
  functionAddrequest(){
    this.navCtrl.navigateRoot("/addrequest");
  }
  //first menue;
  async functionAbout(){
    let model = await this.modalController.create({
      component:AboutComponent,
      animated:true,
      mode:"ios",
      cssClass:"modalFilterSortCss"
    });
    await model.present();
  }
  functionLogin(){
    this.navCtrl.navigateRoot("/login");
  }
  functionAllrequest(){
    this.navCtrl.navigateRoot("/allrequest");
  }
  functionProgressTasks(){
    this.navCtrl.navigateRoot("/progresstasks");
  }
  forgotPassword(){
    this.navCtrl.navigateRoot("/forgotpasssword");
  }
}
