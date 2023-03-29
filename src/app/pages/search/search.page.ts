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
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  questions:any=0;
  catId:any;
  catName:any;
  public loopingNumber:any = 1;


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
  public allFaveUserId:any;
  public returnDataUser:any;
  public searchVal:any="";
  public newNotifications:any=0;
  public returnNotfiData:any;
  constructor(private callNumber: CallNumber,private storesService : StoresService,private activaterouter : ActivatedRoute,private toastCtrl: ToastController,private loading: LoadingController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','home');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/home");
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
  async functionGetData(userId:any,searchVal:any){
    let limitNew = this.loopingNumber;
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 2500,
    });
    await loading.present();
    this.storesService.allSearchUsers(userId,searchVal,limitNew).then(async data=>{
      this.returnUsersData = data;
      this.operationResult = this.returnUsersData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayUsersFromServer = this.returnUsersData.Data.users;
        this.countOfData = this.returnUsersData.Data.countOfData;
        this.returnUsersArray=[];
        for(let i = 0; i < this.returnArrayUsersFromServer.length;i++) {
          this.returnUsersArray[i]=[];
          this.returnUsersArray[i]['id'] = this.returnArrayUsersFromServer[i].id;
          this.returnUsersArray[i]['mobile'] = this.returnArrayUsersFromServer[i].mobile;
          this.returnUsersArray[i]['mobileHide'] = this.returnArrayUsersFromServer[i].mobileHide;
          this.returnUsersArray[i]['fullName'] = this.returnArrayUsersFromServer[i].fullName;
          this.returnUsersArray[i]['commercialName'] = this.returnArrayUsersFromServer[i].commercialName;
          this.returnUsersArray[i]['personalImage'] = this.returnArrayUsersFromServer[i].personalImage;
          if(this.returnArrayUsersFromServer[i].personalImage == null || this.returnArrayUsersFromServer[i].personalImage == 0 || this.returnArrayUsersFromServer[i].personalImage == undefined)
            this.returnUsersArray[i]['personalImage'] = "../../assets/imgs/defThree.png";
          this.returnUsersArray[i]['subCatId'] = this.returnArrayUsersFromServer[i].subCatId;
          this.returnUsersArray[i]['cityId'] = this.returnArrayUsersFromServer[i].cityId;
          this.returnUsersArray[i]['regionsId'] = this.returnArrayUsersFromServer[i].regionsId;
          this.returnUsersArray[i]['rate'] = this.returnArrayUsersFromServer[i].rate;
          this.returnUsersArray[i]['imageType'] = 0;
          let checkValue = await this.isBookMark(this.returnArrayUsersFromServer[i].id);
          if(checkValue)
            this.returnUsersArray[i]['imageType'] = 1;
        }
        let countOfData = this.returnUsersArray.length;
        if(countOfData == 0)
          this.users = 0;
        else{
          this.users = 1;
        }
      }else
        this.users = 0;
    }).catch(error=>{
      this.functionGetData(userId,searchVal)
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
    this.activaterouter.params.subscribe(params => {
      if(params['searchVal']!="" && params['searchVal']!=null && params['searchVal']!=undefined && params['searchVal']!=0)
        this.searchVal = params['searchVal'];
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
    this.functionGetData(this.userId,this.searchVal);
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
  functionUserDetalis(userId:any){
    this.navCtrl.navigateRoot(['/servicesdetalis', {userSelectId:userId,pageNum:1}])
  }
  loadMoreData(event) {
    this.loopingNumber++;
    setTimeout(() => {
      this.functionGetData(this.userId,this.searchVal)
      event.target.complete();
      if (this.loopingNumber >= this.countOfData) {
        event.target.disabled = true;
      }
    }, 2000);
  }
  refrechAllPage(event) {
    this.loopingNumber = 1;
    this.functionGetData(this.userId,this.searchVal)
    setTimeout(() => {
      event.target.complete();
    }, 2000);
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
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
  async bookMark(){
    return this.storage.get('bookMarks').then(bookmarks=>{
      if(bookmarks == null)
        bookmarks = new Array<any>();
      return bookmarks;
    });
  }
  isBookMark(userId:any){
    return this.bookMark().then(realVal=>{
      for(let i = 0;i < realVal.length;i++){
        if(realVal[i] == userId)
          return true;
      }
      return false;
    });
  }
  async addBookMark(userId:any){
    await this.bookMark().then(async realVal=>{
      realVal.push(userId);
      await this.storage.set('bookMarks',realVal);
    });
  }
  async removeBookMark(userId:any,indexVal:any){
    await this.bookMark().then(async realVal=>{
      const index = realVal.indexOf(userId);
      if (index > -1) {
        realVal.splice(index, 1);
      }
      this.returnUsersArray[indexVal]['imageType'] = 0;
      await this.storage.set('bookMarks',realVal);
    });
  }
  async saveBookMark(userId:any,index:any){
    await this.isBookMark(userId).then(async returnValue=>{
      if(!returnValue){
        await this.addBookMark(userId);
        this.returnUsersArray[index]['imageType'] = 1;
      }
    });
  }

}
