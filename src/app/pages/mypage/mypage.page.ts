import { Component, OnInit,ViewChild } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@ionic-native/network/ngx';
import {CategoriesService} from "../../services/categories.service";
import {ActivatedRoute, Router} from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import {StoresService} from "../../services/stores.service";
import { CallNumber } from '@ionic-native/call-number/ngx';
@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.page.html',
  styleUrls: ['./mypage.page.scss'],
})
export class MypagePage implements OnInit {
  public fullName:any;
  public userId:any;
  public numberLogin:any;
  public catUserId:any;
  public points:any;
  public type:any;
  public email:any;
  public operationResult:any;
  public returnUsersData:any;
  public returnArrayUsersFromServer:any;
  public returnUsersArray:any = [];
  public countOfData:any;
  public users:any;
  public message:any;
  public userinfoId:any;
  public mobileUserInfo:any;
  public mobileHide:any;
  public fullUserInfoName:any;
  public personalImage:any;
  public catUserInfoId:any;
  public subUserInfoCatId:any;
  public cityUserInfoId:any;
  public regionUserInfoId:any;
  public serviceDetails:any;
  public imageType:any;
  public returnDataUser:any;
  public newNotifications:any=0;
  public returnNotfiData:any;
  public commercialName:any;
  constructor(private callNumber: CallNumber,private storesService : StoresService,private activaterouter : ActivatedRoute,private toastCtrl: ToastController,private loading: LoadingController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','mypage');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/home");
    });
  }
  async functionGetData(userId:any){
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 2500,
    });
    await loading.present();
    this.storesService.userInformation(userId).then(async data=>{
      this.returnUsersData = data;
      this.operationResult = this.returnUsersData.Error.ErrorCode;
      if(this.operationResult==1){
        this.userinfoId = this.returnUsersData.Data.id;
        this.mobileUserInfo = this.returnUsersData.Data.mobile;
        this.mobileHide = this.returnUsersData.Data.mobileHide;
        this.fullUserInfoName = this.returnUsersData.Data.fullName;
        this.commercialName = this.returnUsersData.Data.commercialName;
        this.personalImage = this.returnUsersData.Data.accountImage;
        if(this.personalImage== null || this.personalImage == 0 || this.personalImage == undefined)
          this.personalImage = "../../assets/imgs/defTow.png";
        this.catUserInfoId = this.returnUsersData.Data.catId;
        this.subUserInfoCatId = this.returnUsersData.Data.subCatId;
        this.cityUserInfoId = this.returnUsersData.Data.cityId;
        this.regionUserInfoId = this.returnUsersData.Data.regionsId;
        this.serviceDetails = this.returnUsersData.Data.serviceDetails;
      }
    }).catch(error=>{
      this.functionGetData(userId)
    });
  }
  async ngOnInit() {
    this.fullName = await this.storage.get('fullNameLogin');
    this.numberLogin = await this.storage.get('numberLogin');
    this.userId = await this.storage.get('userId');
    this.catUserId = await this.storage.get('catId');
    this.points = await this.storage.get('points');
    this.type = await this.storage.get('type');
    this.email = await this.storage.get('email');
    if(this.userId == null || this.numberLogin == null  || this.catUserId == null  || this.fullName == null){
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
    await this.usersService.information(this.userId).then(async data=>{
      this.returnDataUser = data;
      this.operationResult = this.returnDataUser.Error.ErrorCode;
      if(this.operationResult==1){
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
    this.functionGetData(this.userId);
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
  async functionOpenMenue(){
    this.menu.enable(true,"last");
    this.menu.open("last");
  }
}
