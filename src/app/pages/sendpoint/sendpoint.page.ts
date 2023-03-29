import { Component, OnInit } from '@angular/core';
import {AlertController,LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@ionic-native/network/ngx';
import {CategoriesService} from "../../services/categories.service";
import {ActivatedRoute, Router} from '@angular/router';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import {AlertdataComponent} from "../alertdata/alertdata.component";
import {StoresService} from "../../services/stores.service";
@Component({
  selector: 'app-sendpoint',
  templateUrl: './sendpoint.page.html',
  styleUrls: ['./sendpoint.page.scss'],
})
export class SendpointPage implements OnInit {
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

  public userSelectId:any;
  public pageNum:any;

  public userinfoId:any;
  public mobileUserInfo:any;
  public mobileHide:any;
  public fullUserInfoName:any;
  public personalImage:any="../../assets/imgs/defThree.png";
  public catUserInfoId:any;
  public subUserInfoCatId:any;
  public cityUserInfoId:any;
  public regionUserInfoId:any;
  public serviceDetails:any;
  public imageType:any;
  public pointsUser:any;
  public errorPoints:any="";
  public isErrorUserPoints:any = 1;
  public isdisabled:boolean=true;
  public returnData:any;
  public isActive:any;
  public active:any;
  public catId:any;
  public checkIfSendPoints:any=0;
  public checkIfSendPointsNew:any=0;
  public checkIfSendPointsThree:any=0;
  public rate:any;
  public number:any;
  public errorNumber:any="";
  public isErrorUserNumber:any = 1;
  public numberLoginNum:any;
  public returnDataUser:any;
  public newNotifications:any=0;
  public returnNotfiData:any;
  public checkPointEnter:any;
  public commercialName:any;
  constructor(private storesService : StoresService,private toastCtrl: ToastController,private modalController: ModalController,private alertController:AlertController,private transfer: FileTransfer,private loading: LoadingController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','information');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/home");
    });
  }
  checkPoint(event){
    this.errorPoints = "succsessFiled";
    this.isErrorUserPoints = 1;
    this.pointsUser = event;
    if(this.pointsUser == "" || this.pointsUser == undefined){
      this.errorPoints = "errorFiled";
      this.isErrorUserPoints = 0;
    }else{
      let pointsArray = this.pointsUser.split("");
      for(let i=0;i<this.pointsUser.length;i++){
        let checkVal =/[0-9]/;
        if(!checkVal.test(this.pointsUser[i])){
          this.errorPoints = "errorFiled";
          this.isErrorUserPoints = 0;
          this.checkPointEnter = "الرجاء إدخال عدد النقاط بالشكل الصحيح";
        }
      }
    }
    this.isEnterAllValues();
  }
  checkNumber(event){
    this.errorNumber = "succsessFiled";
    this.isErrorUserNumber = 1;
    this.number = event;
    this.checkIfSendPoints = 0;
    this.checkIfSendPointsNew = 0;
    this.checkIfSendPointsThree = 0;
    if(this.number == "" || this.number == undefined){
      this.errorNumber = "errorFiled";
      this.isErrorUserNumber = 0;
    }
    this.isEnterAllValues();
  }
  isEnterAllValues(){
    if(this.pointsUser != undefined && this.pointsUser != "" && this.number != undefined && this.number != ""){
      this.isdisabled = true;
    }
  }
  async functionGetData(userSelectId:any){
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 2500,
    });
    await loading.present();
    this.storesService.userInformation(userSelectId).then(async data=>{
      this.returnUsersData = data;
      this.operationResult = this.returnUsersData.Error.ErrorCode;
      if(this.operationResult==1){
        this.userinfoId = this.returnUsersData.Data.id;
        this.mobileUserInfo = this.returnUsersData.Data.mobile;
        this.mobileHide = this.returnUsersData.Data.mobileHide;
        this.fullUserInfoName = this.returnUsersData.Data.fullName;
        this.commercialName = this.returnUsersData.Data.commercialName;
        this.personalImage = this.returnUsersData.Data.personalImage;
        if(this.personalImage == null || this.personalImage == 0 || this.personalImage == undefined)
          this.personalImage = "../../assets/imgs/defThree.png";
        this.catUserInfoId = this.returnUsersData.Data.catId;
        this.subUserInfoCatId = this.returnUsersData.Data.subCatId;
        this.cityUserInfoId = this.returnUsersData.Data.cityId;
        this.regionUserInfoId = this.returnUsersData.Data.regionsId;
        this.serviceDetails = this.returnUsersData.Data.serviceDetails;
        this.rate = this.returnUsersData.Data.rate;
      }
    }).catch(error=>{
    });
  }
  async ngOnInit() {
    this.fullName = await this.storage.get('fullNameLogin');
    this.numberLogin = await this.storage.get('numberLogin');
    this.userId = await this.storage.get('userId');
    this.catId = await this.storage.get('catId');
    this.points = await this.storage.get('points');
    this.type = await this.storage.get('type');
    this.email = await this.storage.get('email');
    if(this.userId == null || this.numberLogin == null  || this.catId == null  || this.fullName == null){
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
  async functionCheckNumberaAndPoint(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','registration');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    if((this.number == undefined || this.number == "") && (this.pointsUser == undefined || this.pointsUser == "")){
      this.errorNumber = "errorFiled";
      this.isErrorUserNumber = 0;
      this.errorPoints = "errorFiled";
      this.isErrorUserPoints = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.number == undefined || this.number == ""){
      this.errorNumber = "errorFiled";
      this.isErrorUserNumber = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.pointsUser == undefined || this.pointsUser == ""){
      this.errorPoints = "errorFiled";
      this.isErrorUserPoints = 0;
      this.isdisabled = false;
      return false;
    }
    this.numberLoginNum = '962'+this.numberLogin;
    if(this.number != undefined && this.pointsUser != undefined && this.number!=this.numberLoginNum) {
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 2500,
      });
      await loading.present();
      this.storesService.checkNumberaAndPoint(this.userId,this.number).then(async data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        if(this.operationResult==1){
          this.userSelectId = this.returnData.Data.userId;
          this.functionGetData(this.userSelectId)
          this.checkIfSendPoints = 1;
        }else if(this.operationResult==2){
          await this.checkAlert(1)
          this.checkIfSendPoints = 2;
        }else if(this.operationResult==3){
          await this.checkAlert(1)
          this.checkIfSendPoints = 3;
        }
      })
    }else{
      await this.checkAlert(3)
    }
    this.isdisabled = true;
  }
  functionDeleteSearch(){
    this.checkIfSendPoints = 0;
    this.number = "";
  }
  async sendPointsToUser(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','home');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    if(this.pointsUser == undefined || this.pointsUser == ""){
      this.errorPoints = "errorFiled";
      this.isErrorUserPoints = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.pointsUser != 0){
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 2500,
      });
      await loading.present();
      this.storesService.sendPointsToUser(this.userId,this.userSelectId,this.pointsUser).then(async data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        if(this.operationResult==1){
          this.points = this.points - this.pointsUser;
          await this.storage.set('points',this.points);
          this.checkIfSendPointsNew = 1;
          this.checkIfSendPoints = 0;
          this.checkIfSendPointsThree = 0;
          this.number = "";
          this.pointsUser = "";
        }else if(this.operationResult==2){
          await this.checkAlert(2)
          this.checkIfSendPointsNew = 2;
        }else if(this.operationResult==3){
          await this.checkAlert(2)
          this.checkIfSendPointsNew = 2;
        }else if(this.operationResult==4){
          await this.checkAlert(2)
          this.checkIfSendPointsThree = 1;
        }
      }).catch(async e=>{
        await this.checkAlert(2)
        this.checkIfSendPointsNew = 2;
      })
      this.isdisabled = true;
    }
  }
  async checkAlert(type:any){
    let model = await this.modalController.create({
      component:AlertdataComponent,
      animated:true,
      componentProps:{opera:type},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then(data=>{
    });
    await model.present();
  }
  functionGoToHome(){
    this.navCtrl.navigateRoot("/home");
  }
  functionGoServices(catId:any,catName:any){
    this.navCtrl.navigateRoot(['/services', {catId:catId,catName:catName}])
  }
  functionGoInvitations(){
    this.navCtrl.navigateRoot("/invitations");
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
