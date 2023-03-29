import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import {ModalController, Platform} from '@ionic/angular';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cancelledreason',
  templateUrl: './cancelledreason.component.html',
  styleUrls: ['./cancelledreason.component.scss'],
})
export class CancelledreasonComponent implements OnInit {
  public reason:any;
  public errorReason:any="";
  public isErrorReason:any = 1;
  public isErrorReasonMsg:any;

  public float: any;
  public dir: any;
  public dirTow: any;
  public checkLanguage: any=0;
  public language: string;
  public cancelledReason:any;
  public cancel:any;
  public add:any;
  public addReson:any;
  constructor(private activaterouter : ActivatedRoute,private router : Router,private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private storage: Storage,private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
  }
  checkReason(event){
    this.errorReason = "succsessFiled";
    this.isErrorReason = 1;
    this.reason = event;
    if(this.reason == "" || this.reason == undefined){
      this.isErrorReason = "errorFiled";
      this.isErrorReason = 0;
    }
  }
  initialiseTranslation(){
    this.translate.get('floatD').subscribe((res: string) => {
      this.float = res;
    });
    this.translate.get('dir').subscribe((res: string) => {
      this.dir = res;
    });
    this.translate.get('dirTow').subscribe((res: string) => {
      this.dirTow = res;
    });
    this.translate.get('cancelled_reason').subscribe((res: string) => {
      this.cancelledReason = res;
    });
    this.translate.get('cancel').subscribe((res: string) => {
      this.cancel = res;
    });
    this.translate.get('is_error_reason_msg').subscribe((res: string) => {
      this.isErrorReasonMsg = res;
    });
    this.translate.get('add').subscribe((res: string) => {
      this.add = res;
    });
    this.translate.get('add_reson').subscribe((res: string) => {
      this.addReson = res;
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
  }
  closeModel(){
    this.modalController.dismiss({
      "reason":"",
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
  async functionAdd(){
    if(this.reason == undefined || this.reason == ""){
      this.errorReason = "errorFiled";
      this.isErrorReason = 0;
      return false;
    }
    this.modalController.dismiss({
      "reason":this.reason,
    })
  }
}
