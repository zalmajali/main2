import { Component, OnInit,ViewChild } from '@angular/core';
import {MenuController, Platform, NavController, IonSlides, ModalController, ToastController,IonInput} from '@ionic/angular';
import {Storage} from "@ionic/storage";
import {CategoriesService} from "../../services/categories.service";
import { Network } from '@ionic-native/network/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from "../../services/users.service";
@Component({
  selector: 'app-homeout',
  templateUrl: './homeout.page.html',
  styleUrls: ['./homeout.page.scss'],
})
export class HomeoutPage implements OnInit {
  public categoriesHome:any=0;
  public categories:any='all';
  public operationResult:any;
  public returnCategoriesData:any;
  public returnArrayCategoriesFromServer:any;
  public returnCategoriesArray:any = [];
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
  public newNotifications:any=0;
  public returnNotfiData:any;
  public isActive:any;
  public active:any;
  public message:any;
  public returnDataUser:any;
  public searchVal:any;
  public returnSettingData:any;
  public operationResultVal:any;
  public image:any;
  constructor(private toastCtrl: ToastController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','homeout');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
  }
  checkSearch(event){
    this.searchVal = event;
  }
  searchValues(){
    this.navCtrl.navigateRoot(['/searchout', {searchVal:this.searchVal}])
  }
  async ngOnInit() {
    await this.categoriesService.setting().then(async data=>{
      this.returnSettingData = data;
      this.operationResultVal = this.returnSettingData.Error.ErrorCode;
      if(this.operationResultVal==1){
        await this.storage.set('facebookLink',this.returnSettingData.Data.facebookLink);
        await this.storage.set('youtupeLink',this.returnSettingData.Data.youtupeLink);
        await this.storage.set('instagramLink',this.returnSettingData.Data.instagramLink);
      }
    });
    this.categoriesService.categories().then(data=>{
      this.returnCategoriesData = data;
      this.operationResult = this.returnCategoriesData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayCategoriesFromServer = this.returnCategoriesData.Data.categories;
        for(let i = 0; i < this.returnArrayCategoriesFromServer.length;i++) {
          this.returnCategoriesArray[i]=[];
          this.returnCategoriesArray[i]['id'] = this.returnArrayCategoriesFromServer[i].id;
          this.returnCategoriesArray[i]['title'] = this.returnArrayCategoriesFromServer[i].title;
          this.returnCategoriesArray[i]['image'] = this.returnArrayCategoriesFromServer[i].image;
        }
        let countOfData = this.returnCategoriesArray.length;
        if(countOfData == 0)
          this.categories = 0;
        else{
          this.categories = 1;
        }
      }else
        this.categories = 0;
    });
    await this.checkIfSiteWork();
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
    this.navCtrl.navigateRoot(['/servicesout', {catId:catId,catName:catName}])
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
