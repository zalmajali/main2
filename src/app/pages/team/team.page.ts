import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform,ModalController, ToastController,AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@ionic-native/network/ngx';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {
  public menu3:any;
  public menu5:any;
  public menu6:any;
  public menu7:any;
  public menu8:any;

  public float: any;
  public dir: any;
  public operationResult:any;
  public message:any;
  public checkLanguage: any=0;
  public language: string;
  public internetMessage: any;
  public userId:any;
  public departmentId:any;
  public type:any;
  public email:any;
  public imageInformation:any=1;
  public teamTitle:any;
  public employeeName:any;
  public employeeJob:any;
  public employeeEmail:any;
  public employeeMobile:any;
  public employeeLastEnter:any;
  public returnEmployeesData:any;
  public returnArrayEmployeesFromServer:any;
  public returnEmployeesArray:any = [];
  public employees:any;
  public employeeUnBlock:any;
  public employeeBlock:any;
  public toastStyle:any;
  public sorry:any;
  public sorryReson:any;
  public newNotifications:any='';
  public returnNotfiData:any;
  public supervisor:any;
  public manager:any;
  public op:any;
  public departmentName:any;
  public floatTow:any;

  public signOut:any;
  public signMsg:any;
  public settingsYas:any;
  public settingsNo:any;
  public messageSuccess:any;
  public messageFailedOne:any;
  public messageFailedTow:any;

  public returnUserData:any;
  public returnArrayUserFromServer:any;
  public returnUserArray:any = [];
  public getDataByUser:any = 0;
  public blockMessage:any;
  public unBlockMessage:any;
  public blockUnblockMsg:any;
  public connectionError:any;
  constructor(private iab: InAppBrowser,private callNumber: CallNumber,private globalization: Globalization,private alertController:AlertController,private modalController: ModalController, private translate: TranslateService,private http:HttpClient,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private usersService:UsersService,private toastCtrl: ToastController,private loading: LoadingController) {
    this.checkInternetData();
    this.menu.enable(false,"last");
    this.menu.enable(false,"first");
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/home');
    });
  }
  initialiseTranslation(){
    this.translate.get('menu8').subscribe((res: string) => {
      this.teamTitle = res;
    });
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
    this.translate.get('employee_name').subscribe((res: string) => {
      this.employeeName = res;
    });
    this.translate.get('employee_job').subscribe((res: string) => {
      this.employeeJob = res;
    });
    this.translate.get('employee_email').subscribe((res: string) => {
      this.employeeEmail = res;
    });
    this.translate.get('employee_mobile').subscribe((res: string) => {
      this.employeeMobile = res;
    });
    this.translate.get('employee_last_enter').subscribe((res: string) => {
      this.employeeLastEnter = res;
    });
    this.translate.get('employee_un_block').subscribe((res: string) => {
      this.employeeUnBlock = res;
    });
    this.translate.get('employee_block').subscribe((res: string) => {
      this.employeeBlock = res;
    });
    this.translate.get('sorry').subscribe((res: string) => {
      this.sorry = res;
    });
    this.translate.get('sorry_reson').subscribe((res: string) => {
      this.sorryReson = res;
    });
    this.translate.get('manager').subscribe((res: string) => {
      this.manager = res;
    });
    this.translate.get('supervisor').subscribe((res: string) => {
      this.supervisor = res;
    });
    this.translate.get('department_name').subscribe((res: string) => {
      this.departmentName = res;
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
    this.translate.get('settings_yas').subscribe((res: string) => {
      this.settingsYas = res;
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
    this.translate.get('block_message').subscribe((res: string) => {
      this.blockMessage = res;
    });
    this.translate.get('un_block_message').subscribe((res: string) => {
      this.unBlockMessage = res;
    });
    this.translate.get('connection_error').subscribe((res: string) => {
      this.connectionError = res;
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
  functionCallNumber(numer:any){
    this.callNumber.callNumber(numer, true)
      .then(res =>{})
      .catch(err =>{
        this.message = this.connectionError;
        this.displayResult(this.message);
      });
  }
  functionSendEmail(email:any){
    const browser = this.iab.create('mailto:'+email ,'_system',{location:'yes',clearcache:'yes',toolbar:'no'});
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
      if(this.departmentId!=1 && this.type=='man')
        this.getDataByUser = 2;
      else if(this.departmentId==1 && this.type=='man')
        this.getDataByUser = 3;
      else if(this.type=='itMan')
        this.getDataByUser = 5;
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 2000,
      });
      await loading.present();
      this.usersService.employees(this.userId,this.type,this.departmentId).then(async data=>{
        this.returnEmployeesData = data;
        this.operationResult = this.returnEmployeesData.Error.ErrorCode;
        if(this.operationResult==1){
          this.returnArrayEmployeesFromServer = this.returnEmployeesData.Data.employees;
          this.op = this.returnEmployeesData.Data.op;
          for(let i = 0; i < this.returnArrayEmployeesFromServer.length;i++) {
            this.returnEmployeesArray[i]=[];
            this.returnEmployeesArray[i]['id'] = this.returnArrayEmployeesFromServer[i].id;
            this.returnEmployeesArray[i]['fullName'] = this.returnArrayEmployeesFromServer[i].fullName;
            this.returnEmployeesArray[i]['mobile'] = this.returnArrayEmployeesFromServer[i].mobile;
            this.returnEmployeesArray[i]['jobTitle'] = this.returnArrayEmployeesFromServer[i].jobTitle;
            this.returnEmployeesArray[i]['email'] = this.returnArrayEmployeesFromServer[i].email;
            this.returnEmployeesArray[i]['viceManager'] = this.returnArrayEmployeesFromServer[i].viceManager;
            this.returnEmployeesArray[i]['lastLoginTime'] = this.returnArrayEmployeesFromServer[i].lastLoginTime;
            if(this.returnArrayEmployeesFromServer[i].block == 1){
              this.returnEmployeesArray[i]['block'] = this.employeeBlock;
              this.returnEmployeesArray[i]['blockTow'] =1;
              this.returnEmployeesArray[i]['class'] ="teamStatusNotOk";
              this.returnEmployeesArray[i]['style'] ="#d3d8e0";
            }else{
              this.returnEmployeesArray[i]['block'] = this.employeeUnBlock;
              this.returnEmployeesArray[i]['class'] ="teamStatusOk";
              this.returnEmployeesArray[i]['style'] ="#ffffff";
              this.returnEmployeesArray[i]['blockTow'] =0;
            }
            if(this.returnArrayEmployeesFromServer[i].showPhoto == 1){
              this.returnEmployeesArray[i]['photo'] = this.returnArrayEmployeesFromServer[i].photo;
              if(this.returnEmployeesArray[i]['photo'] == null || this.returnEmployeesArray[i]['photo'] == undefined || this.returnEmployeesArray[i]['photo']=="" || this.returnEmployeesArray[i]['photo']==0)
                this.returnEmployeesArray[i]['photo'] = "../../assets/imgs/person-icon-1687.png";
            }else{
              this.returnEmployeesArray[i]['photo'] = "../../assets/imgs/person-icon-1687.png";
            }
            if(this.returnEmployeesData.Data.op == 1){
              await this.storage.get('checkLanguage').then(async checkLanguage=>{
                this.checkLanguage = checkLanguage
              });
              if(this.checkLanguage){
                if(this.language != "en")
                  this.returnEmployeesArray[i]['departmentName'] = this.returnArrayEmployeesFromServer.Data.departmentNameEn;
                else
                  this.returnEmployeesArray[i]['departmentName'] = this.returnArrayEmployeesFromServer.Data.departmentNameEn;
              }else{
                if (window.Intl && typeof window.Intl === 'object') {
                  let Val  = navigator.language.split("-");
                  if(this.language != "en")
                    this.returnEmployeesArray[i]['departmentName'] = this.returnArrayEmployeesFromServer[i].departmentNameEn;
                  else
                    this.returnEmployeesArray[i]['departmentName'] = this.returnArrayEmployeesFromServer[i].departmentNameEn;
                }
                else{
                  this.globalization.getPreferredLanguage().then(res => {
                    let Val  = res.value.split("-");
                    if(this.language != "en")
                      this.returnEmployeesArray[i]['departmentName'] = this.returnArrayEmployeesFromServer[i].departmentNameEn;
                    else
                      this.returnEmployeesArray[i]['departmentName'] = this.returnArrayEmployeesFromServer[i].departmentNameEn;
                  }).catch(e => {console.log(e);});
                }
              }
              if(this.returnArrayEmployeesFromServer[i].type == 1)
                this.returnEmployeesArray[i]['type'] = this.manager
              else
                this.returnEmployeesArray[i]['type'] = this.supervisor
            }
          }
          console.log(this.returnEmployeesArray)
          let countOfData = this.returnEmployeesArray.length;
          if(countOfData == 0)
            this.employees = 0;
          else{
            this.employees = 1;
          }
        }else
          this.employees = 0;
      });
    }
    this.notifications();
  }
  functionTasks(userId:any){
    this.navCtrl.navigateRoot(["/alltasks", {assigned:userId,page:10}]);
  }
  functionOrders(userId:any){
    this.navCtrl.navigateRoot(["/allrequestusers", {userId:userId}]);
  }
  async functionBlockUnBlockUser(userId:any,index:any,type:any){
    if(type != 1)
      this.blockUnblockMsg = this.blockMessage
    else
      this.blockUnblockMsg = this.unBlockMessage

    const alert = await this.alertController.create({
      cssClass: 'alertBac',
      mode: 'ios',
      message: this.blockUnblockMsg,
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
            this.usersService.employeesBlock(this.userId,userId).then(async data=>{
              this.returnUserData = data;
              this.operationResult = this.returnUserData.Error.ErrorCode;
              if(this.operationResult==1){
                if(type != 1){
                  this.returnEmployeesArray[index]['block'] = this.employeeBlock;
                  this.returnEmployeesArray[index]['blockTow'] =1;
                  this.returnEmployeesArray[index]['class'] ="teamStatusNotOk";
                  this.returnEmployeesArray[index]['style'] ="#d3d8e0";
                }else{
                  this.returnEmployeesArray[index]['block'] = this.employeeUnBlock;
                  this.returnEmployeesArray[index]['class'] ="teamStatusOk";
                  this.returnEmployeesArray[index]['style'] ="#ffffff";
                  this.returnEmployeesArray[index]['blockTow'] =0;
                }
                this.displayResult(this.messageSuccess);
                this.ngOnInit();
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
  async changeUserStatuse(userId:any,index:any){
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
            this.usersService.userStatuse(userId).then(async data=>{
              this.returnUserData = data;
              this.operationResult = this.returnUserData.Error.ErrorCode;
              if(this.operationResult==1){
                for(let i = 0; i < this.returnEmployeesArray.length;i++) {
                  this.returnEmployeesArray[i]['viceManager'] = 0;
                }
                this.displayResult(this.messageSuccess);
                this.returnEmployeesArray[index]['viceManager'] = 1;
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
