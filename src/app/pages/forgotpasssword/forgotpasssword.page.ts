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
  selector: 'app-forgotpasssword',
  templateUrl: './forgotpasssword.page.html',
  styleUrls: ['./forgotpasssword.page.scss'],
})
export class ForgotpassswordPage implements OnInit {
  public forgotTitle:any;
  public float: any;
  public dir: any;
  public message:any;
  public loadingShow:any = 0;
  public forgotSend:any;

  public jobNumberOrEmail:any;
  public isErrorJobNumberOrEmailMsg:any;
  public errorJobNumberOrEmail:any="";
  public isErrorJobNumberOrEmail:any = 1;
  public isdisabled:boolean=true;
  public returnData:any;
  public operationResult:any;

  public checkLanguage: any=0;
  public language: string;
  public menu1:any;
  public menu2:any;
  public menu3:any;
  public menu4:any;
  public internetMessage: any;
  public loadingWait:any;

  public forgotMessageSuccess: any;
  public forgotMessageFailedOne: any;
  public forgotMessageFailedTow: any;
  public forgotMessageFailedThree: any;
  public forgotMessageFailedFore: any;
  public placeholderJobNumberOrEmail: any;
  public toastStyle:any;
  constructor(private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private http:HttpClient,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private usersService:UsersService,private toastCtrl: ToastController,private loading: LoadingController) {
    this.checkInternetData();
    this.menu.enable(false,"last");
    this.menu.enable(false,"first");
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/login');
    });
  }
  checkEmailOrJopNumber(event){
    this.errorJobNumberOrEmail = "succsessFiled";
    this.isErrorJobNumberOrEmail = 1;
    this.jobNumberOrEmail = event;
    if(this.jobNumberOrEmail == "" || this.jobNumberOrEmail == undefined){
      this.errorJobNumberOrEmail = "errorFiled";
      this.isErrorJobNumberOrEmail = 0;
    }
    this.isEnterAllValues();
  }
  isEnterAllValues(){
    if(this.jobNumberOrEmail != undefined || this.jobNumberOrEmail != ""){
      this.isdisabled = true;
    }
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.checkInternetData();
  }
  initialiseTranslation(){
    this.translate.get('forgot_Title').subscribe((res: string) => {
      this.forgotTitle = res;
    });
    this.translate.get('floatD').subscribe((res: string) => {
      this.float = res;
    });
    this.translate.get('forgot_send').subscribe((res: string) => {
      this.forgotSend = res;
    });
    this.translate.get('isError_job_number_or_email_msg').subscribe((res: string) => {
      this.isErrorJobNumberOrEmailMsg = res;
    });
    this.translate.get('internet_message').subscribe((res: string) => {
      this.internetMessage = res;
    });
    this.translate.get('forgot_message_success').subscribe((res: string) => {
      this.forgotMessageSuccess = res;
    });
    this.translate.get('forgot_placeholder_job_number_or_email').subscribe((res: string) => {
      this.placeholderJobNumberOrEmail = res;
    });
    this.translate.get('forgot_message_failed_one').subscribe((res: string) => {
      this.forgotMessageFailedOne = res;
    });
    this.translate.get('forgot_message_failed_tow').subscribe((res: string) => {
      this.forgotMessageFailedTow = res;
    });
    this.translate.get('forgot_message_failed_three').subscribe((res: string) => {
      this.forgotMessageFailedThree = res;
    });
    this.translate.get('forgot_message_failed_fore').subscribe((res: string) => {
      this.forgotMessageFailedFore = res;
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
  async forgotPassword(){
    this.checkInternetData();
    if(this.jobNumberOrEmail == undefined || this.jobNumberOrEmail == ""){
      this.errorJobNumberOrEmail = "errorFiled";
      this.isErrorJobNumberOrEmail  = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.jobNumberOrEmail != undefined ){
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 2000,
      });
      await loading.present();
      this.usersService.forgotPassword(this.jobNumberOrEmail).then(data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        if(this.operationResult==1){
          this.message = this.forgotMessageSuccess;
          this.displayResult(this.message);
          this.navCtrl.navigateRoot('/login');
        }else if(this.operationResult==2){
          this.message = this.forgotMessageFailedOne;
          this.displayResult(this.message);
        }else if(this.operationResult==3){
          this.message = this.forgotMessageFailedTow;
          this.displayResult(this.message);
        }else{
          this.message = this.forgotMessageFailedThree;
          this.displayResult(this.message);
        }
      }).catch(e=>{
        this.message = this.forgotMessageFailedFore;
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
  settings(){
    this.navCtrl.navigateRoot("/settings");
  }
  functionLogin(){
    this.navCtrl.navigateRoot('/login');
  }

}
