import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform,ModalController, ToastController,AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@ionic-native/network/ngx';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  public menu3:any;
  public menu5:any;
  public menu6:any;
  public menu7:any;
  public menu8:any;

  public loginTitle:any;
  public float: any;
  public dir: any;
  public operationResult:any;
  public returnData:any;
  public returnFullName:any;
  public returnNumber:any;

  public showPassword: boolean = false;
  public loadingWait:any;
  public isdisabled:boolean=true;

  public loadingShow:any = 0;
  public message:any;
  public checkLanguage: any=0;
  public language: string;
  public internetMessage: any;
  public userId:any;
  public departmentId:any;
  public type:any;
  public email:any;

  public changPassTitle:any;

  public oaldPassword:any;
  public isErrorOaldPasswordMsg:any;
  public errorOaldPassword:any="";
  public isErrorOaldPassword:any = 1;
  public placeholderOaldPassword: any;

  public newPassword:any;
  public isErrorNewPasswordMsg:any;
  public errorNewPassword:any="";
  public isErrorNewPassword:any = 1;
  public placeholderNewPassword: any;

  public RenewPassword:any;
  public isErrorReNewPasswordMsg:any;
  public errorReNewPassword:any="";
  public isErrorReNewPassword:any = 1;
  public placeholderReNewPassword: any;
  public msgMatch: any;
  public changPassMessageSuccess: any;
  public changPassMessageFailedOne: any;
  public changPassMessageFailedTow: any;
  public changPassMessageFailedThree: any;
  public changPassMessageFailedFore: any;
  public isErrorReNewPasswordAndNewPasswordMsg:any;
  public changPass:any;
  public imageInformation:any=1;
  public toastStyle:any;
  public newNotifications:any='';
  public returnNotfiData:any;
  public newTasks:any;
  public showOldPassword: boolean = false;
  public showNewPassword: boolean = false;
  public showReNewPassword: boolean = false;
  constructor(private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private http:HttpClient,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private usersService:UsersService,private toastCtrl: ToastController,private loading: LoadingController) {
    this.checkInternetData();
    this.menu.enable(false,"last");
    this.menu.enable(false,"first");
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/settings');
    });
  }
  initialiseTranslation(){
    this.translate.get('changPass_Title').subscribe((res: string) => {
      this.changPassTitle = res;
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
    this.translate.get('changPass_send').subscribe((res: string) => {
      this.changPass = res;
    });
    this.translate.get('isError_oald_password_msg').subscribe((res: string) => {
      this.isErrorOaldPasswordMsg = res;
    });
    this.translate.get('loadingWait').subscribe((res: string) => {
      this.loadingWait = res;
    });
    this.translate.get('placeholder_oald_password').subscribe((res: string) => {
      this.placeholderOaldPassword = res;
    });
    this.translate.get('isError_new_password_msg').subscribe((res: string) => {
      this.isErrorNewPasswordMsg = res;
    });
    this.translate.get('placeholder_new_password').subscribe((res: string) => {
      this.placeholderNewPassword = res;
    });
    this.translate.get('isError_re_new_password_msg').subscribe((res: string) => {
      this.isErrorReNewPasswordMsg = res;
    });
    this.translate.get('placeholder_re_new_password').subscribe((res: string) => {
      this.placeholderReNewPassword = res;
    });
    this.translate.get('changPass_message_success').subscribe((res: string) => {
      this.changPassMessageSuccess = res;
    });
    this.translate.get('changPass_message_failed_one').subscribe((res: string) => {
      this.changPassMessageFailedOne = res;
    });
    this.translate.get('changPass_message_failed_tow').subscribe((res: string) => {
      this.changPassMessageFailedTow = res;
    });
    this.translate.get('changPass_message_failed_three').subscribe((res: string) => {
      this.changPassMessageFailedThree = res;
    });
    this.translate.get('changPass_message_failed_fore').subscribe((res: string) => {
      this.changPassMessageFailedFore = res;
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
  checkOlad(event){
    this.errorOaldPassword = "succsessFiled";
    this.isErrorOaldPassword = 1;
    this.oaldPassword = event;
    if(this.oaldPassword == "" || this.oaldPassword == undefined){
      this.errorOaldPassword = "errorFiled";
      this.isErrorOaldPassword = 0;
    }
    this.isEnterAllValues();
  }
  checkNew(event){
    this.errorNewPassword = "succsessFiled";
    this.isErrorNewPassword = 1;
    this.newPassword = event;
    if(this.newPassword == "" || this.newPassword == undefined){
      this.errorNewPassword = "errorFiled";
      this.isErrorNewPassword = 0;
    }else if(this.RenewPassword != this.newPassword){
      this.errorReNewPassword = "errorFiled";
      this.isErrorReNewPassword = 0;
    }
    this.isEnterAllValues();
  }
  checkReNew(event){
    this.RenewPassword = event;
    if(this.RenewPassword == "" || this.RenewPassword == undefined){
      this.errorReNewPassword = "errorFiled";
      this.isErrorReNewPassword = 0;
    }else if(this.RenewPassword != this.newPassword){
      this.errorReNewPassword = "errorFiled";
      this.isErrorReNewPassword = 0;
    }else{
      this.errorReNewPassword = "succsessFiled";
      this.isErrorReNewPassword = 1;
    }
    this.isEnterAllValues();
  }
  isEnterAllValues(){
    if(this.oaldPassword != undefined && this.oaldPassword != "" && this.newPassword != undefined && this.newPassword != "" && this.RenewPassword != undefined && this.RenewPassword != ""){
      this.isdisabled = true;
    }
  }
  async ngOnInit() {
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
    }
    await this.getDeviceLanguage();
    this.checkInternetData();
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
  changeOldInputType(){
    this.showOldPassword = !this.showOldPassword;
  }
  changeNewInputType(){
    this.showNewPassword = !this.showNewPassword;
  }
  changeReNewInputType(){
    this.showReNewPassword = !this.showReNewPassword;
  }
  async changePassword(){
    this.checkInternetData();
    if(this.oaldPassword == undefined || this.oaldPassword == "" || this.newPassword == undefined || this.newPassword == "" || this.RenewPassword == undefined || this.RenewPassword == ""){
      this.errorNewPassword = "errorFiled";
      this.isErrorNewPassword = 0;
      this.errorOaldPassword = "errorFiled";
      this.isErrorOaldPassword = 0;
      this.errorReNewPassword = "errorFiled";
      this.isErrorReNewPassword = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.oaldPassword == undefined || this.oaldPassword == ""){
      this.errorNewPassword = "errorFiled";
      this.isErrorNewPassword = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.newPassword == undefined || this.newPassword == ""){
      this.errorOaldPassword = "errorFiled";
      this.isErrorOaldPassword = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.RenewPassword == undefined || this.RenewPassword == ""){
      this.errorReNewPassword = "errorFiled";
      this.isErrorReNewPassword = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.RenewPassword != this.newPassword){
      this.errorReNewPassword = "errorFiled";
      this.isErrorReNewPassword = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.oaldPassword != undefined && this.newPassword != undefined && this.RenewPassword != undefined){
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 2000,
      });
      await loading.present();
      this.usersService.changePassword(this.userId,this.oaldPassword,this.newPassword).then(async data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        if(this.operationResult==1){
          this.message = this.changPassMessageSuccess;
          this.displayResult(this.message);
          await this.storage.set('password',this.newPassword);
          this.navCtrl.navigateRoot('/home');
        }else if(this.operationResult==2){
          this.message = this.changPassMessageFailedOne;
          this.displayResult(this.message);
        }else if(this.operationResult==3){
          this.message = this.changPassMessageFailedTow;
          this.displayResult(this.message);
        }else{
          this.message = this.changPassMessageFailedThree;//كلمة المرور القديمة غير صحيحة
          this.displayResult(this.message);
        }
      }).catch(e=>{
        this.message = this.changPassMessageFailedFore;
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
  functionRequest(){
    this.router.navigate(["/myrequests", {typeId:2}])
  }
  functionAddrequest(){
    this.navCtrl.navigateRoot("/addrequest");
  }
  functionAllrequest(){
    this.navCtrl.navigateRoot("/allrequest");
  }
  functionTeam(){
    this.navCtrl.navigateRoot("/team");
  }
  functionNewtasks(){
    this.navCtrl.navigateRoot("/newtasks");
  }
  functionProgressTasks(){
    this.navCtrl.navigateRoot("/progresstasks");
  }
  settings(){
    this.navCtrl.navigateRoot("/settings");
  }
}
