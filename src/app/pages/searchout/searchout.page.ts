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
  selector: 'app-searchout',
  templateUrl: './searchout.page.html',
  styleUrls: ['./searchout.page.scss'],
})
export class SearchoutPage implements OnInit {
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
      this.storage.set('thisPageReturn','homeout');
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
    this.activaterouter.params.subscribe(params => {
      if(params['searchVal']!="" && params['searchVal']!=null && params['searchVal']!=undefined && params['searchVal']!=0)
        this.searchVal = params['searchVal'];
    });
    this.functionGetData(this.userId,this.searchVal);
  }
  functionUserDetalis(userId:any){
    this.navCtrl.navigateRoot(['/servicesdetalisout', {userSelectId:userId,pageNum:1}])
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
  async functionOpenMenue(){
    this.menu.enable(true,"first");
    this.menu.open("first");
  }
}
