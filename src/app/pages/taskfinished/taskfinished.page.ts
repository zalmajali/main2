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
  selector: 'app-taskfinished',
  templateUrl: './taskfinished.page.html',
  styleUrls: ['./taskfinished.page.scss'],
})
export class TaskfinishedPage implements OnInit {
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
  public returnTasksData:any;
  public returnArrayTasksFromServer:any;
  public returnTasksArray:any = [];
  public finish:any;
  public getDataByUser:any = 0;
  public finishTask:any;
  public taskId:any;
  public requestId:any;
  public startDate:any;
  public settingsYas:any;
  public settingsNo:any;

  public dateStart:any;
  public isErrorStartDateMsg:any;
  public errorStartDate:any="";
  public isErrorStartDate:any = 1;
  public placeholderStartDate:any;

  public dateEnd:any;
  public isErrorEndDateMsg:any;
  public errorEndDate:any="";
  public isErrorEndDate:any = 1;
  public placeholderEndDate:any;

  public workingHours:any;
  public isErrorWorkingHoursMsg:any;
  public errorWorkingHours:any="";
  public isErrorWorkingHours:any = 1;
  public placeholderTotalWorkingHours:any;

  public technicianName:any;
  public isErrorTechnicianNameMsg:any;
  public errorTechnicianName:any="";
  public isErrorTechnicianName:any = 1;
  public placeholderTechnicianName:any;

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
  public newNotifications:any='';
  public returnNotfiData:any;
  public newTasks:any;
  constructor(private usersService:UsersService,private alertController:AlertController,private activaterouter : ActivatedRoute,private router : Router,private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private http:HttpClient,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private requestsService:RequestsService,private toastCtrl: ToastController,private loading: LoadingController) {
    this.checkInternetData();
    this.menu.enable(false,"last");
    this.menu.enable(false,"first");
    this.platform.backButton.subscribeWithPriority(10, async () => {
      this.navCtrl.navigateRoot("/progresstasks");
    });
  }
  initialiseTranslation(){
    this.translate.get('finish_task').subscribe((res: string) => {
      this.finishTask = res;
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
    this.translate.get('addt_message_success').subscribe((res: string) => {
      this.messageSuccess = res;
    });
    this.translate.get('addt_message_failed_one').subscribe((res: string) => {
      this.messageFailedOne = res;
    });
    this.translate.get('addt_message_failed_tow').subscribe((res: string) => {
      this.messageFailedTow = res;
    });
    this.translate.get('finish').subscribe((res: string) => {
      this.finish = res;
    });
    this.translate.get('is_error_start_date_msg').subscribe((res: string) => {
      this.isErrorStartDateMsg = res;
    });
    this.translate.get('is_error_end_date_msg').subscribe((res: string) => {
      this.placeholderStartDate = res;
    });
    this.translate.get('placeholder_start_date').subscribe((res: string) => {
      this.isErrorEndDateMsg = res;
    });
    this.translate.get('placeholder_end_date').subscribe((res: string) => {
      this.placeholderEndDate = res;
    });
    this.translate.get('settings_yas').subscribe((res: string) => {
      this.settingsYas = res;
    });
    this.translate.get('settings_No').subscribe((res: string) => {
      this.settingsNo = res;
    });
    this.translate.get('total_working_hours').subscribe((res: string) => {
      this.placeholderTotalWorkingHours = res;
    });
    this.translate.get('technician_name').subscribe((res: string) => {
      this.placeholderTechnicianName = res;
    });
    this.translate.get('is_error_working_hours_msg').subscribe((res: string) => {
      this.isErrorWorkingHoursMsg = res;
    });
    this.translate.get('is_error_technician_name_msg').subscribe((res: string) => {
      this.isErrorTechnicianNameMsg = res;
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
    this.translate.get('new_tasks').subscribe((res: string) => {
      this.newTasks = res;
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
      this.navCtrl.navigateRoot('/login');
    }else{
      this.activaterouter.params.subscribe(params => {
        this.taskId = params['taskId'];
        this.requestId = params['requestId'];
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
  async checkStartDate(event){
    this.errorStartDate = "succsessFiled";
    this.isErrorStartDate = 1;
    this.dateStart = event;
    if(this.dateStart == "" || this.dateStart == undefined){
      this.errorStartDate = "errorFiled";
      this.isErrorStartDate = 0;
    }
  }
  async checkEndDate(event){
    this.errorEndDate = "succsessFiled";
    this.isErrorEndDate = 1;
    this.dateEnd = event;
    if(this.dateEnd == "" || this.dateEnd == undefined){
      this.errorEndDate = "errorFiled";
      this.isErrorEndDate = 0;
    }
  }
  async checkWorkingHours(event){
    this.errorWorkingHours = "succsessFiled";
    this.isErrorWorkingHours = 1;
    this.workingHours = event;
    if(this.workingHours == "" || this.workingHours == undefined){
      this.errorWorkingHours = "errorFiled";
      this.isErrorWorkingHours = 0;
    }
  }
  async checkTechnicianName(event){
    this.errorTechnicianName = "succsessFiled";
    this.isErrorTechnicianName = 1;
    this.technicianName = event;
    if(this.technicianName == "" || this.technicianName == undefined){
      this.errorTechnicianName = "errorFiled";
      this.isErrorTechnicianName = 0;
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
    if((this.dateStart == undefined || this.dateStart == "" || this.dateStart == null || this.dateStart == "null")
      && (this.dateEnd == undefined || this.dateEnd == "" || this.dateEnd == null || this.dateEnd == "null")
      && (this.workingHours == undefined || this.workingHours == "" || this.workingHours == null || this.workingHours == "null")
      && (this.technicianName == undefined || this.technicianName == "" || this.technicianName == null || this.technicianName == "null")
      && (this.findings == undefined || this.findings == "" || this.findings == null || this.findings == "null")
      && (this.corrections == undefined || this.corrections == "" || this.corrections == null || this.corrections == "null")
      && (this.replacedParts == undefined || this.replacedParts == "" || this.replacedParts == null || this.replacedParts == "null")
      && (this.notes == undefined || this.notes == "" || this.notes == null || this.notes == "null")
    ){
      this.errorStartDate = "errorFiled";
      this.isErrorStartDate = 0;
      this.errorEndDate = "errorFiled";
      this.isErrorEndDate = 0;
      this.errorWorkingHours = "errorFiled";
      this.isErrorWorkingHours = 0;
      this.errorTechnicianName = "errorFiled";
      this.isErrorTechnicianName = 0;
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
    if(this.dateStart == undefined || this.dateStart == "" || this.dateStart == null || this.dateStart == "null"){
      this.errorStartDate = "errorFiled";
      this.isErrorStartDate = 0;
      return false;
    }
    if(this.dateEnd == undefined || this.dateEnd == "" || this.dateEnd == null || this.dateEnd == "null"){
      this.errorEndDate = "errorFiled";
      this.isErrorEndDate = 0;
      return false;
    }
    if(this.workingHours == undefined || this.workingHours == "" || this.workingHours == null || this.workingHours == "null"){
      this.errorWorkingHours = "errorFiled";
      this.isErrorWorkingHours = 0;
      return false;
    }
    if(this.technicianName == undefined || this.technicianName == "" || this.technicianName == null || this.technicianName == "null"){
      this.errorTechnicianName = "errorFiled";
      this.isErrorTechnicianName = 0;
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
    if(this.dateStart != undefined && this.dateStart != null && this.dateEnd != undefined && this.dateEnd != null && this.workingHours != undefined && this.workingHours != null && this.technicianName != undefined && this.technicianName != null && this.findings != undefined && this.findings != null && this.corrections != undefined && this.corrections != null && this.replacedParts != undefined && this.replacedParts != null && this.notes != undefined && this.notes != null) {
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 3500,
      });
      await loading.present();
      this.requestsService.taskfinished(this.userId,this.taskId,this.dateStart,this.dateEnd,this.workingHours,this.technicianName,this.findings,this.corrections,this.replacedParts,this.notes).then(async data=>{
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
  functionProgressTasks(){
    this.navCtrl.navigateRoot("/progresstasks");
  }
  settings(){
    this.navCtrl.navigateRoot("/settings");
  }
}
