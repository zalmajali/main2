import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform,ModalController, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@ionic-native/network/ngx';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import {AboutComponent} from "../about/about.component";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginTitle:any;
  public float: any;
  public dir: any;
  public jobNumber:any;
  public errorJobNumber:any="";
  public isErrorJobNumber:any = 1;
  public placeholderJobNumber:any;
  public isErrorJobNumberMsg:any;


  public password:any;
  public errorPassword:any="";
  public isErrorPassword:any = 1;
  public placeholderPassword:any;
  public isErrorPasswordMsg:any;


  public isdisabled:boolean=true;
  public message:any;
  public loadingShow:any = 0;

  public internetMessage: any;
  public loginMessageSuccess: any;
  public loginMessageFailedOne: any;
  public loginMessageFailedTow: any;
  public loginMessageFailedThree: any;
  public loginMessageFailedFore: any;
  public loginMessageFailedfive: any;

  public operationResult:any;
  public returnData:any;
  public returnFullName:any;
  public returnNumber:any;
  public showPassword: boolean = false;
  public loadingWait:any;

  public menu1:any;
  public menu2:any;
  public menu3:any;
  public menu4:any;
//
  public checkLanguage: any=0;
  public language: string;
  public toastStyle:any;
  constructor(private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private http:HttpClient,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private usersService:UsersService,private toastCtrl: ToastController,private loading: LoadingController) {
    this.checkInternetData();
    this.menu.enable(false,"last");
    this.menu.enable(false,"first");
  }
  checkJobNumber(event){
    this.errorJobNumber = "succsessFiled";
    this.isErrorJobNumber = 1;
    this.jobNumber = event;
    if(this.jobNumber == "" || this.jobNumber == undefined){
      this.errorJobNumber = "errorFiled";
      this.isErrorJobNumber = 0;
    }
    this.isEnterAllValues();
  }
  checkPassword(event){
    this.errorPassword = "succsessFiled";
    this.isErrorPassword = 1;
    this.password = event;
    if(this.password == "" || this.password == undefined){
      this.errorPassword = "errorFiled";
      this.isErrorPassword = 0;
    }
    this.isEnterAllValues();
  }
  isEnterAllValues(){
    if(this.jobNumber != undefined && this.jobNumber != "" && this.password != undefined && this.password != ""){
      this.isdisabled = true;
    }
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.checkInternetData();
  }
  initialiseTranslation(){
    this.translate.get('login_Title').subscribe((res: string) => {
      this.loginTitle = res;
    });
    this.translate.get('floatD').subscribe((res: string) => {
      this.float = res;
    });
    this.translate.get('login_placeholder_job_number').subscribe((res: string) => {
      this.placeholderJobNumber = res;
    });
    this.translate.get('login_is_error_job_number_msg').subscribe((res: string) => {
      this.isErrorJobNumberMsg = res;
    });
    this.translate.get('login_placeholder_password').subscribe((res: string) => {
      this.placeholderPassword = res;
    });
    this.translate.get('login_is_error_password_msg').subscribe((res: string) => {
      this.isErrorPasswordMsg = res;
    });
    this.translate.get('internet_message').subscribe((res: string) => {
      this.internetMessage = res;
    });
    this.translate.get('login_message_success').subscribe((res: string) => {
      this.loginMessageSuccess = res;
    });
    this.translate.get('login_message_failed_one').subscribe((res: string) => {
      this.loginMessageFailedOne = res;
    });
    this.translate.get('login_message_failed_tow').subscribe((res: string) => {
      this.loginMessageFailedTow = res;
    });
    this.translate.get('login_message_failed_three').subscribe((res: string) => {
      this.loginMessageFailedThree = res;
    });
    this.translate.get('login_message_failed_fore').subscribe((res: string) => {
      this.loginMessageFailedFore = res;
    });
    this.translate.get('login_message_failed_five').subscribe((res: string) => {
      this.loginMessageFailedfive = res;
    });
    this.translate.get('dir').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('loadingWait').subscribe((res: string) => {
      this.loadingWait = res;
    });
    this.translate.get('menu1').subscribe((res: string) => {
      this.menu1 = res;
    });
    this.translate.get('menu2').subscribe((res: string) => {
      this.menu2 = res;
    });
    this.translate.get('menu3').subscribe((res: string) => {
      this.menu3 = res;
    });
    this.translate.get('menu4').subscribe((res: string) => {
      this.menu4 = res;
    });
  }
  async checkUser(){
    this.checkInternetData();
    if((this.jobNumber == undefined || this.jobNumber == "") && (this.password == undefined || this.password == "")){
      this.errorJobNumber = "errorFiled";
      this.errorPassword = "errorFiled";
      this.isErrorJobNumber = 0;
      this.isErrorPassword = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.jobNumber == undefined || this.jobNumber == ""){
      this.errorJobNumber = "errorFiled";
      this.isErrorJobNumber = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.password == undefined || this.password == ""){
      this.errorPassword = "errorFiled";
      this.isErrorPassword = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.jobNumber != undefined && this.password != undefined){
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 2000,
      });
      await loading.present();
      this.usersService.checkUser(this.jobNumber,this.password).then(async data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        if(this.operationResult==1){
          await this.storage.set('jobNumber',this.jobNumber);
          await this.storage.set('password',this.password);
          await this.storage.set('userId',this.returnData.Data.id);
          await this.storage.set('departmentId',this.returnData.Data.departmentId);
          await this.storage.set('departmentNameAr',this.returnData.Data.departmentNameAr);
          await this.storage.set('departmentNameEn',this.returnData.Data.departmentNameEn);
          await this.storage.set('fullName',this.returnData.Data.fullName);
          await this.storage.set('mobile',this.returnData.Data.mobile);
          await this.storage.set('jobTitle',this.returnData.Data.jobTitle);
          await this.storage.set('email',this.returnData.Data.email);
          await this.storage.set('photo',this.returnData.Data.photo);
          await this.storage.set('type',this.returnData.Data.type);
          await this.storage.set('viceManager',this.returnData.Data.viceManager);
          this.message = this.loginMessageSuccess;
          this.navCtrl.navigateRoot('home');
        }else if(this.operationResult==2){
          this.message = this.loginMessageFailedOne;
          this.displayResult(this.message);
        }else if(this.operationResult==3){
          this.message = this.loginMessageFailedTow;
          this.displayResult(this.message);
        }else if(this.operationResult==4){
          this.message = this.loginMessageFailedfive;
          this.displayResult(this.message);
        }else{
          this.message = this.loginMessageFailedThree;
          this.displayResult(this.message);
        }
      }).catch(async e=>{
        this.message = this.loginMessageFailedFore;
        this.displayResult(this.message);
      })
      this.isdisabled = true;
    }
  }
  ////page op
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
  async functionAbout(){
    let model = await this.modalController.create({
      component:AboutComponent,
      animated:true,
      mode:"ios",
      cssClass:"modalFilterSortCss"
    });
    await model.present();
  }
  forgotPasssword(){
    this.router.navigate(["/forgotpasssword"]);
  }
  settings(){
    this.router.navigate(["/settings"]);
  }
  changeInputType(){
    this.showPassword = !this.showPassword;
  }
}
