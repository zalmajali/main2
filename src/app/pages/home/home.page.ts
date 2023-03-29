import { Component, OnInit } from '@angular/core';
import {ViewChild,ElementRef } from '@angular/core';
import {MenuController, Platform, NavController, IonSlides, ModalController, ToastController,IonInput,LoadingController,IonInfiniteScroll,AlertController} from '@ionic/angular';
import {Storage} from "@ionic/storage";
import {OperationsService} from "../../services/operations.service";
import { Network } from '@ionic-native/network/ngx';
import {SearchComponent} from "../search/search.component";
import {AboutComponent} from "../about/about.component";
import { Router,ActivatedRoute } from '@angular/router';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {UsersService} from "../../services/users.service";
import {RequestsService} from "../../services/requests.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public menu3:any;
  public menu5:any;
  public menu6:any;
  public menu7:any;
  public menu8:any;
  public menu2:any;

  public loginTitle:any;
  public float: any;
  public floatTow: any;
  public dir: any;
  public operationResult:any;
  public returnData:any;
  public returnFullName:any;
  public returnNumber:any;

  public loadingShow:any = 0;
  public message:any;
  public checkLanguage: any=0;
  public language: string;
  public internetMessage: any;
  public userId:any;
  public departmentId:any;
  public type:any;
  public email:any;
  public photo:any;
  public fullName:any;

  public addRequest:any;
  public hello:any;
  public newRequests:any;
  public pushNotification:any;
  public approvedRequests:any;
  public unapprovedRequests:any;
  public finishedRequests:any;
  public canceledRequests:any;
  public processingRequests:any;
  public pendingRequests:any;
  public today:any;
  public mr:any;
  public firstMenue:any;
  public lastMenue:any;
  public therdMenue:any;
  public signOut;
  public signMsg:any;
  public settingsYas:any;
  public settingsNo:any;
  public imageInformation:any=1;
  public toastStyle:any;
  public departmentName:any;
  public myOrders:any;
  public allRequests:any;
  public allTasks:any;
  public newTasks:any;
  public inProgressTasks:any;
  public onHoldTasks:any;
  public finishedTasks:any;
  public addNewtask:any;
  public newNotifications:any='';
  public returnNotfiData:any;
  public iconValues:any="down";
  public iconValuesTow:any="down";
  public iconValuesThree:any="down";
  public showValues:any=1;
  public showValuesTow:any=1;
  public showValuesThree:any=1;
  public showLastMenue:any=0;
  public showFirstMenue:any=0;
  public ordersSystem:any=0;
  public tasksSystem:any=0;
  public systemOperation:any=0;
  public returnStatuseData:any;
  public viceManager:any=0;

  public showValuesClass:any="";
  public showValuesTowClass:any="";
  public showValuesThreeClass:any="";
  public selectUserValuesType:any;
  public supervisor:any;
  public administration:any;
  public manager:any;
  public incomingCorrespondenceList:any;
  public returnReplysData:any;
  public countOfMsseage:any;
  public showValuesSelect:any;
  constructor(private requestsService:RequestsService,private usersService:UsersService,private alertController:AlertController,private globalization: Globalization, private translate: TranslateService,private activaterouter : ActivatedRoute,private router : Router,private network:Network,private menu:MenuController,private modalController: ModalController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private operationsService:OperationsService,private toastCtrl: ToastController,private loading: LoadingController) {
    this.checkInternetData();
    this.menu.enable(false,"last");
    this.menu.enable(false,"first");
    this.getDeviceLanguage();
  }
  initialiseTranslation(){
    this.translate.get('floatD').subscribe((res: string) => {
      this.float = res;
    });
    this.translate.get('floatTow').subscribe((res: string) => {
      this.floatTow = res;
    });
    this.translate.get('internet_message').subscribe((res: string) => {
      this.internetMessage = res;
    });
    this.translate.get('dir').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('add_request').subscribe((res: string) => {
      this.addRequest = res;
    });
    this.translate.get('hello').subscribe((res: string) => {
      this.hello = res;
    });
    this.translate.get('new_requests').subscribe((res: string) => {
      this.newRequests = res;
    });
    this.translate.get('push_notification').subscribe((res: string) => {
      this.pushNotification = res;
    });
    this.translate.get('approved_requests').subscribe((res: string) => {
      this.approvedRequests = res;
    });
    this.translate.get('finished_requests').subscribe((res: string) => {
      this.finishedRequests = res;
    });
    this.translate.get('all_requests').subscribe((res: string) => {
      this.allRequests = res;
    });
    this.translate.get('canceled_requests').subscribe((res: string) => {
      this.canceledRequests = res;
    });
    this.translate.get('processing_requests').subscribe((res: string) => {
      this.processingRequests = res;
    });
    this.translate.get('pending_requests').subscribe((res: string) => {
      this.pendingRequests = res;
    });
    this.translate.get('mr').subscribe((res: string) => {
      this.mr = res;
    });
    this.translate.get('menu2').subscribe((res: string) => {
      this.menu2 = res;
    });
    this.translate.get('signOut').subscribe((res: string) => {
      this.signOut = res;
    });
    this.translate.get('settings_yas').subscribe((res: string) => {
      this.settingsYas = res;
    });
    this.translate.get('settings_No').subscribe((res: string) => {
      this.settingsNo = res;
    });
    this.translate.get('signMsg').subscribe((res: string) => {
      this.signMsg = res;
    });
    this.translate.get('my_rders').subscribe((res: string) => {
      this.myOrders = res;
    });
    this.translate.get('all_tasks').subscribe((res: string) => {
      this.allTasks = res;
    });
    this.translate.get('new_tasks').subscribe((res: string) => {
      this.newTasks = res;
    });
    this.translate.get('in_progress_tasks').subscribe((res: string) => {
      this.inProgressTasks = res;
    });
    this.translate.get('on_hold_tasks').subscribe((res: string) => {
      this.onHoldTasks = res;
    });
    this.translate.get('finished_tasks').subscribe((res: string) => {
      this.finishedTasks = res;
    });
    this.translate.get('add_new_task').subscribe((res: string) => {
      this.addNewtask = res;
    });
    this.translate.get('orders_system').subscribe((res: string) => {
      this.ordersSystem = res;
    });
    this.translate.get('tasks_system').subscribe((res: string) => {
      this.tasksSystem = res;
    });
    this.translate.get('system_operation').subscribe((res: string) => {
      this.systemOperation = res;
    });
    this.translate.get('supervisor').subscribe((res: string) => {
      this.supervisor = res;
    });
    this.translate.get('manager').subscribe((res: string) => {
      this.manager = res;
    });
    this.translate.get('administration').subscribe((res: string) => {
      this.administration = res;
    });
    this.translate.get('incoming_correspondence_list').subscribe((res: string) => {
      this.incomingCorrespondenceList = res;
    });
    //menue
    //last menue
    this.translate.get('menu3').subscribe((res: string) => {
      this.menu3 = res;
    });
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
  async functionChangeVal(){
    this.showValuesTow = 1;
    this.iconValuesTow = "down";
    this.showValuesThree = 1;
    this.iconValuesThree = "down";
    this.showValuesTowClass = ""
    this.showValuesThreeClass = ""
    if(this.showValues == 1){
      this.showValues = 2;
      this.iconValues = "up";
      this.showValuesClass = "#dbf4fd"
      await this.storage.set('showValuesSelect',1);
    }else{
      this.showValues = 1;
      this.iconValues = "down";
      this.showValuesClass = ""
    }
  }
  async functionChangeValTow(){
    this.showValues = 1;
    this.iconValues = "down";
    this.showValuesThree = 1;
    this.iconValuesThree = "down";
    this.showValuesClass = ""
    this.showValuesThreeClass = ""
    if(this.showValuesTow == 1){
      this.showValuesTow = 2;
      this.iconValuesTow = "up";
      this.showValuesTowClass = "#dbf4fd"
      await this.storage.set('showValuesSelect',2);
    }else{
      this.showValuesTow = 1;
      this.iconValuesTow = "down";
      this.showValuesTowClass = ""
    }
  }
  async functionChangeValThree(){
    this.showValues = 1;
    this.iconValues = "down";
    this.showValuesTow = 1;
    this.iconValuesTow = "down";
    this.showValuesClass = ""
    this.showValuesTowClass = ""
    if(this.showValuesThree == 1){
      this.showValuesThree = 2;
      this.iconValuesThree = "up";
      this.showValuesThreeClass = "#dbf4fd"
      await this.storage.set('showValuesSelect',3);
    }else{
      this.showValuesThree = 1;
      this.iconValuesThree = "down";
      this.showValuesThreeClass = ""
    }
  }
  async functioGoToPage(link:any,number){
  if(number == 12){
    let model = await this.modalController.create({
      component:AboutComponent,
      animated:true,
      mode:"ios",
      cssClass:"modalFilterSortCss"
    });
    await model.present();
  }
  else if(number == 13){
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
  }else
    this.navCtrl.navigateRoot([link])
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.checkInternetData();
    this.fullName = await this.storage.get('fullName');
    this.userId = await this.storage.get('userId');
    this.departmentId = await this.storage.get('departmentId');
    this.type = await this.storage.get('type');
    this.email = await this.storage.get('email');
    this.showValuesSelect = await this.storage.get('showValuesSelect');
    if(this.showValuesSelect == 1)
      this.functionChangeVal()
    if(this.showValuesSelect == 2)
      this.functionChangeValTow()
    if(this.showValuesSelect == 3)
      this.functionChangeValThree()
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
      this.navCtrl.navigateRoot('login');
    }
    if(this.departmentId!=1 && this.type=='suber'){
      this.selectUserValuesType = this.supervisor
      this.imageInformation = 2;
      this.showFirstMenue = 1
      this.firstMenue = [
        {title:this.addRequest,image:"../../assets/imgs/icon/addOrders.png", url: '/addrequest',number:'0'},
        {title:this.myOrders,image:"../../assets/imgs/icon/myOrders.png", url: '/myrequests',number:'0'},
      ];
      this.therdMenue = [
        {title:this.menu3,image:"../../assets/imgs/icon/setting.png", url: '/settings',number:'0'},
        {title:this.menu2,image:"../../assets/imgs/icon/about.png", url: '/about',number:'12'},
        {title:this.signOut,image:"../../assets/imgs/icon/signout.png", url: '/login',number:'13'}
      ];
    }else if(this.departmentId==1 && this.type=='suber'){
      this.selectUserValuesType = this.supervisor
      await this.checkStatuse();
      this.showLastMenue = 1;
      if(this.viceManager == 1){
        this.showFirstMenue = 1
      }
      this.firstMenue = [
        {title:this.finishedRequests,image:"../../assets/imgs/icon/finishedOrder.png", url: '/finishedrequests',number:'0'},
      ];
      this.lastMenue = [
        {title:this.newTasks,image:"../../assets/imgs/icon/addNewTask.png", url: '/newtasks',number:'0'},
        {title:this.inProgressTasks,image:"../../assets/imgs/icon/inprogressTask.png", url: '/progresstasks',number:'0'},
        {title:this.onHoldTasks,image:"../../assets/imgs/icon/holdTask.png", url: '/onholdtasks',number:'0'},
        {title:this.finishedTasks,image:"../../assets/imgs/icon/finishedTasks.png", url: '/finishedtasks',number:'0'},
      ];
      this.therdMenue = [
        {title:this.incomingCorrespondenceList,image:"../../assets/imgs/icon/incoming.png", url: '/incomingreplies',number:'0'},
        {title:this.pushNotification,image:"../../assets/imgs/icon/push.png", url: '/pushnotification',number:'0'},
        {title:this.menu3,image:"../../assets/imgs/icon/setting.png", url: '/settings',number:'0'},
        {title:this.menu2,image:"../../assets/imgs/icon/about.png", url: '/about',number:'12'},
        {title:this.signOut,image:"../../assets/imgs/icon/signout.png", url: '/login',number:'13'}
      ];
    }else if(this.departmentId!=1 && this.type=='man'){
      this.selectUserValuesType = this.manager
      this.showFirstMenue = 1
      this.firstMenue = [
        {title:this.addRequest,image:"../../assets/imgs/icon/addOrders.png", url: '/addrequest',number:'0'},
        {title:this.myOrders,image:"../../assets/imgs/icon/myOrders.png", url: '/myrequests',number:'0'},
        {title:this.allRequests,image:"../../assets/imgs/icon/allOrders.png", url: '/allrequest',number:'0'},
        {title:this.newRequests,image:"../../assets/imgs/icon/newOrder.png", url: '/newrequest',number:'0'},
        {title:this.approvedRequests,image:"../../assets/imgs/icon/approvedOrder.png", url: '/approvedrequests',number:'0'},
        {title:this.processingRequests,image:"../../assets/imgs/icon/processingOrder.png", url: '/processingrequests',number:'0'},
        {title:this.finishedRequests,image:"../../assets/imgs/icon/finishedOrder.png", url: '/finishedrequests',number:'0'},
        {title:this.canceledRequests,image:"../../assets/imgs/icon/canceldOrder.png", url: '/canceledrequests',number:'0'},
      ];
      this.therdMenue = [
        {title:this.incomingCorrespondenceList,image:"../../assets/imgs/icon/incoming.png", url: '/incomingreplies',number:'0'},
        {title:this.pushNotification,image:"../../assets/imgs/icon/push.png", url: '/pushnotification',number:'0'},
        {title:this.menu3,image:"../../assets/imgs/icon/setting.png", url: '/settings',number:'0'},
        {title:this.menu2,image:"../../assets/imgs/icon/about.png", url: '/about',number:'12'},
        {title:this.signOut,image:"../../assets/imgs/icon/signout.png", url: '/login',number:'13'}
      ];
    }else if(this.departmentId==1 && this.type=='man'){
      this.selectUserValuesType = this.manager
      this.showLastMenue = 1;
      this.showFirstMenue = 1
      this.firstMenue = [
        {title:this.addRequest,image:"../../assets/imgs/icon/addOrders.png", url: '/addrequest',number:'0'},
        {title:this.myOrders,image:"../../assets/imgs/icon/myOrders.png", url: '/myrequests',number:'0'},
        {title:this.allRequests,image:"../../assets/imgs/icon/allOrders.png", url: '/allrequest',number:'0'},
        {title:this.approvedRequests,image:"../../assets/imgs/icon/approvedOrder.png", url: '/approvedrequests',number:'0'},
        {title:this.processingRequests,image:"../../assets/imgs/icon/processingOrder.png", url: '/processingrequests',number:'0'},
        {title:this.finishedRequests,image:"../../assets/imgs/icon/finishedOrder.png", url: '/finishedrequests',number:'0'},
        {title:this.canceledRequests,image:"../../assets/imgs/icon/canceldOrder.png", url: '/canceledrequests',number:'0'},
      ];
      this.lastMenue = [
        {title:this.allTasks,image:"../../assets/imgs/icon/allTaskss.png", url: '/alltasks',number:'0'},
        {title:this.addNewtask,image:"../../assets/imgs/icon/addNewTask.png", url: '/addnewtask',number:'0'},
        {title:this.newTasks,image:"../../assets/imgs/icon/newTaskss.png", url: '/newtasks',number:'0'},
        {title:this.inProgressTasks,image:"../../assets/imgs/icon/inprogressTask.png", url: '/progresstasks',number:'0'},
        {title:this.onHoldTasks,image:"../../assets/imgs/icon/holdTask.png", url: '/onholdtasks',number:'0'},
        {title:this.finishedTasks,image:"../../assets/imgs/icon/finishedTasks.png", url: '/finishedtasks',number:'0'},
      ];
      this.therdMenue = [
        {title:this.incomingCorrespondenceList,image:"../../assets/imgs/icon/incoming.png", url: '/incomingreplies',number:'0'},
        {title:this.pushNotification,image:"../../assets/imgs/icon/push.png", url: '/pushnotification',number:'0'},
        {title:this.menu3,image:"../../assets/imgs/icon/setting.png", url: '/settings',number:'0'},
        {title:this.menu2,image:"../../assets/imgs/icon/about.png", url: '/about',number:'12'},
        {title:this.signOut,image:"../../assets/imgs/icon/signout.png", url: '/login',number:'13'}
      ];
    }else if(this.type=='itMan'){
      this.selectUserValuesType = this.supervisor
      this.showFirstMenue = 1
      this.firstMenue = [
        {title:this.allRequests,image:"../../assets/imgs/icon/allOrders.png", url: '/allrequest',number:'0'},
        {title:this.approvedRequests,image:"../../assets/imgs/icon/approvedOrder.png", url: '/approvedrequests',number:'0'},
        {title:this.processingRequests,image:"../../assets/imgs/icon/processingOrder.png", url: '/processingrequests',number:'0'},
        {title:this.finishedRequests,image:"../../assets/imgs/icon/finishedOrder.png", url: '/finishedrequests',number:'0'},
        {title:this.canceledRequests,image:"../../assets/imgs/icon/canceldOrder.png", url: '/canceledrequests',number:'0'},
      ];
      this.therdMenue = [
        {title:this.incomingCorrespondenceList,image:"../../assets/imgs/icon/incoming.png", url: '/incomingreplies',number:'0'},
        {title:this.pushNotification,image:"../../assets/imgs/icon/push.png", url: '/pushnotification',number:'0'},
        {title:this.menu3,image:"../../assets/imgs/icon/setting.png", url: '/settings',number:'0'},
        {title:this.menu2,image:"../../assets/imgs/icon/about.png", url: '/about',number:'12'},
        {title:this.signOut,image:"../../assets/imgs/icon/signout.png", url: '/login',number:'13'}
      ];
    }
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    if(this.checkLanguage){
      if(this.language != "en")
        this.departmentName = await this.storage.get('departmentNameEn');
      else
        this.departmentName = await this.storage.get('departmentNameEn');
    }else{
      if (window.Intl && typeof window.Intl === 'object') {
        let Val  = navigator.language.split("-");
        if(this.language != "en")
          this.departmentName = await this.storage.get('departmentNameEn');
        else
          this.departmentName = await this.storage.get('departmentNameEn');
      }
      else{
        this.globalization.getPreferredLanguage().then(async res => {
          let Val  = res.value.split("-");
          if(this.language != "en")
            this.departmentName = await this.storage.get('departmentNameAr');
          else
            this.departmentName = await this.storage.get('departmentNameEn');
        }).catch(e => {console.log(e);});
      }
    }
    this.photo = await this.storage.get('photo');
    if(this.photo =="" || this.photo==undefined || this.photo==0 || this.photo==null)
      this.photo = "../../assets/imgs/person-icon-1687.png";
    this.today = Date.now();
    this.requestsService.incomingReplyUser(this.userId).then(async data=>{
      this.returnReplysData = data;
      this.operationResult = this.returnReplysData.Error.ErrorCode;
      if(this.operationResult==1){
        this.countOfMsseage = this.returnReplysData.Data.counterRe;
      }
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
  async checkStatuse(){
    this.usersService.checkStatuse(this.userId).then(async data=>{
      this.returnStatuseData = data;
      this.operationResult = this.returnStatuseData.Error.ErrorCode;
      if(this.operationResult==1){
        this.viceManager = this.returnStatuseData.Data.viceManager;
        if(this.viceManager == 1)
          this.showFirstMenue=1;
        else
          this.showFirstMenue=0;
      }else{
        this.viceManager = 0;
        this.showFirstMenue=0;
      }
    }).catch(e=>{
      this.viceManager = 0;
      this.showFirstMenue=0;
    })
    setTimeout(()=>{
      this.checkStatuse();
    },2000)
  }
  async getDeviceLanguage() {
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    if(this.checkLanguage){
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
      duration: 3000,
      position: 'bottom',
      cssClass:this.toastStyle,
      color:""
    });
    await toast.present();
  }
  //all pages
  functionAddRequest(){
    this.navCtrl.navigateRoot("/addrequest");
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
  functionAddrequest(){
    this.navCtrl.navigateRoot("/addrequest");
  }
  functionTeam(){
    this.navCtrl.navigateRoot("/team");
  }
  functionNewtasks(){
    this.navCtrl.navigateRoot("/newtasks");
  }
  functionAllrequest(){
    this.navCtrl.navigateRoot("/allrequest");
  }
  functionProgressTasks(){
    this.navCtrl.navigateRoot("/progresstasks");
  }
  settings(){
    this.navCtrl.navigateRoot("/settings");
  }
}
