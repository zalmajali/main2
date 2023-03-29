import { Component, OnInit,Input } from '@angular/core';
import {Storage} from '@ionic/storage';
import {ModalController, Platform,LoadingController} from '@ionic/angular';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Router,ActivatedRoute } from '@angular/router';
import {RequestsService} from "../../services/requests.service";
@Component({
  selector: 'app-tasksoperations',
  templateUrl: './tasksoperations.component.html',
  styleUrls: ['./tasksoperations.component.scss'],
})
export class TasksoperationsComponent implements OnInit {
  @Input() taskId: string;
  @Input() orderId: string;
  public float: any;
  public dir: any;
  public dirTow: any;
  public checkLanguage: any=0;
  public language: string;


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
  public onHold: any;
  public userId:any;
  public insertTime:any;
  public close:any;
  constructor(private requestsService:RequestsService,private loading: LoadingController,private activaterouter : ActivatedRoute,private router : Router,private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private storage: Storage,private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
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
    this.translate.get('status').subscribe((res: string) => {
      this.status = res;
    });
    this.translate.get('former_employee').subscribe((res: string) => {
      this.formerEmployee = res;
    });
    this.translate.get('by').subscribe((res: string) => {
      this.by = res;
    });
    this.translate.get('manager').subscribe((res: string) => {
      this.manager = res;
    });
    this.translate.get('sorry').subscribe((res: string) => {
      this.sorry = res;
    });
    this.translate.get('sorry_reson').subscribe((res: string) => {
      this.sorryReson = res;
    });
    this.translate.get('task_log').subscribe((res: string) => {
      this.mainLog = res;
    });
    this.translate.get('supervisor').subscribe((res: string) => {
      this.supervisor = res;
    });
    this.translate.get('new').subscribe((res: string) => {
      this.new = res;
    });
    this.translate.get('approved').subscribe((res: string) => {
      this.approved = res;
    });
    this.translate.get('in_progress').subscribe((res: string) => {
      this.inProgress = res;
    });
    this.translate.get('resolved').subscribe((res: string) => {
      this.resolved = res;
    });
    this.translate.get('on_hold').subscribe((res: string) => {
      this.onHold = res;
    });
    this.translate.get('insert_time').subscribe((res: string) => {
      this.insertTime = res;
    });
    this.translate.get('close').subscribe((res: string) => {
      this.close = res;
    });
  }
  async ngOnInit() {
    this.userId = await this.storage.get('userId');
    await this.getDeviceLanguage();
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 2500,
    });
    await loading.present();
    this.requestsService.taskOperations(this.taskId,this.userId).then(async data=>{
      this.returnData = data;
      this.operationResult = this.returnData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayinfoFromServer = this.returnData.Data.status;
        for(let i = 0; i < this.returnArrayinfoFromServer.length;i++) {
          this.returninfoArray[i]=[];
          if(this.returnArrayinfoFromServer[i].status == 0)
            this.returninfoArray[i]['status'] =this.new;
          if(this.returnArrayinfoFromServer[i].status == 1)
            this.returninfoArray[i]['status'] =this.inProgress;
          if(this.returnArrayinfoFromServer[i].status == 2)
            this.returninfoArray[i]['status'] =this.resolved;
          if(this.returnArrayinfoFromServer[i].status == 3)
            this.returninfoArray[i]['status'] =this.onHold;
          this.returninfoArray[i]['statusTime'] = this.returnArrayinfoFromServer[i].statusTime;
          this.returninfoArray[i]['fullName'] = this.returnArrayinfoFromServer[i].fullName;
          this.returninfoArray[i]['existing'] = this.returnArrayinfoFromServer[i].existing;
          this.returninfoArray[i]['type'] = this.returnArrayinfoFromServer[i].type;
        }
        let countOfData = this.returninfoArray.length;
        if(countOfData == 0)
          this.ShowVal = 0;
        else
          this.ShowVal = 1;
      }else
        this.ShowVal = 0;
    }).catch(e=>{
      this.ngOnInit();
    });
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
}
