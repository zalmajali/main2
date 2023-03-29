import { Component, OnInit,ViewChild } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform,ModalController, ToastController,AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {RequestsService} from "../../services/requests.service";
import { Network } from '@ionic-native/network/ngx';
import {HttpClient} from "@angular/common/http";
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Router,ActivatedRoute } from '@angular/router';
import {UsersService} from "../../services/users.service";
@Component({
  selector: 'app-requestsfinished',
  templateUrl: './requestsfinished.page.html',
  styleUrls: ['./requestsfinished.page.scss'],
})
export class RequestsfinishedPage implements OnInit {
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
  public arrowBack:any;
  public messageSuccess:any;
  public messageFailedOne:any;
  public messageFailedTow:any;
  public messageFailedThree:any;
  public returnTasksData:any;
  public returnArrayTasksFromServer:any;
  public returnTasksArray:any = [];
  public finish:any;
  public getDataByUser:any = 0;
  public finishRequest:any;
  public taskId:any;
  public requestId:any;
  public settingsYas:any;
  public settingsNo:any;
  public backePage:any;
  public startDate:any;
  public endDate:any;
  public totalWorkingHours:any;
  public technicianName:any;
  public supervisor:any;
  public assignedVal:any=[];

  public findings:any;
  public isErrorFindingsMsg:any;
  public errorFindings:any="";
  public isErrorFindings:any = 1;
  public placeholFindings:any;

  public corrections:any;
  public isErrorCorrectionsMsg:any;
  public errorCorrections:any="";
  public isErrorCorrections:any = 1;
  public placeholCorrections:any;

  public replacedParts:any;
  public isErrorReplacedPartsMsg:any;
  public errorReplacedParts:any="";
  public isErrorReplacedParts:any = 1;
  public placeholReplacedParts:any;

  public notes:any;
  public isErrorNotesMsg:any;
  public errorNotes:any="";
  public isErrorNotes:any = 1;
  public placeholNotes:any;

  public dateEnd:any;
  public isErrorDateMsg:any;
  public errorDate:any="";
  public isErrorDate:any = 1;
  public placeholderDate:any;

  public referenceNumber:any;
  public isErrorReferenceNumberMsg:any;
  public errorReferenceNumber:any="";
  public isErrorReferenceNumber:any = 1;
  public placeholderReferenceNumber:any;
  public returnRequestData:any;
  public newNotifications:any='';
  public returnNotfiData:any;
  constructor(private usersService:UsersService,private alertController:AlertController,private activaterouter : ActivatedRoute,private router : Router,private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private http:HttpClient,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private requestsService:RequestsService,private toastCtrl: ToastController,private loading: LoadingController) {
    this.checkInternetData();
    this.menu.enable(false,"last");
    this.menu.enable(false,"first");
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/home');
    });
  }
  initialiseTranslation(){
    this.translate.get('finish_Request').subscribe((res: string) => {
      this.finishRequest = res;
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
    this.translate.get('arrow_back').subscribe((res: string) => {
      this.arrowBack = res;
    });
    this.translate.get('addrf_message_success').subscribe((res: string) => {
      this.messageSuccess = res;
    });
    this.translate.get('addrf_message_failed_one').subscribe((res: string) => {
      this.messageFailedOne = res;
    });
    this.translate.get('addrf_message_failed_tow').subscribe((res: string) => {
      this.messageFailedTow = res;
    });
    this.translate.get('addrf_message_failed_three').subscribe((res: string) => {
      this.messageFailedThree = res;
    });
    this.translate.get('finish').subscribe((res: string) => {
      this.finish = res;
    });
    this.translate.get('settings_yas').subscribe((res: string) => {
      this.settingsYas = res;
    });
    this.translate.get('settings_No').subscribe((res: string) => {
      this.settingsNo = res;
    });
    //edt label
    this.translate.get('enter_date').subscribe((res: string) => {
      this.isErrorDateMsg = res;
    });
    this.translate.get('insert_time').subscribe((res: string) => {
      this.placeholderDate = res;
    });
    this.translate.get('enter_reference_number').subscribe((res: string) => {
      this.isErrorReferenceNumberMsg = res;
    });
    this.translate.get('reference_number').subscribe((res: string) => {
      this.placeholderReferenceNumber = res;
    });
    this.translate.get('findings').subscribe((res: string) => {
      this.placeholFindings = res;
    });
    this.translate.get('is_error_findings_msg').subscribe((res: string) => {
      this.isErrorFindingsMsg = res;
    });
    this.translate.get('corrections').subscribe((res: string) => {
      this.placeholCorrections = res;
    });
    this.translate.get('is_error_corrections_msg').subscribe((res: string) => {
      this.isErrorCorrectionsMsg = res;
    });
    this.translate.get('replaced_parts').subscribe((res: string) => {
      this.placeholReplacedParts = res;
    });
    this.translate.get('is_error_replaced_parts_msg').subscribe((res: string) => {
      this.isErrorReplacedPartsMsg = res;
    });
    this.translate.get('notes').subscribe((res: string) => {
      this.placeholNotes = res;
    });
    this.translate.get('is_error_notes_msg').subscribe((res: string) => {
      this.isErrorNotesMsg = res;
    });
    this.translate.get('start_date').subscribe((res: string) => {
      this.startDate = res;
    });
    this.translate.get('end_date').subscribe((res: string) => {
      this.endDate = res;
    });
    this.translate.get('total_working_hours').subscribe((res: string) => {
      this.totalWorkingHours = res;
    });
    this.translate.get('technician_name').subscribe((res: string) => {
      this.technicianName = res;
    });
    this.translate.get('supervisor').subscribe((res: string) => {
      this.supervisor = res;
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
  async functionGetData(userId:any,requestId:any){
    this.requestsService.requestDetailsFineshed(userId,requestId).then(async data=>{
      this.returnRequestData = data;
      this.operationResult = this.returnRequestData.Error.ErrorCode;
      if(this.operationResult==1){
        this.findings = this.returnRequestData.Data.findings;
        this.corrections = this.returnRequestData.Data.corrections;
        this.replacedParts = this.returnRequestData.Data.replacedParts;
        this.notes = this.returnRequestData.Data.notes;
        for(let i = 0; i < this.returnRequestData.Data.assigned.length;i++) {
          this.assignedVal[i]=[];
          this.assignedVal[i]['startDate'] = this.returnRequestData.Data.assigned[i][0];
          this.assignedVal[i]['endDate'] = this.returnRequestData.Data.assigned[i][1];
          this.assignedVal[i]['totalJobHours'] = this.returnRequestData.Data.assigned[i][2];
          this.assignedVal[i]['technicianName'] = this.returnRequestData.Data.assigned[i][3];
          this.assignedVal[i]['employeeName'] = this.returnRequestData.Data.assigned[i][4];
        }
      }else{
        this.message = this.messageFailedThree;
        this.displayResult(this.message);
        if(this.backePage == 1)
          this.navCtrl.navigateRoot("/allrequest");
        if(this.backePage == 4)
          this.navCtrl.navigateRoot("/processingrequests");
        if(this.backePage == 7)
          this.navCtrl.navigateRoot("/myrequests");
      }
    }).catch(e=>{
      this.message = this.messageFailedTow;
      this.displayResult(this.message);
    });
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
    await this.functionGetData(this.userId,this.requestId);
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 3500,
    });
    await loading.present();
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
        this.requestId = params['requestId'];
        this.backePage = params['page'];
      });
      if(this.departmentId==1 && this.type=='suber')
        this.getDataByUser = 1;
      else if(this.departmentId==1 && this.type=='man')
        this.getDataByUser = 2;
      else if(this.type=='itMan')
        this.getDataByUser = 5;
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
  async checkDate(event){
    this.errorDate = "succsessFiled";
    this.isErrorDate = 1;
    this.dateEnd = event;
    if(this.dateEnd == "" || this.dateEnd == undefined){
      this.errorDate = "errorFiled";
      this.isErrorDate = 0;
    }
  }
  async checkReferenceNumber(event){
    this.errorReferenceNumber = "succsessFiled";
    this.isErrorReferenceNumber = 1;
    this.referenceNumber = event;
    if(this.referenceNumber == "" || this.referenceNumber == undefined){
      this.errorReferenceNumber = "errorFiled";
      this.isErrorReferenceNumber = 0;
    }
  }
  async checkFindings(event){
    this.errorFindings = "succsessFiled";
    this.isErrorFindings = 1;
    this.findings = event;
    if(this.findings == "" || this.findings == undefined){
      this.errorFindings = "errorFiled";
      this.isErrorFindings = 0;
    }
  }
  async checkCorrections(event){
    this.errorCorrections = "succsessFiled";
    this.isErrorCorrections = 1;
    this.corrections = event;
    if(this.corrections == "" || this.corrections == undefined){
      this.errorCorrections = "errorFiled";
      this.isErrorCorrections = 0;
    }
  }
  async checkReplacedParts(event){
    this.errorReplacedParts = "succsessFiled";
    this.isErrorReplacedParts = 1;
    this.replacedParts = event;
    if(this.replacedParts == "" || this.replacedParts == undefined){
      this.errorReplacedParts = "errorFiled";
      this.isErrorReplacedParts = 0;
    }
  }
  async checkNotes(event){
    this.errorNotes = "succsessFiled";
    this.isErrorNotes = 1;
    this.notes = event;
    if(this.notes == "" || this.notes == undefined){
      this.errorNotes = "errorFiled";
      this.isErrorNotes = 0;
    }
  }
  async addfinished(){
    if((this.dateEnd == undefined || this.dateEnd == "" || this.dateEnd == null || this.dateEnd == "null")
      && (this.findings == undefined || this.findings == "" || this.findings == null || this.findings == "null")
      && (this.corrections == undefined || this.corrections == "" || this.corrections == null || this.corrections == "null")
      && (this.replacedParts == undefined || this.replacedParts == "" || this.replacedParts == null || this.replacedParts == "null")
      && (this.notes == undefined || this.notes == "" || this.notes == null || this.notes == "null")
    ){
      this.errorDate = "errorFiled";
      this.isErrorDate = 0;
      this.errorReferenceNumber = "errorFiled";
      this.isErrorReferenceNumber = 0;
      this.errorFindings = "errorFiled";
      this.isErrorFindings = 0;
      this.errorCorrections = "errorFiled";
      this.isErrorCorrections = 0;
      this.errorReplacedParts = "errorFiled";
      this.isErrorReplacedParts = 0;
      this.errorNotes = "errorFiled";
      this.isErrorNotes = 0;
      return false;
    }
    if(this.dateEnd == undefined || this.dateEnd == "" || this.dateEnd == null || this.dateEnd == "null"){
      this.errorDate = "errorFiled";
      this.isErrorDate = 0;
      return false;
    }
    if(this.findings == undefined || this.findings == "" || this.findings == null || this.findings == "null"){
      this.errorFindings = "errorFiled";
      this.isErrorFindings = 0;
      return false;
    }
    if(this.corrections == undefined || this.corrections == "" || this.corrections == null || this.corrections == "null"){
      this.errorCorrections = "errorFiled";
      this.isErrorCorrections = 0;
      return false;
    }
    if(this.replacedParts == undefined || this.replacedParts == "" || this.replacedParts == null || this.replacedParts == "null"){
      this.errorReplacedParts = "errorFiled";
      this.isErrorReplacedParts = 0;
      return false;
    }
    if(this.notes == undefined || this.notes == "" || this.notes == null || this.notes == "null"){
      this.errorNotes = "errorFiled";
      this.isErrorNotes = 0;
      return false;
    }
    if(this.dateEnd != undefined && this.dateEnd != null && this.referenceNumber != undefined && this.referenceNumber != null && this.findings != undefined && this.findings != null && this.corrections != undefined && this.corrections != null && this.replacedParts != undefined && this.replacedParts != null && this.notes != undefined && this.notes != null) {
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 3500,
      });
      await loading.present();
      this.requestsService.requestfinished(this.userId,this.requestId,this.findings,this.corrections,this.replacedParts,this.notes,this.dateEnd).then(async data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        if(this.operationResult==1){
          this.message = this.messageSuccess;
          this.displayResult(this.message);
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
  functionBack(){
    if(this.backePage == 1)
      this.navCtrl.navigateRoot("/allrequest");
    if(this.backePage == 4)
      this.navCtrl.navigateRoot("/processingrequests");
    if(this.backePage == 7)
      this.navCtrl.navigateRoot("/myrequests");
    if(this.backePage == 11)
      this.navCtrl.navigateRoot("/onerequest");
  }
  functionHome(){
    this.navCtrl.navigateRoot("/progresstasks");
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
