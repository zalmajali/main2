import { Component, OnInit,ViewChild } from '@angular/core';
import {MenuController, Platform, NavController, IonSlides, ModalController, ToastController,IonInput} from '@ionic/angular';
import {Storage} from "@ionic/storage";
import {CategoriesService} from "../../services/categories.service";
import { Network } from '@ionic-native/network/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from "../../services/users.service";
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
@Component({
  selector: 'app-sendinvitation',
  templateUrl: './sendinvitation.page.html',
  styleUrls: ['./sendinvitation.page.scss'],
})
export class SendinvitationPage implements OnInit {
  public operationResult:any;
  public hours:any=0
  public minutes:any=0
  public seconds:any=0
  public fullNameLogin:any;
  public emailLogin:any;
  public returnData:any;
  public fullName:any;
  public userId:any;
  public numberLogin:any;
  public catId:any;
  public points:any;
  public type:any;
  public email:any;
  public invitationCode:any;
  public newNotifications:any=0;
  public returnNotfiData:any;
  public isActive:any;
  public active:any;
  public message:any;
  public returnSettingData:any;
  public invitationTime:any=0;
  public invitationMsg:any;
  public returnDataUser:any;
  public activeTime:any;
  constructor(private clipboard: Clipboard,private socialSharing: SocialSharing,private toastCtrl: ToastController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','home');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
  }
  async selectvAL(invitationTime:any=0,userId:any){
    if(invitationTime!=0) {
      var countDownDate = new Date(invitationTime).getTime();
      var now = new Date().getTime();
      var distance = countDownDate - now;
      this.hours = Math.floor(distance / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor(((distance % (1000*60*60))% (1000*60)) / 1000);
      if (distance > 0) {
        setTimeout(async () => {
          this.selectvAL(this.invitationTime,userId);
        }, 1000)
      }
    }else{
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
    }
  }
  async functionGetInformation(userId:any){
    await this.usersService.information(this.userId).then(async data=>{
      this.returnDataUser = data;
      this.operationResult = this.returnDataUser.Error.ErrorCode;
      if(this.operationResult==1){
        this.points = this.returnDataUser.Data.points;
        await this.storage.set('points',this.points);
        this.invitationTime = this.returnDataUser.Data.invitationTime;
        this.activeTime = this.returnDataUser.Data.activeTime;
        if(this.invitationTime == 0)
          this.selectvAL(0,userId)
      }
    })
    setTimeout(()=>{
      this.functionGetInformation(userId);
    },3500)
}
  async ngOnInit() {
    this.fullName = await this.storage.get('fullNameLogin');
    this.numberLogin = await this.storage.get('numberLogin');
    this.userId = await this.storage.get('userId');
    this.catId = await this.storage.get('catId');
    this.points = await this.storage.get('points');
    this.type = await this.storage.get('type');
    this.isActive = await this.storage.get('isActive');
    this.active = await this.storage.get('active');
    this.invitationCode = await this.storage.get('invitationCode');
    if(this.userId == null || this.numberLogin == null || this.catId == null || this.type == null || this.type == null){
      this.storage.remove('fullNameLogin');
      this.storage.remove('numberLogin');
      this.storage.remove('passwordLogin');
      this.storage.remove('type');
      this.storage.remove('userId');
      this.storage.remove('catId');
      this.storage.remove('subCatId');
      this.storage.remove('points');
      this.navCtrl.navigateRoot('login');
    }
    await this.categoriesService.setting().then(async data=>{
      this.returnSettingData = data;
      this.operationResult = this.returnSettingData.Error.ErrorCode;
      if(this.operationResult==1){
        this.invitationMsg = this.returnSettingData.Data.invitationMsg;
        }
    });
    await this.usersService.information(this.userId).then(async data=>{
      this.returnDataUser = data;
      this.operationResult = this.returnDataUser.Error.ErrorCode;
      if(this.operationResult==1){
        this.invitationTime = this.returnDataUser.Data.invitationTime;
        this.activeTime = this.returnDataUser.Data.activeTime;
        this.points = this.returnDataUser.Data.points;
        await this.storage.set('points',this.points);
      }else{
        this.storage.remove('fullNameLogin');
        this.storage.remove('numberLogin');
        this.storage.remove('passwordLogin');
        this.storage.remove('type');
        this.storage.remove('userId');
        this.storage.remove('catId');
        this.storage.remove('subCatId');
        this.storage.remove('points');
        this.navCtrl.navigateRoot('login');
      }
    }).catch(e=>{
      this.storage.remove('fullNameLogin');
      this.storage.remove('numberLogin');
      this.storage.remove('passwordLogin');
      this.storage.remove('type');
      this.storage.remove('userId');
      this.storage.remove('catId');
      this.storage.remove('subCatId');
      this.storage.remove('points');
      this.navCtrl.navigateRoot('login');
      this.displayResult(this.message);
    })
    this.functionGetInformation(this.userId)
    if(this.invitationTime!=0)
      await this.selectvAL(this.invitationTime,this.userId);
    await this.checkIfSiteWork();
    this.notifications();
  }
  copyCodeVal(){
    this.clipboard.copy(this.invitationCode);
    this.message = "تمت عملية نسخ الكود بنجاح";
    this.displayResult(this.message);
    //this.clipboard.clear();
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
  functionshareValuseFacebook(){
    let values = this.invitationMsg.replace("$#$", this.fullName)+" و التسجيل بإستخدام رمز الدعوة "+this.invitationCode;
    this.socialSharing.shareViaFacebook(values).then(() => {
    }).catch(() => {
    });
  }
  functionshareValuseSMS(){
    let values = this.invitationMsg.replace("$#$", this.fullName)+" و التسجيل بإستخدام رمز الدعوة "+this.invitationCode;
    this.socialSharing.share("", 'Subject',"",values).then(() => {
    }).catch(() => {
    });
  }
  functionshareValuseWhatsapp(){
    let values = this.invitationMsg.replace("$#$", this.fullName)+" و التسجيل بإستخدام رمز الدعوة "+this.invitationCode;
    this.socialSharing.shareViaWhatsApp(values).then(() => {
    }).catch(() => {
    });
  }
  async checkIfSiteWork(){
    this.usersService.checkIfSiteWorkApi().then(async data=>{
      this.returnData = data;
      this.operationResult = this.returnData.Error.ErrorCode;
      if(this.operationResult!=1){
        this.navCtrl.navigateRoot("/sitework");
      }
    }).catch(e=>{
      this.navCtrl.navigateRoot("/sitework");
    })
  }
  functionGoServices(catId:any,catName:any){
    this.navCtrl.navigateRoot(['/services', {catId:catId,catName:catName}])
  }
  functionGoToHome(){
    this.navCtrl.navigateRoot("/home");
  }
  functionGoInvitations(){
    this.navCtrl.navigateRoot("/invitations");
  }
  functionGoToSendPoint(){
    this.navCtrl.navigateRoot("/sendpoint");
  }
  functionGoToArchives(){
    this.navCtrl.navigateRoot("/archives");
  }
  functionOpenAccount(){
    this.navCtrl.navigateRoot("/account");
  }
  functionPushNotifications(){
    this.navCtrl.navigateRoot("/pushnotification");
  }
  async displayResult(message){
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'bottom',
      cssClass:"toastStyle",
      color:""
    });
    await toast.present();
  }
  async functionOpenMenue(){
    this.menu.enable(true,"last");
    this.menu.open("last");
  }
}
