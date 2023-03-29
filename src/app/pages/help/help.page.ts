import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {MenuController, Platform, NavController, IonSlides, ModalController, ToastController,IonInput} from '@ionic/angular';
import {Storage} from "@ionic/storage";
import {CategoriesService} from "../../services/categories.service";
import { Network } from '@ionic-native/network/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from "../../services/users.service";
@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  public questionsSkeleton:boolean = true;
  public returnQuestionsData:any;
  public returnArrayQuestionsFromServer:any;
  public returnQuestionsArray:any = [];
  public operationResult:any;
  public questions:any=1;
  public fullNameLogin:any;
  public emailLogin:any;
  public iconValues = "chevron-back-outline";
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
  public returnDataUser:any;
  constructor(private toastCtrl: ToastController,private modalController: ModalController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','help');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
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
    this.categoriesService.questions().then(data=>{
      this.returnQuestionsData = data;
      this.operationResult = this.returnQuestionsData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayQuestionsFromServer = this.returnQuestionsData.Data.questions;
        for(let i = 0; i < this.returnArrayQuestionsFromServer.length;i++) {
          this.returnQuestionsArray[i]=[];
          this.returnQuestionsArray[i]['id'] = this.returnArrayQuestionsFromServer[i].id;
          this.returnQuestionsArray[i]['question'] = this.returnArrayQuestionsFromServer[i].question;
          this.returnQuestionsArray[i]['answer'] = this.returnArrayQuestionsFromServer[i].answer;
          this.returnQuestionsArray[i]['show'] = 0;
          this.returnQuestionsArray[i]['icon'] = "chevron-back-outline";
        }
        let countOfData = this.returnQuestionsArray.length;
        if(countOfData == 0)
          this.questions = 0;
        else{
          this.questions = 1;
        }
      }else
        this.questions = 0;
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
    })
    await this.checkIfSiteWork();
    this.notifications();
  }
  functionshowValuse(index:any){
    if(this.returnQuestionsArray[index]['show'] == 1){
      this.returnQuestionsArray[index]['icon'] = "chevron-back-outline";
      this.returnQuestionsArray[index]['show'] = 0;
    }else{
      this.returnQuestionsArray[index]['icon'] = "chevron-down-outline";
      this.returnQuestionsArray[index]['show'] = 1;
    }
  }
  functionPushNotifications(){
    this.navCtrl.navigateRoot("/pushnotification");
  }
  ///hear all values
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
