import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform,ModalController, ToastController,AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@ionic-native/network/ngx';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
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
  public accountTitle:any;
  public accountEdit:any;

  public photo:any;

  public fullName:any;
  public isErrorFullNameMsg:any;
  public errorFullName:any="";
  public isErrorFullName:any = 1;
  public placeholderFullName: any;

  public mobile:any;
  public isErrorMobileMsg:any;
  public errorMobile:any="";
  public isErrorMobile:any = 1;
  public placeholderMobile: any;

  public emailUser:any;
  public isErrorEmailMsg:any;
  public errorEmail:any="";
  public isErrorEmail:any = 1;
  public placeholderEmail: any;
  public accountMessageSuccess: any;
  public accountMessageFailedOne: any;
  public accountMessageFailedTow: any;
  public imageInformation:any=1;
  public toastStyle:any;
  public accountImageArray:any;
  public accountImage:any;
  public accountImagela:any;
  public allowedExtensions:any;
  public newNotifications:any='';
  public returnNotfiData:any;
  public uplodeAccountImage:any=0;
  public newTasks:any;
  public returnEmployeeData:any;
  public returnArrayEmployeeFromServer:any;
  constructor(private filePath: FilePath,private chooser: Chooser,private transfer: FileTransfer, private file: File,private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private http:HttpClient,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private usersService:UsersService,private toastCtrl: ToastController,private loading: LoadingController) {
    this.checkInternetData();
    this.menu.enable(false,"last");
    this.menu.enable(false,"first");
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/home');
    });
  }
  initialiseTranslation(){
    this.translate.get('account_Title').subscribe((res: string) => {
        this.accountTitle = res;
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
    this.translate.get('account_edit').subscribe((res: string) => {
      this.accountEdit = res;
    });
    this.translate.get('loadingWait').subscribe((res: string) => {
      this.loadingWait = res;
    });
    this.translate.get('isError_full_name_msg').subscribe((res: string) => {
      this.isErrorFullNameMsg = res;
    });
    this.translate.get('placeholder_full_name').subscribe((res: string) => {
      this.placeholderFullName = res;
    });
    this.translate.get('isError_mobile_msg').subscribe((res: string) => {
      this.isErrorMobileMsg = res;
    });
    this.translate.get('placeholder_mobile').subscribe((res: string) => {
      this.placeholderMobile = res;
    });
    this.translate.get('isError_email_msg').subscribe((res: string) => {
      this.isErrorEmailMsg = res;
    });
    this.translate.get('placeholder_email').subscribe((res: string) => {
      this.placeholderEmail = res;
    });
    this.translate.get('account_message_success').subscribe((res: string) => {
      this.accountMessageSuccess = res;
    });
    this.translate.get('account_message_failed_one').subscribe((res: string) => {
      this.accountMessageFailedOne = res;
    });
    this.translate.get('account_message_failed_tow').subscribe((res: string) => {
      this.accountMessageFailedTow = res;
    });
    this.translate.get('account_image').subscribe((res: string) => {
      this.accountImagela = res;
    });
    this.translate.get('allowed_extensions_account').subscribe((res: string) => {
      this.allowedExtensions = res;
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
  checkFullName(event){
    this.errorFullName = "succsessFiled";
    this.isErrorFullName = 1;
    this.fullName = event;
    if(this.fullName == "" || this.fullName == undefined){
      this.errorFullName = "errorFiled";
      this.isErrorFullName = 0;
    }
    this.isEnterAllValues();
  }
  checkMobile(event){
    this.errorMobile = "succsessFiled";
    this.isErrorMobile = 1;
    this.mobile = event;
    if(this.mobile == "" || this.mobile == undefined){
      this.errorMobile = "errorFiled";
      this.isErrorMobile = 0;
    }
    this.isEnterAllValues();
  }
  checkEmail(event){
    this.errorEmail = "succsessFiled";
    this.isErrorEmail = 1;
    this.emailUser = event;
    if(this.emailUser == "" || this.emailUser == undefined){
      this.errorEmail = "errorFiled";
      this.isErrorEmail = 0;
    }else{
      let checkVal = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!checkVal.test(this.emailUser)){
        this.errorEmail = "errorFiled";
        this.isErrorEmail = 0;
      }
    }
    this.isEnterAllValues();
  }
  isEnterAllValues(){
    if(this.fullName != undefined && this.fullName != "" && this.mobile != undefined && this.mobile != "" && this.emailUser != undefined && this.emailUser != ""){
      this.isdisabled = true;
    }
  }
  functionInformation(userId){
    this.usersService.employeeInfo(userId).then(async data=>{
      this.returnEmployeeData = data;
      this.operationResult = this.returnEmployeeData.Error.ErrorCode;
      if(this.operationResult==1){
        await this.storage.set('userId',this.returnEmployeeData.Data.id);
        await this.storage.set('departmentId',this.returnEmployeeData.Data.departmentId);
        await this.storage.set('departmentNameAr',this.returnEmployeeData.Data.departmentNameAr);
        await this.storage.set('departmentNameEn',this.returnEmployeeData.Data.departmentNameEn);
        await this.storage.set('fullName',this.returnEmployeeData.Data.fullName);
        await this.storage.set('mobile',this.returnEmployeeData.Data.mobile);
        await this.storage.set('jobTitle',this.returnEmployeeData.Data.jobTitle);
        await this.storage.set('email',this.returnEmployeeData.Data.email);
        await this.storage.set('photo',this.returnEmployeeData.Data.photo);
        await this.storage.set('type',this.returnEmployeeData.Data.type);
        await this.storage.set('viceManager',this.returnEmployeeData.Data.viceManager);
        this.departmentId = this.returnEmployeeData.Data.departmentId;
        this.type = await this.returnEmployeeData.Data.type;
        if(this.departmentId!=1 && this.type=='suber')
          this.imageInformation = 2;
        this.email = this.returnEmployeeData.Data.email;
        this.emailUser = this.returnEmployeeData.Data.email;
        this.mobile = this.returnEmployeeData.Data.mobile;
        this.fullName = this.returnEmployeeData.Data.fullName;
        this.photo = this.returnEmployeeData.Data.photo;
        if(this.photo =="" || this.photo==undefined || this.photo==0 || this.photo==null)
          this.photo = "../../assets/imgs/person-icon-1687.png";
      }
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.checkInternetData();
    this.userId = await this.storage.get('userId');
    this.departmentId = await this.storage.get('departmentId');
    this.type = await this.storage.get('type');
    this.email = await this.storage.get('email');
    this.emailUser = await this.storage.get('email');
    this.mobile = await this.storage.get('mobile');
    this.fullName = await this.storage.get('fullName');
    if(this.departmentId!=1 && this.type=='suber')
      this.imageInformation = 2;
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
    this.photo = await this.storage.get('photo');
    if(this.photo =="" || this.photo==undefined || this.photo==0 || this.photo==null)
      this.photo = "../../assets/imgs/person-icon-1687.png";
    await this.functionInformation(this.userId);
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
  removeFile(){
    this.accountImageArray = "";
    this.accountImage = "";
    this.uplodeAccountImage = 0;
  }
  uploadeAccountImage(){
    this.chooser.getFile()
      .then((file) =>{
        this.accountImageArray = file;
        this.accountImage = file.name;
        this.uplodeAccountImage = 1;
      }) .catch((error: any) => {
      this.accountImageArray = "";
      this.accountImage = "";
      this.uplodeAccountImage = 0;
    });
  }
  async updateAccount(){
    this.checkInternetData();
    if((this.fullName == undefined || this.fullName == "") && (this.mobile == undefined || this.mobile == "") && (this.emailUser == undefined || this.emailUser == "")){
      this.errorFullName = "errorFiled";
      this.isErrorFullName = 0;
      this.errorMobile = "errorFiled";
      this.isErrorMobile = 0;
      this.errorEmail = "errorFiled";
      this.isErrorEmail = 0;
      return false;
    }
    if(this.fullName == undefined || this.fullName == ""){
      this.errorFullName = "errorFiled";
      this.isErrorFullName = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.mobile == undefined || this.mobile == ""){
      this.errorMobile = "errorFiled";
      this.isErrorMobile = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.emailUser == undefined || this.emailUser == ""){
      this.errorEmail = "errorFiled";
      this.isErrorEmail = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.fullName != undefined && this.mobile != undefined && this.emailUser != undefined){
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 2000,
      });
      await loading.present();
      this.usersService.updateAccount(this.userId,this.fullName,this.mobile,this.emailUser).then(async data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        if(this.operationResult==1){
          const fileTransfer: FileTransferObject = this.transfer.create();
          this.storage.set('fullName',this.fullName);
          this.storage.set('mobile',this.mobile);
          this.storage.set('email',this.emailUser);
          if(this.accountImageArray!=undefined && this.accountImageArray!=null && this.accountImageArray!=""){
            let options: FileUploadOptions = {
              fileKey: 'file',
              fileName:this.accountImageArray.name,
              mimeType:this.accountImageArray.mediaType,
              chunkedMode:false,
              headers: {}
            }
            fileTransfer.upload(this.accountImageArray.uri, 'https://pw-prog.com/maintenance/api/editUserImage/'+this.userId, options)
              .then((dataNew) => {
                this.photo = this.returnData.Data.photo;
                this.storage.set('photo',this.photo);
              }, (err) => {
              })
          }
          await this.functionInformation(this.userId);
          this.accountImageArray = "";
          this.accountImage = "";
          this.uplodeAccountImage = 0;
          this.message = this.accountMessageSuccess;
          this.displayResult(this.message);
        }else if(this.operationResult==2){
          this.message = this.accountMessageFailedOne;
          this.displayResult(this.message);
        }else if(this.operationResult==3){
          this.message = this.accountMessageFailedTow;
          this.displayResult(this.message);
        }
      }).catch(e=>{
        this.message = this.accountMessageFailedTow;
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
