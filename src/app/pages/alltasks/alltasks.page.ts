import { Component, OnInit,ViewChild } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform,ModalController, ToastController,AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {RequestsService} from "../../services/requests.service";
import { Network } from '@ionic-native/network/ngx';
import {HttpClient} from "@angular/common/http";
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Router,ActivatedRoute } from '@angular/router';
import {TasksfilterComponent} from "../tasksfilter/tasksfilter.component";
import {TasksoperationsComponent} from "../tasksoperations/tasksoperations.component";
import { IonInfiniteScroll } from '@ionic/angular';
import {UsersService} from "../../services/users.service";
@Component({
  selector: 'app-alltasks',
  templateUrl: './alltasks.page.html',
  styleUrls: ['./alltasks.page.scss'],
})
export class AlltasksPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public menu3:any;
  public menu5:any;
  public menu6:any;
  public menu7:any;
  public menu8:any;
  public allTasks:any;
  public float: any;
  public dir: any;
  public dirTow: any;
  public operationResult:any;
  public returnData:any;
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
  public arrowBack:any;
  public messageSuccess:any;
  public messageFailedOne:any;
  public messageFailedTow:any;
  public add:any;
  public settingsYas:any;
  public settingsNo:any;
  public returnTasksData:any;
  public returnArrayTasksFromServer:any;
  public returnTasksArray:any = [];
  public tasks:any=2;
  public loopingNumber:any = 1;
  public details:any;
  public start:any;
  public onHold:any;
  public correspondence:any;
  public delete:any;
  public operations:any;
  public finish:any;
  public requestNumber:any;
  public departmentName:any;
  public status:any;
  public assignedBy:any;
  public insertTime:any;
  public manager:any;
  public lastStatusTime:any;
  public by:any;
  public previousEmployee:any;
  public supervisor:any;
  public lastStatusVal:any;
  public new:any;
  public inProgress:any;
  public resolved:any;
  public employee:any;
  public orderId:any=0;
  public departmentSearchId:any;
  public suberViserSearchName:any;
  public statusVal:any;
  public signMsg:any;
  public backePage:any = 0;
  public newNotifications:any='';
  public returnNotfiData:any;
  public assigned:any;
  public alertMsgOne:any;
  public alertMsgTow:any;
  public alertMsgThree:any;
  public alertMsgFor:any;
  public alertMsgFive:any;
  public alertMsgSix:any;
  public alertAllMsg:any;
  public filterOne:any = 0;
  public filterTow:any = 0;
  public taskForUser:any;
  public taskForOrder:any;
  public returnEmployeeData:any;
  public returnArrayEmployeeFromServer:any;
  public fullName:any;
  constructor(private usersService:UsersService,private alertController:AlertController,private activaterouter : ActivatedRoute,private router : Router,private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private http:HttpClient,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private requestsService:RequestsService,private toastCtrl: ToastController,private loading: LoadingController) {
    this.checkInternetData();
    this.menu.enable(false,"last");
    this.menu.enable(false,"first");
    this.backPageValues();
  }
  initialiseTranslation(){
    this.translate.get('all_tasks').subscribe((res: string) => {
      this.allTasks = res;
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
    this.translate.get('add').subscribe((res: string) => {
      this.add = res;
    });
    this.translate.get('arrow_back').subscribe((res: string) => {
      this.arrowBack = res;
    });
    this.translate.get('settings_yas').subscribe((res: string) => {
      this.settingsYas = res;
    });
    this.translate.get('settings_No').subscribe((res: string) => {
      this.settingsNo = res;
    });
    this.translate.get('message_success').subscribe((res: string) => {
      this.messageSuccess = res;
    });
    this.translate.get('message_failed_one').subscribe((res: string) => {
      this.messageFailedOne = res;
    });
    this.translate.get('message_failed_tow').subscribe((res: string) => {
      this.messageFailedTow = res;
    });
    this.translate.get('details').subscribe((res: string) => {
      this.details = res;
    });
    this.translate.get('start').subscribe((res: string) => {
      this.start = res;
    });
    this.translate.get('on_hold').subscribe((res: string) => {
      this.onHold = res;
    });

    this.translate.get('new').subscribe((res: string) => {
      this.new = res;
    });
    this.translate.get('in_progress').subscribe((res: string) => {
      this.inProgress = res;
    });
    this.translate.get('resolved').subscribe((res: string) => {
      this.resolved = res;
    });
    this.translate.get('correspondence').subscribe((res: string) => {
      this.correspondence = res;
    });
    this.translate.get('delete').subscribe((res: string) => {
      this.delete = res;
    });
    this.translate.get('operations').subscribe((res: string) => {
      this.operations = res;
    });
    this.translate.get('finish').subscribe((res: string) => {
      this.finish = res;
    });
    this.translate.get('request_number').subscribe((res: string) => {
      this.requestNumber = res;
    });
    this.translate.get('department_name').subscribe((res: string) => {
      this.departmentName = res;
    });
    this.translate.get('status').subscribe((res: string) => {
      this.status = res;
    });
    this.translate.get('assigned_by').subscribe((res: string) => {
      this.assignedBy = res;
    });
    this.translate.get('manager').subscribe((res: string) => {
      this.manager = res;
    });
    this.translate.get('last_status_time').subscribe((res: string) => {
      this.lastStatusTime = res;
    });
    this.translate.get('by').subscribe((res: string) => {
      this.by = res;
    });
    this.translate.get('previous_employee').subscribe((res: string) => {
      this.previousEmployee = res;
    });
    this.translate.get('supervisor').subscribe((res: string) => {
      this.supervisor = res;
    });
    this.translate.get('employee').subscribe((res: string) => {
      this.employee = res;
    });
    this.translate.get('insert_time').subscribe((res: string) => {
      this.insertTime = res;
    });
    this.translate.get('signMsg').subscribe((res: string) => {
      this.signMsg = res;
    });
    this.translate.get('alert_msg_one').subscribe((res: string) => {
      this.alertMsgOne = res;
    });
    this.translate.get('alert_msg_tow').subscribe((res: string) => {
      this.alertMsgTow = res;
    });
    this.translate.get('alert_msg_three').subscribe((res: string) => {
      this.alertMsgThree = res;
    });
    this.translate.get('alert_msg_for').subscribe((res: string) => {
      this.alertMsgFor = res;
    });
    this.translate.get('alert_msg_five').subscribe((res: string) => {
      this.alertMsgFive = res;
    });
    this.translate.get('alert_msg_six').subscribe((res: string) => {
      this.alertMsgSix = res;
    });

    this.translate.get('task_for_user').subscribe((res: string) => {
      this.taskForUser = res;
    });
    this.translate.get('task_for_order').subscribe((res: string) => {
      this.taskForOrder = res;
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
  async functionGetData(userId,orderId:any=0,departmentId:any=0,assigned:any=0,statusVal:any=5) {
    let limitNew = this.loopingNumber;
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 2500,
    });
    await loading.present();
    this.requestsService.allTasks(userId,orderId,departmentId,assigned,statusVal,limitNew).then(async data=>{
      this.returnTasksData = data;
      this.operationResult = this.returnTasksData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayTasksFromServer = this.returnTasksData.Data.assigned;
        this.returnTasksArray=[];
        for(let i = 0; i < this.returnArrayTasksFromServer.length;i++) {
          this.returnTasksArray[i]=[];
          this.returnTasksArray[i]['id']=this.returnArrayTasksFromServer[i].id;
          this.returnTasksArray[i]['requestId']=this.returnArrayTasksFromServer[i].requestId;
          this.returnTasksArray[i]['employeeName']=this.returnArrayTasksFromServer[i].employeeName;
          this.returnTasksArray[i]['insertTime']=this.returnArrayTasksFromServer[i].insertTime;
          this.returnTasksArray[i]['exisetUser']=this.returnArrayTasksFromServer[i].exisetUser;
          this.returnTasksArray[i]['exisetDepartUser']=this.returnArrayTasksFromServer[i].exisetDepartUser;
          this.returnTasksArray[i]['exisetDepartType']=this.returnArrayTasksFromServer[i].exisetDepartType;
          this.returnTasksArray[i]['employeeDepartName']=this.returnArrayTasksFromServer[i].employeeDepartName;
          this.returnTasksArray[i]['lastStatus']=this.returnArrayTasksFromServer[i].lastStatus;
          if(this.returnArrayTasksFromServer[i].lastStatus == 0)
            this.returnTasksArray[i]['lastStatusVal'] = this.new;
          if(this.returnArrayTasksFromServer[i].lastStatus == 1)
            this.returnTasksArray[i]['lastStatusVal'] = this.inProgress;
          if(this.returnArrayTasksFromServer[i].lastStatus == 2)
            this.returnTasksArray[i]['lastStatusVal'] = this.resolved;
          if(this.returnArrayTasksFromServer[i].lastStatus == 3)
            this.returnTasksArray[i]['lastStatusVal'] = this.onHold;
          this.returnTasksArray[i]['lastStatusTime']=this.returnArrayTasksFromServer[i].lastStatusTime;
          this.returnTasksArray[i]['exisetDepartUserAssigned']=this.returnArrayTasksFromServer[i].exisetDepartUserAssigned;
          this.returnTasksArray[i]['employeeDepartNameAssigned']=this.returnArrayTasksFromServer[i].employeeDepartNameAssigned;
          this.returnTasksArray[i]['show'] = 1;
          await this.storage.get('checkLanguage').then(async checkLanguage=>{
            this.checkLanguage = checkLanguage
          });
          if(this.checkLanguage){
            if(this.language != "en")
              this.returnTasksArray[i]['departmentName'] = this.returnArrayTasksFromServer[i].departmentNameEn;
            else
              this.returnTasksArray[i]['departmentName'] = this.returnArrayTasksFromServer[i].departmentNameEn;
          }else{
            if (window.Intl && typeof window.Intl === 'object') {
              let Val  = navigator.language.split("-");
              if(this.language != "en")
                this.returnTasksArray[i]['departmentName'] = this.returnArrayTasksFromServer[i].departmentNameEn;
              else
                this.returnTasksArray[i]['departmentName'] = this.returnArrayTasksFromServer[i].departmentNameEn;
            }
            else{
              this.globalization.getPreferredLanguage().then(res => {
                let Val  = res.value.split("-");
                if(this.language != "en")
                  this.returnTasksArray[i]['departmentName'] = this.returnArrayTasksFromServer[i].departmentNameEn;
                else
                  this.returnTasksArray[i]['departmentName'] = this.returnArrayTasksFromServer[i].departmentNameEn;
              }).catch(e => {console.log(e);});
            }
          }
        }
        let countOfData = this.returnTasksArray.length;
        if(countOfData == 0)
          this.tasks = 0;
        else{
          this.tasks = 1;
        }
      }else
        this.tasks = 0;
    }).catch(error=>{
      this.functionGetData(userId,orderId,departmentId,assigned,statusVal)
    });
  }
  functionInformation(userId){
    this.usersService.employeeInfo(userId).then(async data=>{
      this.returnEmployeeData = data;
      this.operationResult = this.returnEmployeeData.Error.ErrorCode;
      if(this.operationResult==1){
        this.fullName = this.returnEmployeeData.Data.fullName;
      }
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.checkInternetData();
    this.storage.remove('orderIdTask');
    this.storage.remove('departmentSearchIdTask');
    this.storage.remove('suberViserSearchNameTask');
    this.storage.remove('statusValTask');
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
      this.navCtrl.navigateRoot('/login');
    }else{
      this.activaterouter.params.subscribe(params => {
        this.orderId = params['requestId'];
        if(this.orderId == null || this.orderId == "" || this.orderId==undefined || this.orderId==0){
          this.orderId = 0;
        }else
          this.filterOne = 1;
        this.suberViserSearchName = params['assigned'];
        if(this.suberViserSearchName == null || this.suberViserSearchName == "" || this.suberViserSearchName==undefined || this.suberViserSearchName==0){
          this.suberViserSearchName = 0;
        }else
          this.filterTow = 1;
        this.backePage = params['page'];
      });
      this.functionGetData(this.userId,this.orderId,0,this.suberViserSearchName)
    }
    if(this.filterTow == 1)
      await this.functionInformation(this.suberViserSearchName);
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
  async backPageValues(){
    this.platform.backButton.subscribeWithPriority(10, async () => {
      if(this.backePage!=undefined){
        if(this.backePage == 1)
          this.navCtrl.navigateRoot("/allrequest");
        else if(this.backePage == 4)
          this.navCtrl.navigateRoot("/processingrequests");
        else if(this.backePage == 11)
          this.navCtrl.navigateRoot("/onerequest");
        else
          this.navCtrl.navigateRoot("/myrequests");
      }else
        this.navCtrl.navigateRoot("/home");
    });
  }
  async filterVal(){
    let model = await this.modalController.create({
      component:TasksfilterComponent,
      animated:true,
      componentProps:{page:1,selectedOrderId:this.orderId,assignedUserId:this.suberViserSearchName},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then(data=>{
      this.orderId = data.data.orderId;
      this.departmentSearchId = data.data.departmentSearchId;
      this.suberViserSearchName = data.data.suberViserSearchName;
      this.statusVal = data.data.statusVal;
      if(this.orderId == null || this.orderId == 0  || this.orderId == "")
        this.orderId = 0;
      if(this.departmentSearchId == 0 || this.departmentSearchId == null || this.departmentSearchId == "")
        this.departmentSearchId = 0;
      if(this.suberViserSearchName == 0 || this.suberViserSearchName == null || this.suberViserSearchName == "")
        this.suberViserSearchName = 0;
      if(this.statusVal == 0 || this.statusVal == null || this.statusVal == "")
        this.statusVal = 0;
      this.functionGetData(this.userId,this.orderId,this.departmentSearchId,this.suberViserSearchName,this.statusVal)
    });
    await model.present();
  }
  loadMoreData(event) {
    this.loopingNumber++;
    setTimeout(() => {
      this.functionGetData(this.userId,this.orderId,this.departmentSearchId,this.suberViserSearchName,this.statusVal)
      event.target.complete();
      if (this.loopingNumber >= 200) {
        event.target.disabled = true;
      }
    }, 2000);
  }
  refrechAllPage(event) {
    this.loopingNumber = 1;
    this.functionGetData(this.userId,this.orderId,this.departmentSearchId,this.suberViserSearchName,this.statusVal)
    setTimeout(() => {
      event.target.complete();
    }, 2000);
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  async functionTaskDetails(taskId,index){
    this.navCtrl.navigateRoot(["/taskdetails", {taskId:taskId,page:1}]);
  }
  async functionTaskCorrespondence(taskId,index,requestId){
    this.navCtrl.navigateRoot(["/correspondencetasks", {requestId:requestId,taskId:taskId,filterOne:this.filterOne,filterTow:this.filterTow,orderId:this.orderId,suberViserSearchName:this.suberViserSearchName,backePage:this.backePage,page:1}]);
  }
  async functionTaskStart(taskId,requestId,index){
    this.alertAllMsg = this.alertMsgSix+" #"+requestId+" "+this.signMsg;
    const alert = await this.alertController.create({
      cssClass: 'alertBac',
      mode: 'ios',
      message: this.alertAllMsg,
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
            this.requestsService.taskProceed(taskId,this.userId).then(async data=>{
              this.returnTasksData = data;
              this.operationResult = this.returnTasksData.Error.ErrorCode;
              if(this.operationResult==1){
                this.displayResult(this.messageSuccess);
                this.returnTasksArray[index]['lastStatus'] = 1;
              }
              else if(this.operationResult==2)
                this.displayResult(this.messageFailedOne);
              else
                this.displayResult(this.messageFailedTow);
            });
          }
        }
      ]
    });
    await alert.present();
  }
  async functionTaskHold(taskId,requestId,index){
    this.alertAllMsg = this.alertMsgTow+" #"+requestId+" "+this.signMsg;
    const alert = await this.alertController.create({
      cssClass: 'alertBac',
      mode: 'ios',
      message: this.alertAllMsg,
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
            this.requestsService.taskHold(taskId,this.userId).then(async data=>{
              this.returnTasksData = data;
              this.operationResult = this.returnTasksData.Error.ErrorCode;
              if(this.operationResult==1){
                this.displayResult(this.messageSuccess);
                this.returnTasksArray[index]['lastStatus'] = 3;
              }
              else if(this.operationResult==2)
                this.displayResult(this.messageFailedOne);
              else
                this.displayResult(this.messageFailedTow);
            });
          }
        }
      ]
    });
    await alert.present();
  }
  async functionTaskDelete(taskId,requestId,index){
    this.alertAllMsg = this.alertMsgThree+" #"+requestId+" "+this.signMsg;
    const alert = await this.alertController.create({
      cssClass: 'alertBac',
      mode: 'ios',
      message: this.alertAllMsg,
      buttons: [
        {
          text: this.settingsNo,
          cssClass: 'alertButton',
          handler: () => {
          }
        }, {
          text: this.settingsYas,
          cssClass: 'alertButton',
          handler: () => {
            this.requestsService.taskDelete(taskId,this.userId).then(async data=>{
              this.returnTasksData = data;
              this.operationResult = this.returnTasksData.Error.ErrorCode;
              if(this.operationResult==1){
                this.displayResult(this.messageSuccess);
                this.returnTasksArray[index]['show'] = 0;
              }
              else if(this.operationResult==2)
                this.displayResult(this.messageFailedOne);
              else
                this.displayResult(this.messageFailedTow);
            });
          }
        }
      ]
    });
    await alert.present();
  }
  async functionTaskOperations(taskId,index){
    let model = await this.modalController.create({
      component:TasksoperationsComponent,
      animated:true,
      componentProps:{taskId:taskId,orderId:this.returnTasksArray[index]['requestId'],selectedOrderId:this.orderId},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then(data=>{
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
  functionBackHome(){
    if(this.backePage!=undefined){
      if(this.backePage == 1)
        this.navCtrl.navigateRoot("/allrequest");
      else if(this.backePage == 2)
        this.navCtrl.navigateRoot("/approvedrequests");
      else if(this.backePage == 3)
        this.navCtrl.navigateRoot("/canceledrequests");
      else if(this.backePage == 4)
        this.navCtrl.navigateRoot("/processingrequests");
      else if(this.backePage == 6)
        this.navCtrl.navigateRoot("/finishedrequests");
      else if(this.backePage == 7)
        this.navCtrl.navigateRoot("/myrequests");
      else if(this.backePage == 11)
        this.navCtrl.navigateRoot("/onerequest");
      else if(this.backePage == 10)
        this.navCtrl.navigateRoot("/team");
    }else
      this.navCtrl.navigateRoot("/home");
  }
  functionAddTask(){
    if(this.filterOne == 0 && this.filterOne==0)
      this.navCtrl.navigateRoot(["/addnewtask", {backPage:this.backePage,taskPage:1}]);
    if(this.filterOne == 1)
      this.navCtrl.navigateRoot(["/addnewtaskorder", {requestId:this.orderId,backPage:this.backePage}]);
    if(this.filterTow == 1)
      this.navCtrl.navigateRoot(["/addnewtaskuser", {suberViserSearchName:this.suberViserSearchName,backPage:this.backePage}]);
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
