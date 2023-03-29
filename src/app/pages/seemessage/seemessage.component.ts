import { Component, OnInit,Input } from '@angular/core';
import {Storage} from '@ionic/storage';
import {LoadingController, MenuController, NavController, Platform,ModalController, ToastController,AlertController} from "@ionic/angular";
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Router,ActivatedRoute } from '@angular/router';
import {RequestsService} from "../../services/requests.service";
import { Network } from '@ionic-native/network/ngx';
@Component({
  selector: 'app-seemessage',
  templateUrl: './seemessage.component.html',
  styleUrls: ['./seemessage.component.scss'],
})
export class SeemessageComponent implements OnInit {
  @Input() content: string;
  @Input() id: string;
  public float: any;
  public dir: any;
  public dirTow: any;
  public checkLanguage: any=0;
  public language: string;
  public cancelledReason:any;
  public cancel:any;

  public insertTime:any;
  public department:any;
  public status:any;
  public formerEmployee:any;
  public by:any;
  public manager:any;
  public sorry:any;
  public sorryReson:any;
  public mainLog:any;
  public operationResult:any;
  public returnData:any;
  public returninfoArray:any = [];
  public returnArrayinfoFromServer:any;
  public ShowVal: any = 1;
  public supervisor: any;
  public new: any;
  public approved: any;
  public inProgress: any;
  public resolved: any;
  public canceled: any;
  public reopened: any;
  public userId:any;
  public returnRequestData:any;
  public returnArrayRequestFromServer:any;
  public returnRequestArray:any = [];
  public lastStatusVal:any;
  public departmentRequestId:any;
  public departmentId:any;
  public message:any;
  public type:any;
  public email:any;
  public getDataByUser:any = 0;
  public internetMessage: any;
  public toastStyle:any;
  public generalManager:any;
  public departmentManager:any;
  public maintenanceSupervisors:any;
  public maintenanceManager:any;
  public all:any;
  public settingsYas:any;
  public settingsNo:any;
  public add:any;
  public replyPlaceholder:any;
  public isErrorReplyMsg:any;
  public errorReply:any="";
  public isErrorReply:any = 1;
  public taskUsers:any;

  public returnAssignedData:any;
  public returnArrayAssignedFromServer:any;
  public returnAssignedArray:any = [];

  public close:any;

  public imageInformation:any;
  public sendMessage:any;
  public viewMessage:any;
  constructor(private requestsService:RequestsService,private loading: LoadingController,private toastCtrl: ToastController,private network:Network,private activaterouter : ActivatedRoute,private router : Router,private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private storage: Storage,private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
  }
  initialiseTranslation(){
    this.translate.get('floatD').subscribe((res: string) => {
      this.float = res;
    });
    this.translate.get('cancel').subscribe((res: string) => {
      this.cancel = res;
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
    this.translate.get('cancel').subscribe((res: string) => {
      this.cancel = res;
    });
    this.translate.get('view_message').subscribe((res: string) => {
      this.viewMessage = res;
    });
    this.translate.get('close').subscribe((res: string) => {
      this.close = res;
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
      this.router.navigateByUrl('login');
    }else{
      if(this.departmentId!=1 && this.type=='suber')
        this.getDataByUser = 1;
      else if(this.departmentId!=1 && this.type=='man')
        this.getDataByUser = 2;
      else if(this.departmentId==1 && this.type=='man')
        this.getDataByUser = 3;
      else if(this.departmentId==1 && this.type=='suber')
        this.getDataByUser = 4;
      else if(this.type=='itMan')
        this.getDataByUser = 5;
    }
    this.userId = await this.storage.get('userId');
    this.departmentId = await this.storage.get('departmentId');
    await this.getDeviceLanguage();
    await this.requestsService.replySeenByUser(this.id,this.userId).then(async data=>{
    }).catch(error=>{});
  }
  closeModel(){
    this.modalController.dismiss({
    });
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
}
