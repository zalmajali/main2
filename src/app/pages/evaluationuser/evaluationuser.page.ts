import { Component, OnInit,ViewChild,ElementRef,Renderer2 } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@ionic-native/network/ngx';
import {CategoriesService} from "../../services/categories.service";
import {ActivatedRoute, Router} from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import {StoresService} from "../../services/stores.service";
@Component({
  selector: 'app-evaluationuser',
  templateUrl: './evaluationuser.page.html',
  styleUrls: ['./evaluationuser.page.scss'],
})
export class EvaluationuserPage implements OnInit {
  @ViewChild('val11',{read:ElementRef}) val11;
  @ViewChild('val21',{read:ElementRef}) val21;
  @ViewChild('val31',{read:ElementRef}) val31;
  @ViewChild('val41',{read:ElementRef}) val41;
  @ViewChild('val51',{read:ElementRef}) val51;
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
  public rate:any;
  public returnDataUser:any;
  public checkPointEnter:any;
  public numberSelectedStarOne:any=0;
  public evalDetails:any;
  public returnRateData:any;
  public commercialName:any;
  constructor(private storesService : StoresService,private renderer:Renderer2,private activaterouter : ActivatedRoute,private toastCtrl: ToastController,private loading: LoadingController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','home');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/home");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/home");
    });
  }
  checkevalDetails(event){
    this.evalDetails = event;
    if(this.evalDetails == "" || this.evalDetails == undefined){
     this.evalDetails = "";
    }
  }
  functionNumRateStore(numStar:any,index:any) {
    if (index == 1) {
      if (numStar == 1) {
        this.renderer.setStyle(this.val11.nativeElement, 'background', '');
        this.renderer.setStyle(this.val21.nativeElement, 'background', '');
        this.renderer.setStyle(this.val31.nativeElement, 'background', '');
        this.renderer.setStyle(this.val41.nativeElement, 'background', '');
        this.renderer.setStyle(this.val51.nativeElement, 'background', '');
        this.renderer.setStyle(this.val11.nativeElement, 'background', '#fbe106');
      }
      if (numStar == 2) {
        this.renderer.setStyle(this.val11.nativeElement, 'background', '');
        this.renderer.setStyle(this.val21.nativeElement, 'background', '');
        this.renderer.setStyle(this.val31.nativeElement, 'background', '');
        this.renderer.setStyle(this.val41.nativeElement, 'background', '');
        this.renderer.setStyle(this.val51.nativeElement, 'background', '');
        this.renderer.setStyle(this.val11.nativeElement, 'background', '#fbe106');
        this.renderer.setStyle(this.val21.nativeElement, 'background', '#fbe106');
      }
      if (numStar == 3) {
        this.renderer.setStyle(this.val11.nativeElement, 'background', '');
        this.renderer.setStyle(this.val21.nativeElement, 'background', '');
        this.renderer.setStyle(this.val31.nativeElement, 'background', '');
        this.renderer.setStyle(this.val41.nativeElement, 'background', '');
        this.renderer.setStyle(this.val51.nativeElement, 'background', '');
        this.renderer.setStyle(this.val11.nativeElement, 'background', '#fbe106')
        this.renderer.setStyle(this.val21.nativeElement, 'background', '#fbe106');
        this.renderer.setStyle(this.val31.nativeElement, 'background', '#fbe106');
      }
      if (numStar == 4) {
        this.renderer.setStyle(this.val11.nativeElement, 'background', '');
        this.renderer.setStyle(this.val21.nativeElement, 'background', '');
        this.renderer.setStyle(this.val31.nativeElement, 'background', '');
        this.renderer.setStyle(this.val41.nativeElement, 'background', '');
        this.renderer.setStyle(this.val51.nativeElement, 'background', '');
        this.renderer.setStyle(this.val11.nativeElement, 'background', '#fbe106')
        this.renderer.setStyle(this.val21.nativeElement, 'background', '#fbe106');
        this.renderer.setStyle(this.val31.nativeElement, 'background', '#fbe106');
        this.renderer.setStyle(this.val41.nativeElement, 'background', '#fbe106')
      }
      if (numStar == 5) {
        this.renderer.setStyle(this.val11.nativeElement, 'background', '');
        this.renderer.setStyle(this.val21.nativeElement, 'background', '');
        this.renderer.setStyle(this.val31.nativeElement, 'background', '');
        this.renderer.setStyle(this.val41.nativeElement, 'background', '');
        this.renderer.setStyle(this.val51.nativeElement, 'background', '');
        this.renderer.setStyle(this.val11.nativeElement, 'background', '#fbe106')
        this.renderer.setStyle(this.val21.nativeElement, 'background', '#fbe106');
        this.renderer.setStyle(this.val31.nativeElement, 'background', '#fbe106');
        this.renderer.setStyle(this.val41.nativeElement, 'background', '#fbe106')
        this.renderer.setStyle(this.val51.nativeElement, 'background', '#fbe106')
      }
      this.numberSelectedStarOne = numStar;
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
        this.commercialName = this.returnUsersData.Data.commercialName;
        this.fullUserInfoName = this.returnUsersData.Data.fullName;
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
      this.functionGetData(userSelectId)
    });
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
    this.activaterouter.params.subscribe(params => {
      if(params['userSelectId']!="" && params['userSelectId']!=null && params['userSelectId']!=undefined && params['userSelectId']!=0)
        this.userSelectId = params['userSelectId'];
    });
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
    this.functionGetData(this.userSelectId)
  }
  async saveAndBack(){
    this.storesService.rateUser(this.userSelectId,this.numberSelectedStarOne,this.evalDetails).then(data=>{
      this.returnRateData = data;
      this.operationResult = this.returnRateData.Error.ErrorCode;
      if(this.operationResult == 1){
        this.message = "تمت عملية التقييم بنجاح شكرا على وقتك للتقييم";
        this.displayResult(this.message);
      }else{
        this.message = "لم تتم عملية التقييم بنجاح...حاول مرة اخرى";
        this.displayResult(this.message);
      }
    }).catch(e=>{
      this.message = "لم تتم عملية التقييم بنجاح...حاول مرة اخرى";
      this.displayResult(this.message);
    })
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
  functionGoToServ(){
    this.navCtrl.navigateRoot(['/servicesdetalis', {userSelectId:this.userSelectId}])
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
  async functionOpenMenue(){
    this.menu.enable(true,"last");
    this.menu.open("last");
  }
}
