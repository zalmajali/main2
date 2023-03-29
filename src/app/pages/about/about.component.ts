import { Component, OnInit,ViewChild } from '@angular/core';
import {Storage} from '@ionic/storage';
import {LoadingController,ModalController, Platform,ToastController,IonSlides} from '@ionic/angular';
import {OperationsService} from "../../services/operations.service";
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network/ngx';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  @ViewChild('slidesBanners',{static:false}) slidesBanners:IonSlides;
  public checkLanguage: any=0;
  public language: string;
  public aboutTitle: string;
  public message:any;
  public operationResult:any;
  public description:any;
  public descriptionFromServer:any;
  public returnData:any;
  public returninfoArray:any = [];
  public returnArrayinfoFromServer:any;
  public showVal:any;
  public internetMessage: any;
  public ShowVal: any;
  slideOpts = {
    initialSlide: 1,
    speed: 1300,
  };
  public toastStyle:any;
  constructor(private network:Network,private toastCtrl: ToastController,private globalization: Globalization, private translate: TranslateService,private operationsService:OperationsService,private storage: Storage,private platform: Platform,private modalController:ModalController,private loading: LoadingController) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
    this.checkInternetData();}
  closeModel(){
    this.modalController.dismiss({});
  }
  slidesBannersLoad(){
    this.slidesBanners.startAutoplay();
  }
  functionGetData(){
    this.operationsService.aboutApp(this.language).then(async data=>{
      this.returnData = data;
      this.operationResult = this.returnData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayinfoFromServer = this.returnData.Data.aboutApp;
        for(let i = 0; i < this.returnArrayinfoFromServer.length;i++) {
          this.returninfoArray[i]=[];
          this.returninfoArray[i]['id'] = this.returnArrayinfoFromServer[i].id;
          this.returninfoArray[i]['title'] = this.returnArrayinfoFromServer[i].title;
          this.returninfoArray[i]['content'] = this.returnArrayinfoFromServer[i].content;
          this.returninfoArray[i]['image'] = this.returnArrayinfoFromServer[i].image;
          if(this.returninfoArray[i]['image'] == null || this.returninfoArray[i]['image'] == undefined || this.returninfoArray[i]['image']=="" || this.returninfoArray[i]['image']==0)
            this.returninfoArray[i]['image'] = "../../assets/imgs/aboutDef.png";
        }
        console.log(this.returninfoArray);
        let countOfData = this.returninfoArray.length;
        if(countOfData == 0)
          this.ShowVal = 0;
        else
          this.ShowVal = 1;
      }else
        this.ShowVal = 0;
    }).catch(error=>{
      this.functionGetData();
    });
  }
  async ngOnInit() {
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 2000,
    });
    await loading.present();
    await this.storage.get('aboutPageVal').then(async aboutPageVal=>{
      this.descriptionFromServer = aboutPageVal;
      this.showVal = 0;
      if(this.descriptionFromServer!=0 && this.descriptionFromServer!="" && this.descriptionFromServer!=undefined && this.descriptionFromServer!=null && this.descriptionFromServer!="null")
        this.showVal = 1;
    });
    await this.getDeviceLanguage();
    this.checkInternetData();
    this.functionGetData()
  }
  //
  checkInternetData(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.message = this.internetMessage;
      this.displayResult(this.message);
    })
  }
  initialiseTranslation(){
    this.translate.get('internet_message').subscribe((res: string) => {
      this.internetMessage = res;
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
