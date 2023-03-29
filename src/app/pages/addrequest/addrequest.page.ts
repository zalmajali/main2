import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform,ModalController, ToastController,AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {RequestsService} from "../../services/requests.service";
import { Network } from '@ionic-native/network/ngx';
import {HttpClient} from "@angular/common/http";
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import {UsersService} from "../../services/users.service";
@Component({
  selector: 'app-addrequest',
  templateUrl: './addrequest.page.html',
  styleUrls: ['./addrequest.page.scss'],
})
export class AddrequestPage implements OnInit {
  public menu3:any;
  public menu5:any;
  public menu6:any;
  public menu7:any;
  public menu8:any;

  public requestsAddTitle:any;
  public float: any;
  public dir: any;
  public dirTow: any;
  public operationResult:any;
  public returnData:any;
  public returnFullName:any;
  public returnNumber:any;
  public message:any;
  public checkLanguage: any=0;
  public language: string;
  public internetMessage: any;
  public userId:any;
  public departmentId:any;
  public type:any;
  public email:any;
  public toastStyle:any;
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
  public firstFile:any;
  public secondFile:any;
  public thirdFile:any;
  public add:any;
  public isdisabled:boolean=true;

  public machineNumberVal:any;
  public isErrorMachineNumberMsg:any;
  public errorMachineNumber:any="";
  public isErrorMachineNumber:any = 1;

  public machineDescriptionVal:any;
  public isErrorMachineDescriptionMsg:any;
  public errorMachineDescription:any="";
  public isErrorMachineDescription:any = 1;

  public faultDescriptionVal:any;
  public isErrorFaultDescriptionMsg:any;
  public errorFaultDescription:any="";
  public isErrorFaultDescription:any = 1;

  public machineStatusVal:any = 1;
  public urgencyVal:any = 1;

  public addMessageSuccess:any;
  public addMessageFailedOne:any;
  public addMessageFaileTow:any;

  public firstFileArray:any;
  public secondFileArray:any;
  public thirdFileArray:any;
  public firstFileVal:any;
  public secondFileVal:any;
  public thirdFileVal:any;
  public rId:any;
  public allowedExtensions:any;
  public newNotifications:any='';
  public returnNotfiData:any;
  public backePage:any;
  public showGeneral:any;
  public allowShowGeneral:any=0;

  public uplodeFirstFile:any=0;
  public uplodeSecondFile:any=0;
  public uplodeThirdFile:any=0;
  public getDataByUser:any = 0;
  constructor(private usersService:UsersService,private filePath: FilePath,private chooser: Chooser,private transfer: FileTransfer, private file: File,private activaterouter : ActivatedRoute,private router : Router,private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private http:HttpClient,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private requestsService:RequestsService,private toastCtrl: ToastController,private loading: LoadingController) {
    this.checkInternetData();
    this.menu.enable(false,"last");
    this.menu.enable(false,"first");
    this.backPageValues();
  }
  download() {
    let result1 = this.file.createDir(this.file.externalDataDirectory, "shifaALQuran1", true).then(res=>{
      alert(this.file.externalDataDirectory);
    }).catch(error=>{alert(JSON.stringify(error))})

    let result2 = this.file.createDir(this.file.applicationStorageDirectory, "shifaALQuran2", true).then(res=>{
      alert("done");
    }).catch(error=>{alert(JSON.stringify(error))})

    let result3 = this.file.createDir(this.file.documentsDirectory, "shifaALQuran3", true).then(res=>{
      alert("done");
    }).catch(error=>{alert(JSON.stringify(error))})

    let result4 = this.file.createDir(this.file.dataDirectory, "shifaALQuran4", true).then(res=>{
      alert("done");
    }).catch(error=>{alert(JSON.stringify(error))})

    let result5 = this.file.createDir(this.file.externalCacheDirectory, "shifaALQuran5", true).then(res=>{
      alert("done");
    }).catch(error=>{alert(JSON.stringify(error))})

    let result6 = this.file.createDir(this.file.tempDirectory, "shifaALQuran6", true).then(res=>{
      alert("done");
    }).catch(error=>{alert(JSON.stringify(error))})

    let result7 = this.file.createDir(this.file.sharedDirectory, "shifaALQuran7", true).then(res=>{
      alert("done");
    }).catch(error=>{alert(JSON.stringify(error))})

    let valdsf = this.file.externalApplicationStorageDirectory;
    let myArray = valdsf.split("emulated/0/Android/data/com.Yazan.com/");
    let result8 = this.file.createDir(myArray[0], "shifaALQuran8", true).then(res=>{
      alert("donedonedonedonedonedonedonedonedonedone");
    }).catch(error=>{alert(JSON.stringify(error))})

    let result9 = this.file.createDir(this.file.cacheDirectory, "shifaALQuran9", true).then(res=>{
      alert("done");
    }).catch(error=>{alert(JSON.stringify(error))})

    let result10 = this.file.createDir(this.file.applicationDirectory, "shifaALQuran0", true).then(res=>{
      alert("done");
    }).catch(error=>{alert(JSON.stringify(error))})
  }
  initialiseTranslation(){
    this.translate.get('add_request').subscribe((res: string) => {
      this.requestsAddTitle = res;
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
    this.translate.get('isError_machine_number_msg').subscribe((res: string) => {
      this.isErrorMachineNumberMsg = res;
    });
    this.translate.get('isError_machine_description_msg').subscribe((res: string) => {
      this.isErrorMachineDescriptionMsg = res;
    });
    this.translate.get('isError_machine_fault_description_msg').subscribe((res: string) => {
      this.isErrorFaultDescriptionMsg = res;
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
    this.translate.get('first_file').subscribe((res: string) => {
      this.firstFile = res;
    });
    this.translate.get('second_file').subscribe((res: string) => {
      this.secondFile = res;
    });
    this.translate.get('third_file').subscribe((res: string) => {
      this.thirdFile = res;
    });
    this.translate.get('add').subscribe((res: string) => {
      this.add = res;
    });
    this.translate.get('addr_message_success').subscribe((res: string) => {
      this.addMessageSuccess = res;
    });
    this.translate.get('addr_message_failed_one').subscribe((res: string) => {
      this.addMessageFailedOne = res;
    });
    this.translate.get('addr_message_failed_tow').subscribe((res: string) => {
      this.addMessageFaileTow = res;
    });
    this.translate.get('allowed_extensions').subscribe((res: string) => {
      this.allowedExtensions = res;
    });
    this.translate.get('show_general').subscribe((res: string) => {
      this.showGeneral = res;
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
  checkedValues(event:any){
    if(event.detail.checked == true){
      this.allowShowGeneral = 1;
    }else{
      this.allowShowGeneral = 0;
    }
  }
  checkMachineNumber(event){
    this.errorMachineNumber = "succsessFiled";
    this.isErrorMachineNumber = 1;
    this.machineNumberVal = event;
    if(this.machineNumberVal == "" || this.machineNumberVal == undefined){
      this.errorMachineNumber = "errorFiled";
      this.isErrorMachineNumber = 0;
    }
    this.isEnterAllValues();
  }
  checkMachineDescription(event){
    this.errorMachineDescription = "succsessFiled";
    this.isErrorMachineDescription = 1;
    this.machineDescriptionVal = event;
    if(this.machineDescriptionVal == "" || this.machineDescriptionVal == undefined){
      this.errorMachineDescription = "errorFiled";
      this.isErrorMachineDescription = 0;
    }
    this.isEnterAllValues();
  }
  checkFaultDescription(event){
    this.errorFaultDescription = "succsessFiled";
    this.isErrorFaultDescription = 1;
    this.faultDescriptionVal = event;
    if(this.faultDescriptionVal == "" || this.faultDescriptionVal == undefined){
      this.errorFaultDescription = "errorFiled";
      this.isErrorFaultDescription = 0;
    }
    this.isEnterAllValues();
  }
  async changeStatus(event){
    this.machineStatusVal = event;
  }
  async changeUrgency(event){
    this.urgencyVal = event;
  }
  isEnterAllValues(){
    if(this.machineNumberVal != undefined && this.machineNumberVal != "" && this.machineNumberVal != null && this.machineNumberVal != "null" && this.machineDescriptionVal != undefined && this.machineDescriptionVal != "" && this.machineDescriptionVal != null && this.machineDescriptionVal != "null" && this.faultDescriptionVal != undefined && this.faultDescriptionVal != "" && this.faultDescriptionVal != null && this.faultDescriptionVal != "null" ){
      this.isdisabled = true;
    }
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    this.checkInternetData();
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
      this.navCtrl.navigateRoot('/login');
    }
    if(this.departmentId!=1 && this.type=='suber'){
      this.allowShowGeneral = 1;
      this.getDataByUser = 1;
    }
    this.activaterouter.params.subscribe(params => {
      this.backePage = params['page'];
    });
    this.notifications();
  }
  async backPageValues(){
    this.platform.backButton.subscribeWithPriority(10, async () => {
      if(this.backePage==1)
        this.navCtrl.navigateRoot("/myrequests")
      else
        this.navCtrl.navigateRoot("/newtasks")

    });
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
  removeFile(num:any){
    if(num == 1){
      this.firstFileArray = "";
      this.firstFileVal = "";
      this.uplodeFirstFile = 0;
    }
    if(num == 2){
      this.secondFileArray = "";
      this.secondFileVal = "";
      this.uplodeSecondFile = 0;
    }
    if(num == 3){
      this.thirdFileArray = "";
      this.thirdFileVal = "";
      this.uplodeThirdFile = 0;
    }
  }
  uploadeFirstFile(){
    this.chooser.getFile()
      .then((file) =>{
        this.firstFileArray = file;
        this.firstFileVal = file.name;
        this.uplodeFirstFile = 1;
      }) .catch((error: any) =>{
      this.firstFileArray = "";
      this.firstFileVal = "";
      this.uplodeFirstFile = 0;
    });
  }
  uploadeSecondFile(){
    this.chooser.getFile()
      .then((file) =>{
        this.secondFileArray = file;
        this.secondFileVal = file.name;
        this.uplodeSecondFile = 1;
      }) .catch((error: any) => {
      this.secondFileArray = "";
      this.secondFileVal = "";
      this.uplodeSecondFile = 0;
    });
  }
  uploadeThirdFile(){
    this.chooser.getFile()
      .then((file) =>{
        this.thirdFileArray = file;
        this.thirdFileVal = file.name;
        this.uplodeThirdFile = 1;
      }) .catch((error: any) => {
      this.thirdFileArray = "";
      this.thirdFileVal = "";
      this.uplodeThirdFile = 0;
    });
  }
  async addRequests(){
    this.checkInternetData();
    if((this.machineNumberVal == undefined || this.machineNumberVal == "" || this.machineNumberVal == null || this.machineNumberVal == "null") && (this.machineDescriptionVal == undefined || this.machineDescriptionVal == "" || this.machineDescriptionVal == null || this.machineDescriptionVal == "null") && (this.faultDescriptionVal == undefined || this.faultDescriptionVal == "" || this.faultDescriptionVal == null || this.faultDescriptionVal == "null")){
      this.errorMachineNumber = "errorFiled";
      this.isErrorMachineNumber = 0;
      this.errorMachineDescription = "errorFiled";
      this.isErrorMachineDescription = 0;
      this.errorFaultDescription = "errorFiled";
      this.isErrorFaultDescription = 0;
      return false;
    }
    if(this.machineNumberVal == undefined || this.machineNumberVal == "" || this.machineNumberVal == null || this.machineNumberVal == "null"){
      this.errorMachineNumber = "errorFiled";
      this.isErrorMachineNumber = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.machineDescriptionVal == undefined || this.machineDescriptionVal == "" || this.machineDescriptionVal == null || this.machineDescriptionVal == "null"){
      this.errorMachineDescription = "errorFiled";
      this.isErrorMachineDescription = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.faultDescriptionVal == undefined || this.faultDescriptionVal == "" || this.faultDescriptionVal == null || this.faultDescriptionVal == "null"){
      this.errorFaultDescription = "errorFiled";
      this.isErrorFaultDescription = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.machineNumberVal != undefined && this.machineNumberVal != null && this.machineDescriptionVal != undefined && this.machineDescriptionVal != null && this.faultDescriptionVal != undefined && this.faultDescriptionVal != null){
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 3500,
      });
      await loading.present();
      this.requestsService.addRequests(this.departmentId,this.machineNumberVal,this.machineDescriptionVal,this.machineStatusVal,this.faultDescriptionVal,this.urgencyVal,this.userId,this.allowShowGeneral).then(async data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        if(this.operationResult==1){
          this.rId = this.returnData.Error.rId;
          const fileTransfer: FileTransferObject = this.transfer.create();
          if(this.firstFileArray!=undefined && this.firstFileArray!=null && this.firstFileArray!=""){
            let options: FileUploadOptions = {
              fileKey: 'file',
              fileName:this.firstFileArray.name,
              mimeType:this.firstFileArray.mediaType,
              chunkedMode:false,
              headers: {}
            }
              fileTransfer.upload(this.firstFileArray.uri, 'https://pw-prog.com/maintenance/api/addRequestsFilesOne/'+this.rId+"/1", options)
              .then((data) => {
              }, (err) => {
            })
          }
          if(this.secondFileArray!=undefined && this.secondFileArray!=null && this.secondFileArray!=""){
            let options: FileUploadOptions = {
              fileKey: 'file',
              fileName:this.secondFileArray.name,
              mimeType:this.secondFileArray.mediaType,
              chunkedMode:false,
              headers: {}
            }
            fileTransfer.upload(this.secondFileArray.uri, 'https://pw-prog.com/maintenance/api/addRequestsFilesTow/'+this.rId+"/2", options)
              .then((data) => {
              }, (err) => {
            })
          }
          if(this.thirdFileArray!=undefined && this.thirdFileArray!=null && this.thirdFileArray!=""){
            let options: FileUploadOptions = {
              fileKey: 'file',
              fileName:this.thirdFileArray.name,
              mimeType:this.thirdFileArray.mediaType,
              chunkedMode:false,
              headers: {}
            }
            fileTransfer.upload(this.thirdFileArray.uri, 'https://pw-prog.com/maintenance/api/addRequestsFilesThree/'+this.rId+"/3", options)
              .then((data) => {
              }, (err) => {
              })
          }
          this.message = this.addMessageSuccess;
          this.displayResult(this.message);
          this.machineNumberVal = "";
          this.machineDescriptionVal = "";
          this.machineStatusVal = 1;
          this.faultDescriptionVal = "";
          this.urgencyVal = 1;
          this.firstFileArray = "";
          this.firstFileVal = "";
          this.uplodeFirstFile = 0;
          this.secondFileArray = "";
          this.secondFileVal = "";
          this.uplodeSecondFile = 0;
          this.thirdFileArray = "";
          this.thirdFileVal = "";
          this.uplodeThirdFile = 0;
        }else if(this.operationResult==2){
          this.message = this.addMessageFailedOne;
          this.displayResult(this.message);
        }else if(this.operationResult==3){
          this.message = this.addMessageFaileTow;
          this.displayResult(this.message);
        }
      }).catch(e=>{
        this.message = this.addMessageFaileTow;
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
  functionTeam(){
    this.navCtrl.navigateRoot("/team");
  }
  functionAddrequest(){
    this.navCtrl.navigateRoot("/addrequest");
  }
  functionAllrequest(){
    this.navCtrl.navigateRoot("/allrequest");
  }
  functionRequest(){
      this.navCtrl.navigateRoot("/myrequests")
  }
  functionAccount(){
    this.navCtrl.navigateRoot("/account");
  }
  functionPushNotifications(){
    this.navCtrl.navigateRoot("/pushnotification");
  }
  settings(){
    this.navCtrl.navigateRoot("/settings");
  }
}
