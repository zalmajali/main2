import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, NavController,ModalController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@ionic-native/network/ngx';
import {HttpClient} from "@angular/common/http";
import {PolicycompComponent} from "../policycomp/policycomp.component";
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  number:any;
  errorNumber:any="";
  isErrorNumber:any = 1;

  invitation:any;
  errorInvitation:any="";
  isErrorInvitation:any = 1;

  password:any;
  errorPassword:any="";
  isErrorPassword:any = 1;

  rePassword:any;
  errorRePassword:any="";
  errorRePasswordMsg:any="";
  isErrorRePassword:any = 1;

  isdisabled:boolean=true;
  backToPage:any;
  returnData:any;
  operationResult:any;
  message:any;
  returnFullName:any;
  returnNumber:any;
  showPassword: boolean = false;
  showPasswordRe: boolean = false;
  showLoginWithApple:any = 0;
  facebookToken:any;
  facebookUserId:any;
  result:any;
  fullNameLogin:any;
  emailLogin:any;
  productInShopingCart:any;
  checkPlicy:any=0;
  constructor(private http:HttpClient,private network:Network,private modalController: ModalController,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private usersService:UsersService,private toastCtrl: ToastController,private loading: LoadingController) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','registration');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    })
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/login");
    });
  }
  async checkpolidy(type:any){
    let model = await this.modalController.create({
      component:PolicycompComponent,
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then(data=>{
    });
    await model.present();
  }
  async ngOnInit() {
    this.storage.remove('fullNameLogin');
    this.storage.remove('numberLogin');
    this.storage.remove('passwordLogin');
    this.storage.remove('type');
    this.storage.remove('userId');
    this.storage.remove('catId');
    this.storage.remove('subCatId');
    this.storage.remove('points');
    this.storage.remove('isActive');
    this.storage.remove('active');
    this.storage.remove('image');
    this.storage.remove('invitationCode');
    this.storage.get('productInShopingCart').then(productInShopingCart=>{
      this.productInShopingCart = productInShopingCart;
      if(productInShopingCart==null || productInShopingCart=="" ||  productInShopingCart==0 )
        this.productInShopingCart = 0;
    });
    if(this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'))
      this.showLoginWithApple = 1;
    this.backToPage = await this.storage.get('internetBack');
    if(this.backToPage !='1'){
      this.navCtrl.navigateRoot("/errors");
    }
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','registration');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.checkRegistration();
    this.checkIfSiteWork();
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
  checkNumber(event){
    this.errorNumber = "succsessFiled";
    this.isErrorNumber = 1;
    this.number = event;
    if(this.number == "" || this.number == undefined){
      this.errorNumber = "errorFiled";
      this.isErrorNumber = 0;
    }
    this.isEnterAllValues();
  }
  checkInvitation(event){
    this.invitation = event;
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
  checkRePassword(event){
    this.errorRePassword = "succsessFiled";
    this.isErrorRePassword = 1;
    this.rePassword = event;
    if(this.rePassword == "" || this.rePassword == undefined){
      this.errorRePassword = "errorFiled";
      this.isErrorRePassword = 0;
    }
    this.isEnterAllValues();
  }
  isEnterAllValues(){
    if(this.number != undefined && this.number != "" && this.password != undefined && this.password != "" && this.rePassword != undefined && this.rePassword != "" && this.password == this.rePassword){
      this.isdisabled = true;
    }
  }
  getTheIngredients(event:any){
    if(event.detail.checked == true){
      this.checkPlicy = 1;
    }else{
      this.checkPlicy = 0;
    }
  }
  async registration(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','registration');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    if((this.number == undefined || this.number == "") && (this.password == undefined || this.password == "") && (this.rePassword == undefined || this.rePassword == "")){
      this.errorNumber = "errorFiled";
      this.errorPassword = "errorFiled";
      this.errorRePassword = "errorFiled";
      this.isErrorNumber = 0;
      this.isErrorPassword = 0;
      this.isErrorRePassword = 0;
      this.errorRePasswordMsg = "الرجاء إدخال تأكيد كلمة المرور";
      this.isdisabled = false;
      return false;
    }
    if(this.number == undefined || this.number == ""){
      this.errorNumber = "errorFiled";
      this.isErrorNumber = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.password == undefined || this.password == ""){
      this.errorPassword = "errorFiled";
      this.isErrorPassword = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.rePassword == undefined || this.rePassword == ""){
      this.errorRePassword = "errorFiled";
      this.isErrorRePassword = 0;
      this.errorRePasswordMsg = "الرجاء إدخال تأكيد كلمة المرور";
      this.isdisabled = false;
      return false;
    }
    if(this.password != this.rePassword){
      this.errorRePassword = "errorFiled";
      this.isErrorRePassword = 0;
      this.errorRePasswordMsg = "كلمة المرور و تأكيد كلمة المرور غير متطابقتان";
      this.isdisabled = false;
      return false;
    }
    if(this.checkPlicy == 0){
      this.message = "يرجى الموافقة على إتفاقية إستخدام تطبيق سواب";
      this.displayResult(this.message);
      return false;
    }
    if(this.number != undefined && this.password != undefined && this.rePassword != undefined){
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 2500,
      });
      await loading.present();
      this.usersService.registration(this.number,this.invitation,this.password,'962').then(async data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        if(this.operationResult==1){
          this.message = "تم إنشاء حسابك بنجاح وستصلك رسالة بكود التفعيل";
          this.displayResult(this.message);
          await this.storage.set('userId',this.returnData.Error.userId);
          this.navCtrl.navigateRoot("/activation");
        }else if(this.operationResult==2){
          this.message = "لم تتم عملية إنشاء الحساب بنجاح...البيانات فارغة";
          this.displayResult(this.message);
        }else if(this.operationResult==3){
          this.message = "لم تتم عملية إنشاء الحساب بنجاح...رقم الجوال مكرر";
          this.displayResult(this.message);
        }else if(this.operationResult==4){
          this.message = "لم تتم عملية إنشاء الحساب بنجاح...حاول مرة اخرى";
          this.displayResult(this.message);
        }else{
          this.message = "لم تتم عملية إنشاء الحساب بنجاح...كود الدعوة غير صحيح";
          this.displayResult(this.message);
        }
      }).catch(e=>{
        this.message = "لم تتم عملية إنشاء الحساب بنجاح...حاول مرة اخرى";
        this.displayResult(this.message);
      })
      this.isdisabled = true;
    }
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
  changeInputType(){
    this.showPassword = !this.showPassword;
  }
  changeReInputType(){
    this.showPasswordRe = !this.showPasswordRe;
  }
  async functionOpenMenue(){
    this.menu.enable(true,"first");
    this.menu.open("first");
  }
}
