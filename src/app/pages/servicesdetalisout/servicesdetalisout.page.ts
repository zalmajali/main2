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
  selector: 'app-servicesdetalisout',
  templateUrl: './servicesdetalisout.page.html',
  styleUrls: ['./servicesdetalisout.page.scss'],
})
export class ServicesdetalisoutPage implements OnInit {
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
      this.storage.set('thisPageReturn','servicesout');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/homeout");
    });
  }

  functionCallNumber(numer:any){
    this.callNumber.callNumber(numer, true)
      .then(res =>{})
      .catch(err =>{
        this.message = "لا يمكنك الاتصال حاليا...هناك مشكلة في ميزة الاتصال";
        this.displayResult(this.message);
      });
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
      this.functionGetData(userSelectId)
    });
  }
  async ngOnInit() {
    this.activaterouter.params.subscribe(params => {
      if(params['userSelectId']!="" && params['userSelectId']!=null && params['userSelectId']!=undefined && params['userSelectId']!=0)
        this.userSelectId = params['userSelectId'];
      if(params['pageNum']!="" && params['pageNum']!=null && params['pageNum']!=undefined && params['pageNum']!=0)
        this.pageNum = params['pageNum'];
    });
    this.functionGetData(this.userSelectId);
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
    this.menu.enable(true,"first");
    this.menu.open("first");
  }
}
