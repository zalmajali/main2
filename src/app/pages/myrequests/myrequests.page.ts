import { Component, OnInit,ViewChild } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform,ModalController, ToastController,AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {RequestsService} from "../../services/requests.service";
import { Network } from '@ionic-native/network/ngx';
import {HttpClient} from "@angular/common/http";
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Router,ActivatedRoute } from '@angular/router';
import {RequestsfilterComponent} from "../requestsfilter/requestsfilter.component";
import {CancelledreasonComponent} from "../cancelledreason/cancelledreason.component";
import {OperationsComponent} from "../operations/operations.component";
import { IonInfiniteScroll } from '@ionic/angular';
import {UsersService} from "../../services/users.service";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-myrequests',
  templateUrl: './myrequests.page.html',
  styleUrls: ['./myrequests.page.scss'],
})
export class MyrequestsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
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


  public requestNumber:any;
  public machineNumber:any;
  public machineDescription:any;
  public machineStatus:any;
  public working:any;
  public notWorking:any;
  public faultDescription:any;
  public urgency:any;
  public issuerName:any;
  public insertTime:any;
  public departmentName:any;
  public closedTime:any;
  public startWorkTime:any;
  public approvedTime:any;
  public replysTitle:any;
  public replysTime:any;
  public fromName:any;
  public replysContent:any;
  public toName:any;
  public firstFile:any;
  public secondFile:any;
  public thirdFile:any;
  public add:any;
  public details:any;
  public refusal:any;
  public approval:any;
  public reopen:any;
  public arrowBack:any;
  public typeId:any=10;
  public getDataByUser:any = 0;
  public returnRequestData:any;
  public returnArrayRequestFromServer:any;
  public returnRequestArray:any = [];
  public request:any;
  public loopingNumber:any = 1;
  public low:any;
  public medium:any;
  public hight:any;
  public finishedTime:any;
  public routing:any;
  public finished:any;
  public start:any;
  public workingDetails:any;
  public sortingValues:any=1;

  public departmentSearchId:any=0
  public suberViserSearchName:any=0
  public machineSearchNumber:any=0
  public statusSearch:any=0
  public urgencySearch:any=0
  public machineSearchDescription:any=0
  public faultSearchDescription:any=0
  public signOut:any;
  public signMsg:any;
  public settingsYas:any;
  public settingsNo:any;
  public messageSuccess:any;
  public messageFailedOne:any;
  public messageFailedTow:any;

  public addedBy:any;
  public approvedBy:any;
  public inProgressBy:any;
  public resolvedBy:any;
  public canceledBy:any;
  public reopenedBy:any;
  public currentStatus:any;
  public previousEmployee:any;
  public orderDelete:any;
  public orderEdit:any;
  public correspondence:any;
  public reason:any;
  public operations:any;
  public cancel:any;
  public tasks:any;
  public finish:any;
  public cancelledreason:any;
  public close:any;
  public reasonValue:any;
  public noReason:any;
  public newNotifications:any='';
  public returnNotfiData:any;
  public showGeneralIcon:any;
  public showGeneralMsg:any;
  public newTasks:any;
  public orderId:any;
  public attachments:any;
  public fromSelectDate:any;
  public toSelectDate:any;
  public messageFailedThree:any;
  constructor(private iab: InAppBrowser,private usersService:UsersService,private alertController:AlertController,private activaterouter : ActivatedRoute,private router : Router,private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private http:HttpClient,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private requestsService:RequestsService,private toastCtrl: ToastController,private loading: LoadingController) {
    this.checkInternetData();
    this.menu.enable(false,"last");
    this.menu.enable(false,"first");
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/home');
    });
  }
  initialiseTranslation(){
    this.translate.get('my_rders').subscribe((res: string) => {
      this.requestsTitle = res;
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
    this.translate.get('request_number').subscribe((res: string) => {
      this.requestNumber = res;
    });
    this.translate.get('machine_number').subscribe((res: string) => {
      this.machineNumber = res;
    });
    this.translate.get('machine_description').subscribe((res: string) => {
      this.machineDescription = res;
    });
    this.translate.get('machine_status').subscribe((res: string) => {
      this.machineStatus = res;
    });
    this.translate.get('working').subscribe((res: string) => {
      this.working = res;
    });
    this.translate.get('not_working').subscribe((res: string) => {
      this.notWorking = res;
    });
    this.translate.get('fault_description').subscribe((res: string) => {
      this.faultDescription = res;
    });
    this.translate.get('urgency').subscribe((res: string) => {
      this.urgency = res;
    });
    this.translate.get('issuer_name').subscribe((res: string) => {
      this.issuerName = res;
    });
    this.translate.get('insert_time').subscribe((res: string) => {
      this.insertTime = res;
    });
    this.translate.get('department_name').subscribe((res: string) => {
      this.departmentName = res;
    });
    this.translate.get('closed_time').subscribe((res: string) => {
      this.closedTime = res;
    });
    this.translate.get('finished_time').subscribe((res: string) => {
      this.finishedTime = res;
    });
    this.translate.get('start_work_time').subscribe((res: string) => {
      this.startWorkTime = res;
    });
    this.translate.get('approved_time').subscribe((res: string) => {
      this.approvedTime = res;
    });
    this.translate.get('replys_title').subscribe((res: string) => {
      this.replysTitle = res;
    });
    this.translate.get('replys_time').subscribe((res: string) => {
      this.replysTime = res;
    });
    this.translate.get('from_name').subscribe((res: string) => {
      this.fromName = res;
    });
    this.translate.get('replys_content').subscribe((res: string) => {
      this.replysContent = res;
    });
    this.translate.get('to_name').subscribe((res: string) => {
      this.toName = res;
    });
    this.translate.get('first_file').subscribe((res: string) => {
      this.firstFile = res;
    });
    this.translate.get('second_file').subscribe((res: string) => {
      this.secondFile = res;
    });
    this.translate.get('third_file').subscribe((res: string) => {
      this.thirdFile = res;
    });
    this.translate.get('add').subscribe((res: string) => {
      this.add = res;
    });
    this.translate.get('details').subscribe((res: string) => {
      this.details = res;
    });
    this.translate.get('refusal').subscribe((res: string) => {
      this.refusal = res;
    });
    this.translate.get('approve').subscribe((res: string) => {
      this.approval = res;
    });
    this.translate.get('reopen').subscribe((res: string) => {
      this.reopen = res;
    });
    this.translate.get('arrow_back').subscribe((res: string) => {
      this.arrowBack = res;
    });
    this.translate.get('low').subscribe((res: string) => {
      this.low = res;
    });
    this.translate.get('medium').subscribe((res: string) => {
      this.medium = res;
    });
    this.translate.get('hight').subscribe((res: string) => {
      this.hight = res;
    });
    this.translate.get('routing').subscribe((res: string) => {
      this.routing = res;
    });
    this.translate.get('working_details').subscribe((res: string) => {
      this.workingDetails = res;
    });
    this.translate.get('finished').subscribe((res: string) => {
      this.finished = res;
    });
    this.translate.get('start').subscribe((res: string) => {
      this.start = res;
    });
    this.translate.get('settings_yas').subscribe((res: string) => {
      this.settingsYas = res;
    });
    this.translate.get('settings_No').subscribe((res: string) => {
      this.settingsNo = res;
    });
    this.translate.get('signOut').subscribe((res: string) => {
      this.signOut = res;
    });
    this.translate.get('signMsg').subscribe((res: string) => {
      this.signMsg = res;
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
    this.translate.get('added_by').subscribe((res: string) => {
      this.addedBy = res;
    });
    this.translate.get('approved_by').subscribe((res: string) => {
      this.approvedBy = res;
    });
    this.translate.get('in_progress_by').subscribe((res: string) => {
      this.inProgressBy = res;
    });
    this.translate.get('resolved_by').subscribe((res: string) => {
      this.resolvedBy = res;
    });
    this.translate.get('canceled_by').subscribe((res: string) => {
      this.canceledBy = res;
    });
    this.translate.get('reopened_by').subscribe((res: string) => {
      this.reopenedBy = res;
    });
    this.translate.get('current_status').subscribe((res: string) => {
      this.currentStatus = res;
    });
    this.translate.get('previous_employee').subscribe((res: string) => {
      this.previousEmployee = res;
    });
    this.translate.get('order_delete').subscribe((res: string) => {
      this.orderDelete = res;
    });
    this.translate.get('order_edit').subscribe((res: string) => {
      this.orderEdit = res;
    });
    this.translate.get('correspondence').subscribe((res: string) => {
      this.correspondence = res;
    });
    this.translate.get('reason').subscribe((res: string) => {
      this.reason = res;
    });
    this.translate.get('operations').subscribe((res: string) => {
      this.operations = res;
    });
    this.translate.get('cancel').subscribe((res: string) => {
      this.cancel = res;
    });
    this.translate.get('tasks').subscribe((res: string) => {
      this.tasks = res;
    });
    this.translate.get('finish').subscribe((res: string) => {
      this.finish = res;
    });
    this.translate.get('close').subscribe((res: string) => {
      this.close = res;
    });
    this.translate.get('no_reason').subscribe((res: string) => {
      this.noReason = res;
    });
    this.translate.get('show_general_icon').subscribe((res: string) => {
      this.showGeneralIcon = res;
    });
    this.translate.get('show_general_msg').subscribe((res: string) => {
      this.showGeneralMsg = res;
    });
    this.translate.get('new_tasks').subscribe((res: string) => {
      this.newTasks = res;
    });
    this.translate.get('addrf_message_failed_three').subscribe((res: string) => {
      this.messageFailedThree = res;
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
  async functionGetData(userId:any,departmentId:any,getDataByUser:any,orderId:any=0,attachments:any=0,fromSelectDate:any=0,toSelectDate:any=0,machineNumber:any=0,status:any=0,urgency:any=0,machineDescription:any=0,faultDescription:any=0,sortingBy:any=0){
    let limitNew = this.loopingNumber;
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 2500,
    });
    await loading.present();
    this.requestsService.myRequest(userId,departmentId,getDataByUser,orderId,attachments,fromSelectDate,toSelectDate,machineNumber,status,urgency,machineDescription,faultDescription,sortingBy,limitNew).then(async data=>{
      this.returnRequestData = data;
      this.operationResult = this.returnRequestData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayRequestFromServer = this.returnRequestData.Data.requests;
        this.returnRequestArray=[];
        for(let i = 0; i < this.returnArrayRequestFromServer.length;i++) {
          this.returnRequestArray[i]=[];
          this.returnRequestArray[i]['id'] = this.returnArrayRequestFromServer[i].id;
          this.returnRequestArray[i]['machineNumber'] = this.returnArrayRequestFromServer[i].machineNumber;
          if(this.returnArrayRequestFromServer[i].machineWorkingStatus == 1)
            this.returnRequestArray[i]['machineWorkingStatus'] = this.working;
          if(this.returnArrayRequestFromServer[i].machineWorkingStatus == 2)
            this.returnRequestArray[i]['machineWorkingStatus'] = this.notWorking;
          this.returnRequestArray[i]['issuerName'] = this.returnArrayRequestFromServer[i].issuerName;
          if(this.returnArrayRequestFromServer[i].urgency == 1)
            this.returnRequestArray[i]['urgency'] = this.low;
          if(this.returnArrayRequestFromServer[i].urgency == 2)
            this.returnRequestArray[i]['urgency'] = this.medium;
          if(this.returnArrayRequestFromServer[i].urgency == 3)
            this.returnRequestArray[i]['urgency'] = this.hight;
          this.returnRequestArray[i]['insertTime'] = this.returnArrayRequestFromServer[i].insertTime;
          this.returnRequestArray[i]['showToAdmin'] = this.returnArrayRequestFromServer[i].showToAdmin;
          this.returnRequestArray[i]['showToAdminButtom'] = 0;
          if(this.returnArrayRequestFromServer[i].showToAdmin == 0)
            this.returnRequestArray[i]['showToAdminButtom'] = 1;
          this.returnRequestArray[i]['closedTime'] = this.returnArrayRequestFromServer[i].closedTime;
          this.returnRequestArray[i]['lastStatusTime'] = this.returnArrayRequestFromServer[i].lastStatusTime;
          this.returnRequestArray[i]['lastStatus'] = this.returnArrayRequestFromServer[i].lastStatus;
          this.returnRequestArray[i]['exisetUser'] = this.returnArrayRequestFromServer[i].exisetUser;
          this.returnRequestArray[i]['lastStatusIssuerName'] = this.returnArrayRequestFromServer[i].lastStatusIssuerName;
          this.returnRequestArray[i]['cancelledReason'] = this.returnArrayRequestFromServer[i].cancelledReason;
          this.returnRequestArray[i]['show'] = 1;
        }
        let countOfData = this.returnRequestArray.length;
        if(countOfData == 0)
          this.request = 0;
        else{
          this.request = 1;
        }
      }else
        this.request = 0;
    }).catch(error=>{
      this.functionGetData(userId,departmentId,getDataByUser,orderId,attachments,fromSelectDate,toSelectDate,machineNumber,status,urgency,machineDescription,faultDescription,sortingBy)
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.checkInternetData();
    this.orderId = await this.storage.remove('orderId');
    this.machineSearchNumber = await this.storage.remove('machineSearchNumber');
    this.urgencySearch = await this.storage.remove('urgencySearch');
    this.machineSearchDescription = await this.storage.remove('machineSearchDescription');
    this.statusSearch = await this.storage.remove('statusSearch');
    this.faultSearchDescription = await this.storage.remove('faultSearchDescription');
    this.attachments = await this.storage.remove('attachments');
    this.fromSelectDate = await this.storage.remove('fromSelectDate');
    this.toSelectDate = await this.storage.remove('toSelectDate');
    this.departmentSearchId = await this.storage.remove('departmentSearchId');
    this.suberViserSearchName = await this.storage.remove('suberViserSearchName');
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
      this.functionGetData(this.userId,this.departmentId,this.getDataByUser,0,0,0,0,0,0,0,0,0,this.sortingValues)
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
  sortingVal(value:any){
    if(value == 1){
      this.sortingValues = 2;
      this.functionGetData(this.userId,this.departmentId,this.getDataByUser,this.orderId,this.attachments,this.fromSelectDate,this.toSelectDate,this.machineSearchNumber,this.statusSearch,this.urgencySearch,this.machineSearchDescription,this.faultSearchDescription,2)
    }else{
      this.sortingValues = 1;
      this.functionGetData(this.userId,this.departmentId,this.getDataByUser,this.orderId,this.attachments,this.fromSelectDate,this.toSelectDate,this.machineSearchNumber,this.statusSearch,this.urgencySearch,this.machineSearchDescription,this.faultSearchDescription,1)
    }
  }
  async filterVal(){
    let model = await this.modalController.create({
      component:RequestsfilterComponent,
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then(data=>{
      this.orderId = data.data.orderId;
      this.attachments = data.data.attachments;
      this.fromSelectDate = data.data.fromSelectDate;
      this.toSelectDate = data.data.toSelectDate;
      this.machineSearchNumber = data.data.machineSearchNumber;
      this.statusSearch = data.data.statusSearch;
      this.urgencySearch = data.data.urgencySearch;
      this.machineSearchDescription = data.data.machineSearchDescription;
      this.faultSearchDescription = data.data.faultSearchDescription;
      if(this.orderId == null || this.orderId == null  || this.orderId == "")
        this.orderId = 0;
      if(this.attachments == 0 || this.attachments == null || this.attachments == "")
        this.attachments = 0;
      if(this.fromSelectDate == null || this.fromSelectDate == null  || this.fromSelectDate == "")
        this.fromSelectDate = 0;
      if(this.toSelectDate == null || this.toSelectDate == null  || this.toSelectDate == "")
        this.toSelectDate = 0;
      if(this.machineSearchNumber == null || this.machineSearchNumber == null  || this.machineSearchNumber == "")
        this.machineSearchNumber = 0;
      if(this.statusSearch == 0 || this.statusSearch == null || this.statusSearch == "")
        this.statusSearch = 0;
      if(this.urgencySearch == 0 || this.urgencySearch == null || this.urgencySearch == "")
        this.urgencySearch = 0;
      if(this.machineSearchDescription == 0 || this.machineSearchDescription == null  || this.machineSearchDescription == "")
        this.machineSearchDescription = 0;
      if(this.faultSearchDescription == 0 || this.faultSearchDescription == null  || this.faultSearchDescription == "")
        this.faultSearchDescription = 0;
      this.functionGetData(this.userId,this.departmentId,this.getDataByUser,this.orderId,this.attachments,this.fromSelectDate,this.toSelectDate,this.machineSearchNumber,this.statusSearch,this.urgencySearch,this.machineSearchDescription,this.faultSearchDescription,this.sortingValues)
    });
    await model.present();
  }
  loadMoreData(event) {
    this.loopingNumber++;
    setTimeout(() => {
      this.functionGetData(this.userId,this.departmentId,this.getDataByUser,this.orderId,this.attachments,this.fromSelectDate,this.toSelectDate,this.machineSearchNumber,this.statusSearch,this.urgencySearch,this.machineSearchDescription,this.faultSearchDescription,this.sortingValues)
      event.target.complete();
      if (this.loopingNumber >= 200) {
        event.target.disabled = true;
      }
    }, 2000);
  }
  refrechAllPage(event) {
    this.loopingNumber = 1;
    this.functionGetData(this.userId,this.departmentId,this.getDataByUser,this.orderId,this.attachments,this.fromSelectDate,this.toSelectDate,this.machineSearchNumber,this.statusSearch,this.urgencySearch,this.machineSearchDescription,this.faultSearchDescription,1)
    setTimeout(() => {
      event.target.complete();
    }, 2000);
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
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
  //done
  functionDetails(requestId:any,index:any){
    this.navCtrl.navigateRoot(["/requestdetails", {requestId:requestId,page:7}]);
  }
  //done
  async functionRefusal(requestId:any,index:any){
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
            this.requestsService.requestRefusal(requestId,this.userId).then(async data=>{
              this.returnRequestData = data;
              this.operationResult = this.returnRequestData.Error.ErrorCode;
              if(this.operationResult==1){
                this.displayResult(this.messageSuccess);
                this.returnRequestArray[index]['show'] = 0;
                this.returnRequestArray[index]['lastStatus'] = 4;
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
  //done
  async functionApproval(requestId:any,index:any){
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
            this.requestsService.requestApproval(requestId,this.userId).then(async data=>{
              this.returnRequestData = data;
              this.operationResult = this.returnRequestData.Error.ErrorCode;
              if(this.operationResult==1){
                this.displayResult(this.messageSuccess);
                this.returnRequestArray[index]['lastStatus'] = 1;
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
  //done
  async functionCancel(requestId:any,index:any){
    let model = await this.modalController.create({
      component:CancelledreasonComponent,
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then(data=>{
      this.cancelledreason = data.data.reason;
      if(this.cancelledreason!=undefined && this.cancelledreason!="" && this.cancelledreason!=0 && this.cancelledreason!=null){
        this.requestsService.requestCancel(requestId,this.cancelledreason,this.userId).then(async data=>{
          this.returnRequestData = data;
          this.operationResult = this.returnRequestData.Error.ErrorCode;
          if(this.operationResult==1){
            this.returnRequestArray[index]['lastStatus'] = 4;
            this.returnRequestArray[index]['cancelledReason'] = this.cancelledreason;
            await this.requestsService.orderReplyAdd(this.userId,this.departmentId,requestId,1,0,this.cancelledreason).then(async data=>{
              this.returnData = data;
              this.operationResult = this.returnData.Error.ErrorCode;
              if(this.operationResult==1){
                this.displayResult(this.messageSuccess);
                this.modalController.dismiss({
                });
              }else if(this.operationResult==2){
                this.message = this.messageFailedOne;
                this.displayResult(this.message);
              }else if(this.operationResult==3){
                this.message = this.messageFailedTow;
                this.displayResult(this.message);
              }
            }).catch(e=>{
              this.message = this.messageFailedTow;
              this.displayResult(this.message);
            })
          }
          else if(this.operationResult==2)
            this.displayResult(this.messageFailedOne);
          else
            this.displayResult(this.messageFailedTow);
        });
      }
    });
    await model.present();
  }
  functionEdit(requestId:any,index:any){
    this.navCtrl.navigateRoot(["/editrequest", {requestId:requestId,page:7}]);
  }
  functionCorrespondence(requestId:any,index:any){
    this.navCtrl.navigateRoot(["/correspondence", {requestId:requestId,page:7}]);
  }
  async functionShowAdmin(requestId:any,index:any){
    const alert = await this.alertController.create({
      cssClass: 'alertBac',
      mode: 'ios',
      message: this.showGeneralMsg,
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
            this.requestsService.showAdmin(requestId,this.userId).then(async data=>{
              this.returnRequestData = data;
              this.operationResult = this.returnRequestData.Error.ErrorCode;
              if(this.operationResult==1){
                this.displayResult(this.messageSuccess);
                this.returnRequestArray[index]['showToAdminButtom'] = 0;
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
  //done
  async functionOperations(requestId:any,index:any){
    let model = await this.modalController.create({
      component:OperationsComponent,
      animated:true,
      componentProps:{requestId:requestId},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then(data=>{
    });
    await model.present();
  }
  //done
  async functionReason(requestId:any,index:any){
    this.reasonValue = this.returnRequestArray[index]['cancelledReason'];
    if(this.reasonValue ==null || this.reasonValue == undefined || this.reasonValue == "")
      this.reasonValue = this.noReason;
    const alert = await this.alertController.create({
      cssClass: 'alertBac',
      mode: 'ios',
      message: this.reasonValue,
      buttons: [
        {
          text: this.close,
          cssClass: 'alertButton',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }
  //done
  async functionReopen(requestId:any,index:any){
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
            this.requestsService.requestReopen(requestId,this.userId).then(async data=>{
              this.returnRequestData = data;
              this.operationResult = this.returnRequestData.Error.ErrorCode;
              if(this.operationResult==1){
                this.displayResult(this.messageSuccess);
                if(this.getDataByUser == 3)
                  this.navCtrl.navigateRoot(["/addnewtaskorder", {requestId:requestId,backPage:7}]);
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
  functionTasks(requestId:any,index:any){
    this.navCtrl.navigateRoot(["/alltasks", {requestId:requestId,page:7}]);
  }
//done
  async functionStart(requestId:any,index:any){
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
            this.requestsService.requestStarat(requestId,this.userId).then(async data=>{
              this.returnRequestData = data;
              this.operationResult = this.returnRequestData.Error.ErrorCode;
              if(this.operationResult==1){
                this.displayResult(this.messageSuccess);
                this.navCtrl.navigateRoot(["/addnewtaskorder", {requestId:requestId,backPage:2}]);
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
  functionFinish(requestId:any,index:any){
    this.requestsService.requestDetailsFineshed(this.userId,requestId).then(async data=>{
      this.returnRequestData = data;
      this.operationResult = this.returnRequestData.Error.ErrorCode;
      if(this.operationResult==1){
        this.navCtrl.navigateRoot(["/requestsfinished", {requestId:requestId,page:7}]);
      }else{
        this.message = this.messageFailedThree;
        this.displayResult(this.message);
      }
    }).catch(e=>{
      this.message = this.messageFailedThree;
      this.displayResult(this.message);
    });
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
    this.navCtrl.navigateRoot(["/addrequest", {page:1}]);
  }
  functionProgressTasks(){
    this.navCtrl.navigateRoot("/progresstasks");
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
