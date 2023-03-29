import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@ionic-native/network/ngx';
@Component({
  selector: 'app-activation',
  templateUrl: './activation.page.html',
  styleUrls: ['./activation.page.scss'],
})
export class ActivationPage implements OnInit {
  public number:any;
  public errorNumber:any="";
  public isErrorNumber:any = 1;

  public activeCode:any;
  public  errorActiveNumber:any="";
  public isErrorActiveNumber:any = 1;

  public isdisabled:boolean=true;
  public backToPage:any;
  public returnData:any;
  public returnDataUser:any;
  public operationResult:any;
  public message:any;
  public loadingShow:any = 0;
  public returnFullName:any;
  public returnNumber:any;

  public fullNameLoginRe:any;
  public numberLoginRe:any;
  public passwordLoginRe:any;
  public userIdRe:any;
  public fullNameLogin:any;
  public emailLogin:any;
  public productInShopingCart:any;
  public userId:any;
  public startTime = 1;
  public counter = 60;
  public showButton = 0;
  public returnDataCodeUser:any;
  constructor(private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private usersService:UsersService,private toastCtrl: ToastController,private loading: LoadingController) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','activation');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/registration");
    });
  }
  async reSendActiveCode() {
    this.counter--;
    if (this.counter != 0) {
      setTimeout(() => {
        this.reSendActiveCode();
      }, 1000)
    }else{
      this.showButton = 1
      this.startTime = 0
    }
  }
  async ngOnInit() {
    this.reSendActiveCode();
    this.userId = await this.storage.get('userId');
    this.backToPage = await this.storage.get('internetBack');
    if(this.backToPage !='1'){
      this.navCtrl.navigateRoot("/errors");
    }
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','activation');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
  }
  reSend(){
    this.usersService.resenData(this.userId).then(async data=>{
      this.returnDataCodeUser = data;
      this.operationResult = this.returnDataCodeUser.Error.ErrorCode;
      if(this.operationResult == 1){
        this.message = "تم إرسال كود التفعيل الجديد على رقم جوالك";
        this.displayResult(this.message);
        this.counter = 60;
        this.showButton = 0
        this.startTime = 1
        this.reSendActiveCode();
      }else{
        this.message = "لم تتم عملية إرسال الكود...حاول مرة اخرى";
        this.displayResult(this.message);
      }
    }).catch(e=>{
      this.message = "لم تتم عملية إرسال الكود...حاول مرة اخرى";
      this.displayResult(this.message);
    })
  }
  checkActiveNumber(event){
    this.errorActiveNumber = "succsessFiled";
    this.isErrorActiveNumber = 1;
    this.activeCode = event;
    if(this.activeCode == "" || this.activeCode == undefined){
      this.errorActiveNumber = "errorFiled";
      this.isErrorActiveNumber = 0;
    }
    this.isEnterAllValues();
  }
  isEnterAllValues(){
    if(this.activeCode != undefined && this.activeCode != "" ){
      this.isdisabled = true;
    }
  }
  async activation(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','activation');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    if((this.activeCode == undefined || this.activeCode == "")){
      this.errorNumber = "errorFiled";
      this.errorActiveNumber = "errorFiled";
      this.isErrorNumber = 0;
      this.isErrorActiveNumber = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.activeCode == undefined || this.activeCode == ""){
      this.errorActiveNumber = "errorFiled";
      this.isErrorActiveNumber = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.activeCode != undefined){
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 1000,
      });
      await loading.present();
      this.usersService.activationUser(this.userId,this.activeCode).then(async data=>{
        this.returnDataUser = data;
        this.operationResult = this.returnDataUser.Error.ErrorCode;
        if(this.operationResult==1){
          await this.storage.set('fullNameLogin',this.returnDataUser.Data.name);
          await this.storage.set('numberLogin',this.returnDataUser.Data.mobile);
          await this.storage.set('passwordLogin',this.returnDataUser.Data.password);
          await this.storage.set('type',this.returnDataUser.Data.type);
          await this.storage.set('userId',this.returnDataUser.Data.id);
          await this.storage.set('catId',this.returnDataUser.Data.catId);
          await this.storage.set('subCatId',this.returnDataUser.Data.subCatId);
          await this.storage.set('points',this.returnDataUser.Data.points);
          await this.storage.set('isActive',this.returnDataUser.Data.is_active);
          await this.storage.set('active',this.returnDataUser.Data.active);
          await this.storage.set('image',this.returnDataUser.Data.image);
          this.message = "تمت عملية التفعيل بنجاح يرجى إكمال إدخال بياناتك الشخصية";
          this.displayResult(this.message);
          this.navCtrl.navigateRoot("/information");
        }else if(this.operationResult==2){
          this.message = "لم تتم عملية التفعيل بنجاح...البيانات فارغة";
          this.displayResult(this.message);
        }else if(this.operationResult==3){
          this.message = "لم تتم عملية التفعيل بنجاح...حاول مرة اخرى";
          this.displayResult(this.message);
        }else if(this.operationResult==4){
          this.message = "لم تتم عملية التفعيل بنجاح...حاول مرة اخرى";
          this.displayResult(this.message);
        }else{
          this.message = "لم تتم عملية التفعيل بنجاح...كود التفعيل غير صحيح";
          this.displayResult(this.message);
        }
      }).catch(e=>{
        this.message = "لم تتم عملية التفعيل بنجاح...حاول مرة اخرى";
        this.displayResult(this.message);
      })
      this.isdisabled = true;
    }
    await this.checkRegistration();
    await this.checkIfSiteWork();
  }
  async checkIfSiteWork(){
    this.usersService.checkIfSiteWorkApi().then(async data=>{
      this.returnData = data;
      this.operationResult = this.returnData.Error.ErrorCode;
      if(this.operationResult!=1){
        this.navCtrl.navigateRoot("/sitework");
      }
    }).catch(e=>{
      this.navCtrl.navigateRoot("/sitework");
    })
  }
  async checkRegistration(){
    this.usersService.checkRegistrationApi().then(async data=>{
      this.returnData = data;
      this.operationResult = this.returnData.Error.ErrorCode;
      if(this.operationResult!=1){
        this.navCtrl.navigateRoot("/sitework");
      }
    }).catch(e=>{
      this.navCtrl.navigateRoot("/sitework");
    })
  }
  async displayResult(message){
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'bottom',
      cssClass:"toastStyle",
      color:""
    });
    await toast.present();
  }
  async functionOpenMenue(){
    this.menu.enable(true,"first");
    this.menu.open("first");
  }
}
