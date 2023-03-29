import { Component, OnInit } from '@angular/core';
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
  selector: 'app-addnewtask',
  templateUrl: './addnewtask.page.html',
  styleUrls: ['./addnewtask.page.scss'],
})
export class AddnewtaskPage implements OnInit {
  public menu3:any;
  public menu5:any;
  public menu6:any;
  public menu7:any;
  public menu8:any;

  public requestsAddTitle:any;
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
  public toastStyle:any;
  public arrowBack:any;
  public add:any;
  public isdisabled:boolean=true;

  public orderId:any;
  public isErrorOrderIdMsg:any;
  public errorOrderId:any="";
  public isErrorOrderId:any = 1;
  public placeholderOrderId:any;

  public employeesId:any;
  public isErrorEmployeesIdMsg:any;
  public errorEmployeesId:any="";
  public isErrorEmployeesId:any = 1;
  public placeholderEmployeesId:any;

  public addNewTask:any;
  public settingsNo:any;
  public settingsYas:any;
  public returnEmployeesData:any;
  public returnArrayEmployeesFromServer:any;
  public returnEmployeesArray:any = [];
  public addMessageFailedTasks:any;
  public supervisor:any;
  public showvalues:any=0;
  public returnRequestData:any;
  public returnArrayRequestFromServer:any;
  public returnRequestArray:any = [];

  public addMessageSuccess:any;
  public addMessageFailedOne:any;
  public addMessageFaileTow:any;
  public newNotifications:any='';
  public returnNotfiData:any;
  public taskPage:any;
  constructor(private usersService:UsersService,private activaterouter : ActivatedRoute,private router : Router,private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private http:HttpClient,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private requestsService:RequestsService,private toastCtrl: ToastController,private loading: LoadingController) {
    this.checkInternetData();
    this.menu.enable(false,"last");
    this.menu.enable(false,"first");
  }
  initialiseTranslation(){
    this.translate.get('add_request').subscribe((res: string) => {
      this.requestsAddTitle = res;
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
    this.translate.get('placeholder_order_id').subscribe((res: string) => {
      this.placeholderOrderId = res;
    });
    this.translate.get('placeholder_employees_id').subscribe((res: string) => {
      this.placeholderEmployeesId = res;
    });
    this.translate.get('add').subscribe((res: string) => {
      this.add = res;
    });
    this.translate.get('add_new_task').subscribe((res: string) => {
      this.addNewTask = res;
    });
    this.translate.get('is_error_order_id_msg').subscribe((res: string) => {
      this.isErrorOrderIdMsg = res;
    });
    this.translate.get('is_error_employees_id_msg').subscribe((res: string) => {
      this.isErrorEmployeesIdMsg = res;
    });
    this.translate.get('settings_No').subscribe((res: string) => {
      this.settingsNo = res;
    });
    this.translate.get('settings_yas').subscribe((res: string) => {
      this.settingsYas = res;
    });
    this.translate.get('add_message_failed_tasks').subscribe((res: string) => {
      this.addMessageFailedTasks = res;
    });
    this.translate.get('supervisor').subscribe((res: string) => {
      this.supervisor = res;
    });
    this.translate.get('add_task_message_success').subscribe((res: string) => {
      this.addMessageSuccess = res;
    });
    this.translate.get('add_task_message_failed_one').subscribe((res: string) => {
      this.addMessageFailedOne = res;
    });
    this.translate.get('add_task_message_failed_tow').subscribe((res: string) => {
      this.addMessageFaileTow = res;
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
    if(this.userId == null  || this.type == null || this.email == null){
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
    }
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 3500,
    });
    await loading.present();
    this.activaterouter.params.subscribe(params => {
      this.taskPage = params['taskPage'];
    });
    this.requestsService.getAllRequest(this.userId).then(async data=>{
      this.returnRequestData = data;
      this.operationResult = this.returnRequestData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayRequestFromServer = this.returnRequestData.Data.request;
        for(let i = 0; i < this.returnArrayRequestFromServer.length;i++) {
          this.returnRequestArray[i]=[];
          this.returnRequestArray[i]['id'] =this.returnArrayRequestFromServer[i].id;
          await this.storage.get('checkLanguage').then(async checkLanguage=>{
            this.checkLanguage = checkLanguage
          });
          if(this.checkLanguage){
            if(this.language != "en")
              this.returnRequestArray[i]['number'] = this.returnArrayRequestFromServer[i].nameEn+" #"+this.returnArrayRequestFromServer[i].id;
            else{
              this.returnRequestArray[i]['number'] = this.returnArrayRequestFromServer[i].nameEn+" #"+this.returnArrayRequestFromServer[i].id;
            }
          }else{
            if (window.Intl && typeof window.Intl === 'object') {
              let Val  = navigator.language.split("-");
              if(this.language != "en")
                this.returnRequestArray[i]['number'] = this.returnArrayRequestFromServer[i].nameEn+" #"+this.returnArrayRequestFromServer[i].id;
              else{
                this.returnRequestArray[i]['number'] = this.returnArrayRequestFromServer[i].nameEn+" #"+this.returnArrayRequestFromServer[i].id;
              }
            }
            else{
              this.globalization.getPreferredLanguage().then(res => {
                let Val  = res.value.split("-");
                if(this.language != "en")
                  this.returnRequestArray[i]['number'] = this.returnArrayRequestFromServer[i].nameEn+" #"+this.returnArrayRequestFromServer[i].id;
                else{
                  this.returnRequestArray[i]['number'] = this.returnArrayRequestFromServer[i].nameEn+" #"+this.returnArrayRequestFromServer[i].id;
                }
              }).catch(e => {console.log(e);});
            }
          }
        }
        console.log(this.returnRequestArray)
      }
    });
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
  async checkOrderId(event){
    this.errorOrderId = "succsessFiled";
    this.isErrorOrderId = 1;
    this.orderId = event;
    if(this.orderId == "" || this.orderId == undefined || this.orderId == 0){
      this.errorOrderId = "errorFiled";
      this.isErrorOrderId = 0;
    }else{
      await this.requestsService.selectUserRequests(this.orderId).then(async data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        this.returnEmployeesArray=[];
        if(this.operationResult==1){
          this.returnArrayEmployeesFromServer = this.returnData.Data.employees;
          for(let i = 0; i < this.returnArrayEmployeesFromServer.length;i++) {
            this.returnEmployeesArray[i]=[];
            this.returnEmployeesArray[i]['id'] = this.returnArrayEmployeesFromServer[i].id;
            this.returnEmployeesArray[i]['fullName'] = this.supervisor+" "+this.returnArrayEmployeesFromServer[i].fullName;
          }
          this.showvalues = 1;
        }else if(this.operationResult==2){
          this.showvalues = 0;
          this.message = this.addMessageFailedTasks;
          this.displayResult(this.message);
        }else if(this.operationResult==3){
          this.showvalues = 0;
          this.message = this.addMessageFailedTasks;
          this.displayResult(this.message);
        }
      }).catch(e=>{
        this.showvalues = 0;
        this.message = this.addMessageFailedTasks;
        this.displayResult(this.message);
      })
    }
  }
  async checkOrderIdAfterAdd(event){
    this.errorOrderId = "succsessFiled";
    this.isErrorOrderId = 1;
    this.orderId = event;
    if(this.orderId == "" || this.orderId == undefined || this.orderId == 0){
      this.errorOrderId = "errorFiled";
      this.isErrorOrderId = 0;
    }else{
      await this.requestsService.selectUserRequests(this.orderId).then(async data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        this.returnEmployeesArray=[];
        if(this.operationResult==1)
          this.checkOrderId(this.orderId);
        else if(this.operationResult!=1){
          if(this.taskPage!=undefined){
            if(this.taskPage == 1)
              this.navCtrl.navigateRoot("/alltasks");
            else if(this.taskPage == 2)
              this.navCtrl.navigateRoot("/newtasks");
          }else
            this.navCtrl.navigateRoot("/home");
        }
      }).catch(e=>{
        if(this.taskPage!=undefined){
          if(this.taskPage == 1)
            this.navCtrl.navigateRoot("/alltasks");
          else if(this.taskPage == 2)
            this.navCtrl.navigateRoot("/newtasks");
        }else
          this.navCtrl.navigateRoot("/home");
      })
    }
  }
  functionBackHome(){
    if(this.taskPage!=undefined){
      if(this.taskPage == 1)
        this.navCtrl.navigateRoot("/alltasks");
      else if(this.taskPage == 2)
        this.navCtrl.navigateRoot("/newtasks");
    }else
      this.navCtrl.navigateRoot("/home");
  }
  async checkEmployeesId(event){
    this.errorEmployeesId = "succsessFiled";
    this.isErrorEmployeesId = 1;
    this.employeesId = event;
    if(this.employeesId == "" || this.employeesId == undefined || this.employeesId == 0){
      this.errorEmployeesId = "errorFiled";
      this.isErrorEmployeesId = 0;
    }
  }
  async addTask(){
    this.checkInternetData();
    if((this.orderId == undefined || this.orderId == "" || this.orderId == null || this.orderId == "null") && (this.employeesId == undefined || this.employeesId == "" || this.employeesId == null || this.employeesId == "null")){
      this.errorOrderId = "errorFiled";
      this.isErrorOrderId = 0;
      this.errorEmployeesId = "errorFiled";
      this.isErrorEmployeesId = 0;
      return false;
    }
    if(this.orderId == undefined || this.orderId == "" || this.orderId == null || this.orderId == "null"){
      this.errorOrderId = "errorFiled";
      this.isErrorOrderId = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.employeesId == undefined || this.employeesId == "" || this.employeesId == null || this.employeesId == "null"){
      this.errorEmployeesId = "errorFiled";
      this.isErrorEmployeesId = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.employeesId != undefined && this.employeesId != null && this.orderId != undefined && this.orderId != null) {
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 3500,
      });
      await loading.present();
      this.requestsService.addTask(this.orderId,this.employeesId,this.userId).then(async data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        if(this.operationResult==1){
          this.message = this.addMessageSuccess;
          this.displayResult(this.message);
          this.checkOrderIdAfterAdd(this.orderId)
        }else if(this.operationResult==2){
          this.message = this.addMessageFailedOne;
          this.displayResult(this.message);
        }else if(this.operationResult==3){
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
  functionTeam(){
    this.navCtrl.navigateRoot("/team");
  }
  functionNewtasks(){
    this.navCtrl.navigateRoot("/newtasks");
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
