import { Component, OnInit,Input } from '@angular/core';
import {Storage} from '@ionic/storage';
import {ModalController, Platform} from '@ionic/angular';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Router,ActivatedRoute } from '@angular/router';
import {UsersService} from "../../services/users.service";
@Component({
  selector: 'app-tasksfilter',
  templateUrl: './tasksfilter.component.html',
  styleUrls: ['./tasksfilter.component.scss'],
})
export class TasksfilterComponent implements OnInit {
  @Input() page: any;
  @Input() selectedOrderId: any;
  @Input() assignedUserId: any;
  public float: any;
  public dir: any;
  public dirTow: any;
  public orderId:any;
  public requestNumber:any;
  public departmentName:any;
  public settingsYas:any;
  public settingsNo:any;
  public issuerName:any;
  public search:any;
  public departmentSearchId:any;
  public suberViserSearchName:any;
  public userId:any;
  public departmentId:any;
  public type:any;
  public email:any;
  public getDataByUser:any;
  public returnDepartmentsData:any;
  public returnArrayDepartmentsFromServer:any;
  public returnDepartmentsArray:any = [];
  public departments:any;
  public operationResult:any;
  public checkLanguage: any=0;
  public language: string;
  public supervisor:any;
  public manager:any;
  public returnEmployeesData:any;
  public returnArrayEmployeesFromServer:any;
  public returnEmployeesArray:any = [];
  public employees:any;
  public status:any;
  public statusVal:any=5;
  public new:any;
  public inProgress:any;
  public resolved:any;
  public onHold:any;
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
    this.translate.get('request_number').subscribe((res: string) => {
      this.requestNumber = res;
    });
    this.translate.get('supervisor').subscribe((res: string) => {
      this.supervisor = res;
    });
    this.translate.get('manager').subscribe((res: string) => {
      this.manager = res;
    });
    this.translate.get('on_hold').subscribe((res: string) => {
      this.onHold = res;
    });
    this.translate.get('new').subscribe((res: string) => {
      this.new = res;
    });
    this.translate.get('in_progress').subscribe((res: string) => {
      this.inProgress = res;
    });
    this.translate.get('resolved').subscribe((res: string) => {
      this.resolved = res;
    });
    this.translate.get('status').subscribe((res: string) => {
      this.status = res;
    });
    this.translate.get('filter_tasks').subscribe((res: string) => {
      this.filterOrders = res;
    });
    this.translate.get('cancel').subscribe((res: string) => {
      this.cancel = res;
    });
  }
  selectIssuerName(event){
    this.suberViserSearchName = event;
  }
  selectDepartmentName(event){
    this.departmentSearchId = event;
  }
  selectstatuse(event){
    this.statusVal = event;
  }
  closeModel(){
    this.storage.remove('orderIdTask');
    this.storage.remove('departmentSearchIdTask');
    this.storage.remove('suberViserSearchNameTask');
    this.storage.remove('statusValTask');
    this.modalController.dismiss({
      "orderId":0,
      "departmentSearchId":0,
      "suberViserSearchName":0,
      "statusVal":0,
    });
  }
  async ngOnInit() {
    this.orderId = await this.storage.get('orderIdTask');
    this.statusVal = await this.storage.get('statusValTask');
    await this.getDeviceLanguage();
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
    if(this.departmentId==1 && this.type=='suber')
      this.getDataByUser = 1;
    else if(this.departmentId==1 && this.type=='man')
      this.getDataByUser = 2;
    else if(this.type=='itMan')
      this.getDataByUser = 5;

    await this.usersService.employeesDepartMain(this.userId).then(data=>{
      this.returnEmployeesData = data;
      this.operationResult = this.returnEmployeesData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayEmployeesFromServer = this.returnEmployeesData.Data.employees;
        for(let i = 0; i < this.returnArrayEmployeesFromServer.length;i++) {
          this.returnEmployeesArray[i]=[];
          this.returnEmployeesArray[i]['id'] = this.returnArrayEmployeesFromServer[i].id;
          this.returnEmployeesArray[i]['fullName'] = this.returnArrayEmployeesFromServer[i].fullName;
        }
        let countOfData = this.returnEmployeesArray.length;
        if(countOfData == 0)
          this.employees = 0;
        else{
          this.employees = 1;
        }
      }else
        this.employees = 0;
    });
    await this.usersService.departments(this.userId).then(async data=>{
      this.returnDepartmentsData = data;
      this.operationResult = this.returnDepartmentsData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayDepartmentsFromServer = this.returnDepartmentsData.Data.departments;
        for(let i = 0; i < this.returnArrayDepartmentsFromServer.length;i++) {
          this.returnDepartmentsArray[i]=[];
          this.returnDepartmentsArray[i]['id'] = this.returnArrayDepartmentsFromServer[i].id;
          this.returnDepartmentsArray[i]['managerId'] = this.returnArrayDepartmentsFromServer[i].managerId;
          await this.storage.get('checkLanguage').then(async checkLanguage=>{
            this.checkLanguage = checkLanguage
          });
          if(this.checkLanguage){
            if(this.language != "en")
              this.returnDepartmentsArray[i]['name'] = this.returnArrayDepartmentsFromServer[i].nameEn;
            else{
              this.returnDepartmentsArray[i]['name'] = this.returnArrayDepartmentsFromServer[i].nameEn;
            }
          }else{
            if (window.Intl && typeof window.Intl === 'object') {
              let Val  = navigator.language.split("-");
              if(this.language != "en")
                this.returnDepartmentsArray[i]['name'] = this.returnArrayDepartmentsFromServer[i].nameEn;
              else{
                this.returnDepartmentsArray[i]['name'] = this.returnArrayDepartmentsFromServer[i].nameEn;
              }
            }
            else{
              this.globalization.getPreferredLanguage().then(res => {
                let Val  = res.value.split("-");
                if(this.language != "en")
                  this.returnDepartmentsArray[i]['name'] = this.returnArrayDepartmentsFromServer[i].nameEn;
                else{
                  this.returnDepartmentsArray[i]['name'] = this.returnArrayDepartmentsFromServer[i].nameEn;
                }
              }).catch(e => {console.log(e);});
            }
          }
        }
        let countOfData = this.returnDepartmentsArray.length;
        if(countOfData == 0)
          this.departments = 0;
        else{
          this.departments = 1;
        }
      }else
        this.departments = 0;
    });
    this.departmentSearchId = await this.storage.get('departmentSearchIdTask');
    this.suberViserSearchName = await this.storage.get('suberViserSearchNameTask');
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
    await this.storage.set('orderIdTask',this.orderId);
    await this.storage.set('departmentSearchIdTask',this.departmentSearchId);
    await this.storage.set('suberViserSearchNameTask',this.suberViserSearchName);
    await this.storage.set('statusValTask',this.statusVal);
    this.modalController.dismiss({
      "orderId":this.orderId,
      "departmentSearchId":this.departmentSearchId,
      "suberViserSearchName":this.suberViserSearchName,
      "statusVal":this.statusVal,
    })
  }
}
