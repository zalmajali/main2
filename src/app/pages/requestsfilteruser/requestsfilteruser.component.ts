import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import {ModalController, Platform} from '@ionic/angular';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Router,ActivatedRoute } from '@angular/router';
import {UsersService} from "../../services/users.service";
@Component({
  selector: 'app-requestsfilteruser',
  templateUrl: './requestsfilteruser.component.html',
  styleUrls: ['./requestsfilteruser.component.scss'],
})
export class RequestsfilteruserComponent implements OnInit {
  public departmentSearchId:any;
  public suberViserSearchName:any;
  public machineSearchNumber:any;
  public statusSearch:any=0;
  public urgencySearch:any=0;
  public machineSearchDescription:any;
  public faultSearchDescription:any;
  public float: any;
  public dir: any;
  public dirTow: any;
  public machineNumber:any;
  public machineDescription:any;
  public machineStatus:any;
  public working:any;
  public notWorking:any;
  public faultDescription:any;
  public urgency:any;
  public arrowBack:any;
  public low:any;
  public medium:any;
  public hight:any;
  public search:any;
  public userId:any;
  public departmentId:any;
  public type:any;
  public email:any;
  public checkLanguage: any=0;
  public language: string;
  public getDataByUser:any;
  public departmentName:any;
  public settingsYas:any;
  public settingsNo:any;
  public issuerName:any;
  public returnEmployeesData:any;
  public returnArrayEmployeesFromServer:any;
  public returnEmployeesArray:any = [];
  public employees:any;
  public operationResult:any;
  public all:any;
  public returnDepartmentsData:any;
  public returnArrayDepartmentsFromServer:any;
  public returnDepartmentsArray:any = [];
  public departments:any;
  public requestNumber:any;
  public orderId:any;
  public attachments:any;
  public withAttachments:any;
  public withoutAttachments:any;
  public files:any;
  public fromDate:any;
  public toDate:any;
  public fromSelectDate:any;
  public toSelectDate:any;
  public supervisor:any;
  public manager:any;
  public filterOrders:any;
  public cancel:any;
  constructor(private usersService:UsersService,private activaterouter : ActivatedRoute,private router : Router,private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private storage: Storage,private platform: Platform) {
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
    this.translate.get('machine_number').subscribe((res: string) => {
      this.machineNumber = res;
    });
    this.translate.get('machine_description').subscribe((res: string) => {
      this.machineDescription = res;
    });
    this.translate.get('machine_status').subscribe((res: string) => {
      this.machineStatus = res;
    });
    this.translate.get('working').subscribe((res: string) => {
      this.working = res;
    });
    this.translate.get('not_working').subscribe((res: string) => {
      this.notWorking = res;
    });
    this.translate.get('fault_description').subscribe((res: string) => {
      this.faultDescription = res;
    });
    this.translate.get('urgency').subscribe((res: string) => {
      this.urgency = res;
    });
    this.translate.get('arrow_back').subscribe((res: string) => {
      this.arrowBack = res;
    });
    this.translate.get('low').subscribe((res: string) => {
      this.low = res;
    });
    this.translate.get('medium').subscribe((res: string) => {
      this.medium = res;
    });
    this.translate.get('hight').subscribe((res: string) => {
      this.hight = res;
    });
    this.translate.get('search').subscribe((res: string) => {
      this.search = res;
    })
    this.translate.get('department_name').subscribe((res: string) => {
      this.departmentName = res;
    });
    this.translate.get('issuer_name').subscribe((res: string) => {
      this.issuerName = res;
    });
    this.translate.get('settings_yas').subscribe((res: string) => {
      this.settingsYas = res;
    });
    this.translate.get('settings_No').subscribe((res: string) => {
      this.settingsNo = res;
    });
    this.translate.get('all').subscribe((res: string) => {
      this.all = res;
    });
    this.translate.get('request_number').subscribe((res: string) => {
      this.requestNumber = res;
    });
    this.translate.get('with_attachments').subscribe((res: string) => {
      this.withAttachments = res;
    });
    this.translate.get('without_attachments').subscribe((res: string) => {
      this.withoutAttachments = res;
    });
    this.translate.get('files').subscribe((res: string) => {
      this.files = res;
    });
    this.translate.get('from_date').subscribe((res: string) => {
      this.fromDate = res;
    });
    this.translate.get('to_date').subscribe((res: string) => {
      this.toDate = res;
    });
    this.translate.get('supervisor').subscribe((res: string) => {
      this.supervisor = res;
    });
    this.translate.get('manager').subscribe((res: string) => {
      this.manager = res;
    });
    this.translate.get('filter_orders').subscribe((res: string) => {
      this.filterOrders = res;
    });
    this.translate.get('cancel').subscribe((res: string) => {
      this.cancel = res;
    });
  }
  async changeStatus(event){
    this.statusSearch = event;
  }
  async changeFrom(event){
    this.fromSelectDate = event;
  }
  async changeTo(event){
    this.toSelectDate = event;
  }
  async changeAttachments(event){
    this.attachments= event;
  }
  async changeUrgency(event){
    this.urgencySearch = event;
  }
  closeModel(){
    this.storage.remove('orderId');
    this.storage.remove('machineSearchNumber');
    this.storage.remove('urgencySearch');
    this.storage.remove('machineSearchDescription');
    this.storage.remove('statusSearch');
    this.storage.remove('faultSearchDescription');
    this.storage.remove('attachments');
    this.storage.remove('fromSelectDate');
    this.storage.remove('toSelectDate');
    this.modalController.dismiss({
      "orderId":0,
      "machineSearchNumber":0,
      "urgencySearch":0,
      "machineSearchDescription":0,
      "statusSearch":0,
      "faultSearchDescription":0,
      "attachments":0,
      "fromSelectDate":0,
      "toSelectDate":0,
    });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.orderId = await this.storage.get('orderId');
    this.machineSearchNumber = await this.storage.get('machineSearchNumber');
    this.urgencySearch = await this.storage.get('urgencySearch');
    this.machineSearchDescription = await this.storage.get('machineSearchDescription');
    this.statusSearch = await this.storage.get('statusSearch');
    this.faultSearchDescription = await this.storage.get('faultSearchDescription');
    this.attachments = await this.storage.get('attachments');
    this.fromSelectDate = await this.storage.get('fromSelectDate');
    this.toSelectDate = await this.storage.get('toSelectDate');
    this.userId = await this.storage.get('userId');
    this.departmentId = await this.storage.get('departmentId');
    this.type = await this.storage.get('type');
    this.email = await this.storage.get('email');
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
    }
    if(this.departmentId!=1 && this.type=='man')
      this.getDataByUser = 1;
    else if(this.departmentId==1 && this.type=='man')
      this.getDataByUser = 2;
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
  async functionSearch(){
    await this.storage.set('orderId',this.orderId);
    await this.storage.set('machineSearchNumber',this.machineSearchNumber);
    await this.storage.set('urgencySearch',this.urgencySearch);
    await this.storage.set('machineSearchDescription',this.machineSearchDescription);
    await this.storage.set('statusSearch',this.statusSearch);
    await this.storage.set('faultSearchDescription',this.faultSearchDescription);
    await this.storage.set('attachments',this.attachments);
    await this.storage.set('fromSelectDate',this.fromSelectDate);
    await this.storage.set('toSelectDate',this.toSelectDate);
    this.modalController.dismiss({
      "orderId":this.orderId,
      "machineSearchNumber":this.machineSearchNumber,
      "urgencySearch":this.urgencySearch,
      "machineSearchDescription":this.machineSearchDescription,
      "statusSearch":this.statusSearch,
      "faultSearchDescription":this.faultSearchDescription,
      "attachments":this.attachments,
      "fromSelectDate":this.fromSelectDate,
      "toSelectDate":this.toSelectDate,
    })
  }

}
