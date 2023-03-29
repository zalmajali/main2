import { Component, OnInit,Input } from '@angular/core';
import {Storage} from '@ionic/storage';
import {LoadingController, MenuController, NavController, Platform,ModalController, ToastController,AlertController} from "@ionic/angular";
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Router,ActivatedRoute } from '@angular/router';
import {RequestsService} from "../../services/requests.service";
import { Network } from '@ionic-native/network/ngx';
@Component({
  selector: 'app-correspondenceadd',
  templateUrl: './correspondenceadd.component.html',
  styleUrls: ['./correspondenceadd.component.scss'],
})
export class CorrespondenceaddComponent implements OnInit {
  @Input() requestId: string;
  public float: any;
  public dir: any;
  public dirTow: any;
  public checkLanguage: any=0;
  public language: string;
  public cancelledReason:any;
  public cancel:any;

  public insertTime:any;
  public department:any;
  public status:any;
  public formerEmployee:any;
  public by:any;
  public manager:any;
  public sorry:any;
  public sorryReson:any;
  public mainLog:any;
  public operationResult:any;
  public returnData:any;
  public returninfoArray:any = [];
  public returnArrayinfoFromServer:any;
  public ShowVal: any = 1;
  public supervisor: any;
  public new: any;
  public approved: any;
  public inProgress: any;
  public resolved: any;
  public canceled: any;
  public reopened: any;
  public userId:any;
  public returnRequestData:any;
  public returnArrayRequestFromServer:any;
  public returnRequestArray:any = [];
  public lastStatusVal:any;
  public departmentRequestId:any;
  public departmentId:any;
  public message:any;
  public type:any;
  public email:any;
  public getDataByUser:any = 0;
  public internetMessage: any;
  public toastStyle:any;
  public generalManager:any;
  public departmentManager:any;
  public maintenanceSupervisors:any;
  public maintenanceManager:any;
  public all:any;
  public settingsYas:any;
  public settingsNo:any;
  public add:any;
  public replyPlaceholder:any;
  public isErrorReplyMsg:any;
  public errorReply:any="";
  public isErrorReply:any = 1;
  public taskUsers:any;

  public returnAssignedData:any;
  public returnArrayAssignedFromServer:any;
  public returnAssignedArray:any = [];

  public selectTypeToSened:any=0;
  public showSelect:any=0;

  public selectUserWork=0;
  public replyMsg:any;
  public isdisabled:boolean=true;

  public addMessageSuccess:any;
  public addMessageFailedOne:any;
  public addMessageFaileTow:any;
  public imageInformation:any;
  public sendMessage:any;
  public sendMessageTo:any;
  public showToAdmin:any;
  constructor(private requestsService:RequestsService,private loading: LoadingController,private toastCtrl: ToastController,private network:Network,private activaterouter : ActivatedRoute,private router : Router,private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private storage: Storage,private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
  }
  initialiseTranslation(){
    this.translate.get('floatD').subscribe((res: string) => {
      this.float = res;
    });
    this.translate.get('send_message').subscribe((res: string) => {
      this.sendMessage = res;
    });
    this.translate.get('send_message_to').subscribe((res: string) => {
      this.sendMessageTo = res;
    });
    this.translate.get('cancel').subscribe((res: string) => {
      this.cancel = res;
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
    this.translate.get('cancelled_reason').subscribe((res: string) => {
      this.cancelledReason = res;
    });
    this.translate.get('cancel').subscribe((res: string) => {
      this.cancel = res;
    });
    this.translate.get('insert_time').subscribe((res: string) => {
      this.insertTime = res;
    });
    this.translate.get('department').subscribe((res: string) => {
      this.department = res;
    });
    this.translate.get('status').subscribe((res: string) => {
      this.status = res;
    });
    this.translate.get('former_employee').subscribe((res: string) => {
      this.formerEmployee = res;
    });
    this.translate.get('by').subscribe((res: string) => {
      this.by = res;
    });
    this.translate.get('manager').subscribe((res: string) => {
      this.manager = res;
    });
    this.translate.get('sorry').subscribe((res: string) => {
      this.sorry = res;
    });
    this.translate.get('sorry_reson').subscribe((res: string) => {
      this.sorryReson = res;
    });
    this.translate.get('main_log').subscribe((res: string) => {
      this.mainLog = res;
    });
    this.translate.get('supervisor').subscribe((res: string) => {
      this.supervisor = res;
    });
    this.translate.get('new').subscribe((res: string) => {
      this.new = res;
    });
    this.translate.get('approved').subscribe((res: string) => {
      this.approved = res;
    });
    this.translate.get('in_progress').subscribe((res: string) => {
      this.inProgress = res;
    });
    this.translate.get('resolved').subscribe((res: string) => {
      this.resolved = res;
    });
    this.translate.get('canceled').subscribe((res: string) => {
      this.canceled = res;
    });
    this.translate.get('reopened').subscribe((res: string) => {
      this.reopened = res;
    });
    this.translate.get('general_manager').subscribe((res: string) => {
      this.generalManager = res;
    });
    this.translate.get('department_manager').subscribe((res: string) => {
      this.departmentManager = res;
    });
    this.translate.get('maintenance_supervisors').subscribe((res: string) => {
      this.maintenanceSupervisors = res;
    });
    this.translate.get('maintenance_manager').subscribe((res: string) => {
      this.maintenanceManager = res;
    });
    this.translate.get('all').subscribe((res: string) => {
      this.all = res;
    });
    this.translate.get('forgot_send').subscribe((res: string) => {
      this.add = res;
    });
    this.translate.get('settings_yas').subscribe((res: string) => {
      this.settingsYas = res;
    });
    this.translate.get('settings_No').subscribe((res: string) => {
      this.settingsNo = res;
    });
    this.translate.get('replys_content').subscribe((res: string) => {
      this.replyPlaceholder = res;
    });
    this.translate.get('isError_replys_content_msg').subscribe((res: string) => {
      this.isErrorReplyMsg = res;
    });
    this.translate.get('add_reply_message_success').subscribe((res: string) => {
      this.addMessageSuccess = res;
    });
    this.translate.get('add_reply_message_failed_one').subscribe((res: string) => {
      this.addMessageFailedOne = res;
    });
    this.translate.get('add_reply_message_failed_tow').subscribe((res: string) => {
      this.addMessageFaileTow = res;
    });
  }
  async functionGetData(requestId:any,userId:any){
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 2000,
    });
    await loading.present();
    this.requestsService.requestDetails(requestId,userId).then(async data=>{
      this.returnRequestData = data;
      this.operationResult = this.returnRequestData.Error.ErrorCode;
      if(this.operationResult==1){
        this.lastStatusVal = this.returnRequestData.Data.lastStatus;
        this.departmentRequestId = this.returnRequestData.Data.departmentId;
        this.showToAdmin = this.returnRequestData.Data.showToAdmin;
      }
    }).catch(error=>{
      this.functionGetData(requestId,userId)
    });
  }
  getTheOptions(event){
    this.selectTypeToSened = event.detail.value;
    if(this.selectTypeToSened == 3)
      this.showSelect = 1;
    else
      this.showSelect = 0;
  }
  async selectUserTaskName(event){
    this.selectUserWork = event;
  }
  checkReply(event){
    this.errorReply = "succsessFiled";
    this.isErrorReply = 1;
    this.replyMsg = event;
    if(this.replyMsg == "" || this.replyMsg == undefined){
      this.errorReply = "errorFiled";
      this.isErrorReply = 0;
    }
    this.isEnterAllValues();
  }
  isEnterAllValues(){
    if(this.replyMsg != undefined && this.replyMsg != ""){
      this.isdisabled = true;
    }
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
      this.functionGetData(this.requestId,this.userId);
    }
    this.userId = await this.storage.get('userId');
    this.departmentId = await this.storage.get('departmentId');
    await this.getDeviceLanguage();
    this.functionGetData(this.requestId,this.userId);
    await this.requestsService.allAssignedUser(this.requestId,this.userId).then(async data=>{
      this.returnAssignedData = data;
      this.operationResult = this.returnAssignedData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayAssignedFromServer = this.returnAssignedData.Data.requests;
        this.returnAssignedArray=[];
        for(let i = 0; i < this.returnArrayAssignedFromServer.length;i++) {
          this.returnAssignedArray[i]=[];
          this.returnAssignedArray[i]['id'] = this.returnArrayAssignedFromServer[i].id;
          this.returnAssignedArray[i]['employeeId'] = this.returnArrayAssignedFromServer[i].employeeId;
          this.returnAssignedArray[i]['name'] = this.returnArrayAssignedFromServer[i].employeeName;
        }
        let countOfData = this.returnAssignedArray.length;
        if(countOfData == 0)
          this.taskUsers = 0;
        else{
          this.taskUsers = 1;
        }
      }else
        this.taskUsers = 0;
    }).catch(error=>{});
  }
  async functionOrderReplyAdd(){
    this.checkInternetData();
    if(this.replyMsg == undefined || this.replyMsg == "" || this.replyMsg == null || this.replyMsg == "null"){
      this.errorReply = "errorFiled";
      this.isErrorReply = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.replyMsg != undefined && this.replyMsg != null && this.selectTypeToSened!=0){
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 3500,
      });
      await loading.present();
      this.requestsService.orderReplyAdd(this.userId,this.departmentId,this.requestId,this.selectTypeToSened,this.selectUserWork,this.replyMsg).then(async data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        if(this.operationResult==1){
          this.message = this.addMessageSuccess;
          this.displayResult(this.message);
          this.modalController.dismiss({
          });
        }else if(this.operationResult==2){
          this.message = this.addMessageFailedOne;
          this.displayResult(this.message);
        }else if(this.operationResult==3){
          this.message = this.addMessageFaileTow;
          this.displayResult(this.message);
        }else{
          this.message = this.addMessageFaileTow;
          this.displayResult(this.message);
        }
      }).catch(e=>{
        this.message = this.addMessageFaileTow;
        this.displayResult(this.message);
      })
      this.isdisabled = true;
    }
  }
  closeModel(){
    this.modalController.dismiss({
    });
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
}
