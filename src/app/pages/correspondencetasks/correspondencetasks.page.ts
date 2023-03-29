import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import {LoadingController, MenuController, NavController, Platform,ModalController, ToastController,AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {RequestsService} from "../../services/requests.service";
import { Network } from '@ionic-native/network/ngx';
import {HttpClient,HttpEventType} from "@angular/common/http";
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Router,ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {CorrespondenceaddtaskComponent} from "../correspondenceaddtask/correspondenceaddtask.component";
import {SeemessageComponent} from "../seemessage/seemessage.component";
import {UsersService} from "../../services/users.service";
@Component({
  selector: 'app-correspondencetasks',
  templateUrl: './correspondencetasks.page.html',
  styleUrls: ['./correspondencetasks.page.scss'],
})
export class CorrespondencetasksPage implements OnInit {
  public menu3:any;
  public menu5:any;
  public menu6:any;
  public menu7:any;
  public menu8:any;

  public requestsTitle:any;
  public float: any;
  public dir: any;
  public dirTow: any;
  public operationResult:any;
  public returnData:any;
  public returnFullName:any;
  public returnNumber:any;
  public message:any;
  public checkLanguage: any=0;
  public language: string;
  public internetMessage: any;
  public userId:any;
  public departmentId:any;
  public type:any;
  public email:any;
  public imageInformation:any=1;
  public toastStyle:any;
  public sorry:any;
  public sorryReson:any;
  public typeValId:any;
  public requestId:any;
  public backePage:any;
  public getDataByUser:any = 0;
  public newNotifications:any='';
  public returnNotfiData:any;
  public lastStatusVal:any;
  public departmentRequestId:any;

  public replyPlaceholder:any;
  public isErrorReplyMsg:any;
  public errorReply:any="";
  public isErrorReply:any = 1;
  public correspondencesDetails:any;
  public sentFrom:any;
  public sentTo:any;
  public messageReply:any;
  public dateTime:any;
  public you:any;
  public returnReplysData:any;
  public returnArrayReplysFromServer:any;
  public returnReplysArray:any = [];
  public replys:any=2;

  public generalManager:any;
  public maintenanceManager:any;
  public maintenanceSupervisor:any;
  public departmentManager:any;
  public allMaintenanceSupervisors:any;
  public viewMessage:any;
  public taskId:any;
  public arrowBack:any;
  constructor(private nativeHTTP: HTTP,private usersService:UsersService,private iab: InAppBrowser,private alertController:AlertController,private activaterouter : ActivatedRoute,private router : Router,private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private http:HttpClient,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private requestsService:RequestsService,private toastCtrl: ToastController,private loading: LoadingController) {
    this.checkInternetData();
    this.menu.enable(false,"last");
    this.menu.enable(false,"first");
    this.backPageValues();
  }
  initialiseTranslation(){
    this.translate.get('correspondences_details_task').subscribe((res: string) => {
      this.correspondencesDetails = res;
    });
    this.translate.get('sent_from').subscribe((res: string) => {
      this.sentFrom = res;
    });
    this.translate.get('sent_to').subscribe((res: string) => {
      this.sentTo = res;
    });
    this.translate.get('message').subscribe((res: string) => {
      this.messageReply = res;
    });
    this.translate.get('date_time').subscribe((res: string) => {
      this.dateTime = res;
    });
    this.translate.get('you').subscribe((res: string) => {
      this.you = res;
    });
    this.translate.get('general_manager').subscribe((res: string) => {
      this.generalManager = res;
    });
    this.translate.get('maintenance_manager').subscribe((res: string) => {
      this.maintenanceManager = res;
    });
    this.translate.get('maintenance_supervisor').subscribe((res: string) => {
      this.maintenanceSupervisor = res;
    });
    this.translate.get('department_manager').subscribe((res: string) => {
      this.departmentManager = res;
    });
    this.translate.get('all_maintenance_supervisors').subscribe((res: string) => {
      this.allMaintenanceSupervisors = res;
    });
    this.translate.get('floatD').subscribe((res: string) => {
      this.float = res;
    });
    this.translate.get('internet_message').subscribe((res: string) => {
      this.internetMessage = res;
    });
    this.translate.get('dir').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('dirTow').subscribe((res: string) => {
      this.dirTow = res;
    });
    this.translate.get('sorry').subscribe((res: string) => {
      this.sorry = res;
    });
    this.translate.get('sorry_reson').subscribe((res: string) => {
      this.sorryReson = res;
    });
    this.translate.get('view_message').subscribe((res: string) => {
      this.viewMessage = res;
    });
    this.translate.get('arrow_back').subscribe((res: string) => {
      this.arrowBack = res;
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
  async functionGetData(userId:any,requestId:any,taskId:any) {
    this.requestsService.taskReplyUser(userId,requestId,taskId).then(async data=>{
      this.returnReplysData = data;
      this.operationResult = this.returnReplysData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayReplysFromServer = this.returnReplysData.Data.replyes;
        this.returnReplysArray=[];
        for(let i = 0; i < this.returnArrayReplysFromServer.length;i++) {
          this.returnReplysArray[i]=[];
          this.returnReplysArray[i]['id'] = this.returnArrayReplysFromServer[i].id;
          this.returnReplysArray[i]['content'] = this.returnArrayReplysFromServer[i].content;
          this.returnReplysArray[i]['fromName'] = this.returnArrayReplysFromServer[i].fromName;
          this.returnReplysArray[i]['fromNameExiset'] = this.returnArrayReplysFromServer[i].fromNameExiset;
          this.returnReplysArray[i]['fromNameHow'] = this.returnArrayReplysFromServer[i].fromNameHow;
          this.returnReplysArray[i]['departmentsAr'] = this.returnArrayReplysFromServer[i].departmentsAr;
          this.returnReplysArray[i]['departmentsEn'] = this.returnArrayReplysFromServer[i].departmentsEn;
          this.returnReplysArray[i]['toName'] = this.returnArrayReplysFromServer[i].toName;
          this.returnReplysArray[i]['toNameType'] = this.returnArrayReplysFromServer[i].toNameType;
          this.returnReplysArray[i]['seenMessage'] = this.returnArrayReplysFromServer[i].seenMessage;
          if(this.returnReplysArray[i]['seenMessage'] == 1)
            this.returnReplysArray[i]['class'] = "ordersInformationSee";
          else
            this.returnReplysArray[i]['class'] = "ordersInformation";
          this.returnReplysArray[i]['date'] = this.returnArrayReplysFromServer[i].date;
        }
        let countOfData = this.returnReplysArray.length;
        if(countOfData == 0)
          this.replys = 0;
        else{
          this.replys = 1;
        }
      }else
        this.replys = 0;
    }).catch(error=>{
      this.functionGetData(userId,requestId,taskId)
    });
    setTimeout(()=>{
      this.functionGetData(userId,requestId,taskId);
    },2000)
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.checkInternetData();
    this.userId = await this.storage.get('userId');
    this.departmentId = await this.storage.get('departmentId');
    this.type = await this.storage.get('type');
    this.email = await this.storage.get('email');
    if(this.departmentId!=1 && this.type=='suber')
      this.imageInformation = 2;
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
      this.router.navigateByUrl('login');
    }else{
      this.activaterouter.params.subscribe(params => {
        this.requestId = params['requestId'];
        this.taskId = params['taskId'];
        this.backePage = params['page'];
      });
      if(this.departmentId!=1 && this.type=='suber')
        this.getDataByUser = 1;
      else if(this.departmentId!=1 && this.type=='man')
        this.getDataByUser = 2;
      else if(this.departmentId==1 && this.type=='man')
        this.getDataByUser = 3;
      else if(this.departmentId==1 && this.type=='suber')
        this.getDataByUser = 4;
      else if(this.type=='itMan')
        this.getDataByUser = 5;
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 2500,
      });
      await loading.present();
      await this.functionGetData(this.userId,this.requestId,this.taskId);
    }
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
  async functionAddReply(){
    let model = await this.modalController.create({
      component:CorrespondenceaddtaskComponent,
      animated:true,
      componentProps:{requestId:this.requestId,taskId:this.taskId},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then(data=>{
      this.functionGetData(this.userId,this.requestId,this.taskId);
    });
    await model.present();
  }
  async functionSeeMessage(content:any,id:any){
    let model = await this.modalController.create({
      component:SeemessageComponent,
      animated:true,
      componentProps:{content:content,id:id},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then(data=>{
      this.functionGetData(this.userId,this.requestId,this.taskId);
    });
    await model.present();
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
  async backPageValues(){
    this.platform.backButton.subscribeWithPriority(10, async () => {
      if(this.backePage == 1)
        this.navCtrl.navigateRoot("/alltasks");
      if(this.backePage == 2)
        this.navCtrl.navigateRoot("/newtasks");
      if(this.backePage == 3)
        this.navCtrl.navigateRoot("/onholdtasks");
      if(this.backePage == 4)
        this.navCtrl.navigateRoot("/progresstasks");
      if(this.backePage == 5)
        this.navCtrl.navigateRoot("/finishedtasks");
    });
  }
  functionBack(){
    if(this.backePage == 1)
      this.navCtrl.navigateRoot("/alltasks");
    if(this.backePage == 2)
      this.navCtrl.navigateRoot("/newtasks");
    if(this.backePage == 3)
      this.navCtrl.navigateRoot("/onholdtasks");
    if(this.backePage == 4)
      this.navCtrl.navigateRoot("/progresstasks");
    if(this.backePage == 5)
      this.navCtrl.navigateRoot("/finishedtasks");
  }
  functionHome(){
    this.navCtrl.navigateRoot("/home");
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
  functionAccount(){
    this.navCtrl.navigateRoot("/account");
  }
  functionPushNotifications(){
    this.navCtrl.navigateRoot("/pushnotification");
  }
  settings(){
    this.navCtrl.navigateRoot("/settings");
  }
}
