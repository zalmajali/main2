import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {CategoriesService} from "../../services/categories.service";
import { Network } from '@ionic-native/network/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from "../../services/users.service";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File,FileEntry } from '@ionic-native/file/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {
  public typeWork:any=1;
  public selectClassOne:any="categoriesHomeCardSelect";
  public selectClassTow:any="categoriesHomeCardUnSelect";
  public operationResult:any;
  public fullNameLogin:any;
  public emailLogin:any;
  public iconValues = "chevron-back-outline";
  public returnData:any;
  public fullName:any;
  public userId:any;
  public numberLogin:any;
  public catId:any;
  public points:any;
  public type:any;
  public email:any;
  public newNotifications:any=0;
  public returnNotfiData:any;
  public returnCitysData:any;
  public returnArrayCitysFromServer:any;
  public returnCitysArray:any = [];
  public returnCategoriesData:any;
  public returnArrayCategoriesFromServer:any;
  public returnCategoriesArray:any = [];
  public returnsubCatData:any;
  public returnArraysubCatFromServer:any;
  public returnsubCatArray:any = [];
  public catIdUser:any=0;
  public errorCat:any="";
  public isErrorCat:any = 1;
  public isdisabled:boolean=true;
  public subCatIdUser:any=0;
  public errorSubCat:any="";
  public isErrorSubCat:any = 1;
  public cityId:any=0;
  public errorCity:any="";
  public isErrorCity:any = 1;
  public regionId:any=0;
  public errorRegion:any="";
  public isErrorRegion:any = 1;
  public returnRegionsData:any;
  public returnArrayRegionsFromServer:any;
  public returnRegionsArray:any = [];
  public userName:any;
  public errorUserName:any="";
  public isErrorUserName:any = 1;
  public commercialName:any;
  public errorCommercialName:any="";
  public isErrorCommercialName:any = 1;
  public serviceDetails:any;
  public errorServiceDetails:any="";
  public isErrorServiceDetails:any = 1;
  public message:any;
  public firstFileArray:any;
  public secondFileArray:any;
  public thirdFileArray:any;
  public firstFileVal:any;
  public secondFileVal:any;
  public thirdFileVal:any;
  public returnDataUser:any;
  public isUpdateInformation:any;

  public foreFileVal:any;
  public foreFileArray:any;
  public serviceDetailsNew:any;
  constructor(private file: File,private toastCtrl: ToastController,private imagePicker: ImagePicker,private transfer: FileTransfer,private loading: LoadingController,private usersService:UsersService,private router : Router,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','information');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
  }
  selectCityValues(event){
    this.cityId = event;
    this.errorCity = "";
    this.isErrorCity = 1;
    this.categoriesService.regions(this.cityId).then(data=>{
      this.returnRegionsData = data;
      this.operationResult = this.returnRegionsData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnRegionsArray=[];
        this.returnArrayRegionsFromServer = this.returnRegionsData.Data.regions;
        for(let i = 0; i < this.returnArrayRegionsFromServer.length;i++) {
          this.returnRegionsArray[i]=[];
          this.returnRegionsArray[i]['id'] = this.returnArrayRegionsFromServer[i].id;
          this.returnRegionsArray[i]['title'] = this.returnArrayRegionsFromServer[i].title;
        }
      }
    });
    this.isEnterAllValues();
  }
  checkUserName(event){
    this.errorUserName = "succsessFiled";
    this.isErrorUserName = 1;
    this.userName = event;
    if(this.userName == "" || this.userName == undefined){
      this.errorUserName = "errorFiled";
      this.isErrorUserName = 0;
    }
    this.isEnterAllValues();
  }
  checkServiceDetails(event){
    this.errorServiceDetails = "succsessFiled";
    this.isErrorServiceDetails = 1;
    this.serviceDetails = event;
    if(this.serviceDetails == "" || this.serviceDetails == undefined){
      this.errorServiceDetails = "errorFiled";
      this.isErrorServiceDetails = 0;
    }
    this.isEnterAllValues();
  }
  checkCommercialName(event){
    this.errorCommercialName = "succsessFiled";
    this.isErrorCommercialName = 1;
    this.commercialName = event;
    if(this.commercialName == "" || this.commercialName == undefined){
      this.errorCommercialName = "errorFiled";
      this.isErrorCommercialName = 0;
    }
    this.isEnterAllValues();
  }
  selectCatValues(event){
    this.catIdUser = event;
    this.errorCat = "";
    this.isErrorCat = 1;
    this.categoriesService.subCat(this.catIdUser).then(data=>{
      this.returnsubCatData = data;
      this.operationResult = this.returnsubCatData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnsubCatArray=[];
        this.returnArraysubCatFromServer = this.returnsubCatData.Data.subCat;
        for(let i = 0; i < this.returnArraysubCatFromServer.length;i++) {
          this.returnsubCatArray[i]=[];
          this.returnsubCatArray[i]['id'] = this.returnArraysubCatFromServer[i].id;
          this.returnsubCatArray[i]['title'] = this.returnArraysubCatFromServer[i].title;
        }
      }
    });
    this.isEnterAllValues();
  }
  selectSubCatValues(event){
    this.subCatIdUser = event;
    this.errorSubCat = "";
    this.isErrorSubCat = 1;
    this.isEnterAllValues();
  }
  selectRegionValues(event){
    this.regionId = event;
    this.errorRegion = "";
    this.isErrorRegion = 1;
    this.isEnterAllValues();
  }
  isEnterAllValues(){
    if(this.catIdUser != 0 && this.subCatIdUser != 0 && this.cityId != 0 && this.regionId != 0 && this.userName != undefined && this.userName != "" && this.commercialName != undefined && this.commercialName != "" && this.serviceDetails != undefined && this.serviceDetails != ""){
      this.isdisabled = true;
    }
  }
  uploadeFirstFile(){
    let  options = {
      maximumImagesCount:1,
    };
    this.imagePicker.getPictures(options).then((results) => {
      this.file.resolveLocalFilesystemUrl(results[0]).then((entry:FileEntry)=>{
        entry.file((file)=>{
          this.firstFileArray = file;
          this.firstFileVal = file.name;
          this.message = "تم تحميل ملف الصورة بنجاح";
          this.displayResult(this.message);
        })
      }).catch(errrsss=>{
        this.message = "لم يتم تحميل ملف الصورة بنجاح";
        this.displayResult(this.message);
      })
    }, (err) => {
      this.message = "لم يتم تحميل ملف الصورة بنجاح";
      this.displayResult(this.message);
    });
  }
  uploadeSecondFile(){
    let  options = {
      maximumImagesCount:1,
    };
    this.imagePicker.getPictures(options).then((results) => {
      this.file.resolveLocalFilesystemUrl(results[0]).then((entry:FileEntry)=>{
        entry.file((file)=>{
          this.secondFileArray = file;
          this.secondFileVal = file.name;
          this.message = "تم تحميل ملف الصورة بنجاح";
          this.displayResult(this.message);
        })
      }).catch(errrsss=>{
        this.message = "لم يتم تحميل ملف الصورة بنجاح";
        this.displayResult(this.message);
      })
    }, (err) => {
      this.message = "لم يتم تحميل ملف الصورة بنجاح";
      this.displayResult(this.message);
    });
  }
  uploadeForeFile(){
    let  options = {
      maximumImagesCount:1,
    };
    this.imagePicker.getPictures(options).then((results) => {
      this.file.resolveLocalFilesystemUrl(results[0]).then((entry:FileEntry)=>{
        entry.file((file)=>{
          this.foreFileArray = file;
          this.foreFileVal = file.name;
          this.message = "تم تحميل ملف الصورة بنجاح";
          this.displayResult(this.message);
        })
      }).catch(errrsss=>{
        this.message = "لم يتم تحميل ملف الصورة بنجاح";
        this.displayResult(this.message);
      })
    }, (err) => {
      this.message = "لم يتم تحميل ملف الصورة بنجاح";
      this.displayResult(this.message);
    });
  }
  uploadeThirdFile(){
    let  options = {
      maximumImagesCount:1,
    };
    this.imagePicker.getPictures(options).then((results) => {
      this.file.resolveLocalFilesystemUrl(results[0]).then((entry:FileEntry)=>{
        entry.file((file)=>{
          this.thirdFileArray = file;
          this.thirdFileVal = file.name;
          this.message = "تم تحميل ملف الصورة بنجاح";
          this.displayResult(this.message);
        })
      }).catch(errrsss=>{
        this.message = "لم يتم تحميل ملف الصورة بنجاح";
        this.displayResult(this.message);
      })
    }, (err) => {
      this.message = "لم يتم تحميل ملف الصورة بنجاح";
      this.displayResult(this.message);
    });
  }
  async ngOnInit() {
    this.numberLogin = await this.storage.get('numberLogin');
    this.userId = await this.storage.get('userId');
    this.points = await this.storage.get('points');
    if(this.userId == null || this.numberLogin == null){
      this.storage.remove('fullNameLogin');
      this.storage.remove('numberLogin');
      this.storage.remove('passwordLogin');
      this.storage.remove('type');
      this.storage.remove('userId');
      this.storage.remove('catId');
      this.storage.remove('subCatId');
      this.storage.remove('points');
      this.navCtrl.navigateRoot('login');
    }
    this.categoriesService.citys().then(data=>{
      this.returnCitysData = data;
      this.operationResult = this.returnCitysData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayCitysFromServer = this.returnCitysData.Data.citys;
        for(let i = 0; i < this.returnArrayCitysFromServer.length;i++) {
          this.returnCitysArray[i]=[];
          this.returnCitysArray[i]['id'] = this.returnArrayCitysFromServer[i].id;
          this.returnCitysArray[i]['title'] = this.returnArrayCitysFromServer[i].title;
        }
      }
    });
    this.categoriesService.categories().then(data=>{
      this.returnCategoriesData = data;
      this.operationResult = this.returnCategoriesData.Error.ErrorCode;
      if(this.operationResult==1){
        this.returnArrayCategoriesFromServer = this.returnCategoriesData.Data.categories;
        for(let i = 0; i < this.returnArrayCategoriesFromServer.length;i++) {
          this.returnCategoriesArray[i]=[];
          this.returnCategoriesArray[i]['id'] = this.returnArrayCategoriesFromServer[i].id;
          this.returnCategoriesArray[i]['title'] = this.returnArrayCategoriesFromServer[i].title;
        }
      }
    });
    await this.usersService.information(this.userId).then(async data=>{
      this.returnDataUser = data;
      this.operationResult = this.returnDataUser.Error.ErrorCode;
      if(this.operationResult==1){
        this.points = this.returnDataUser.Data.points;
        await this.storage.set('points',this.points);
        this.isUpdateInformation = this.returnDataUser.Data.isUpdateInformation;
        await this.storage.set('isUpdateInformation',this.isUpdateInformation);
        if(this.isUpdateInformation == 1){
          await this.storage.set('isaddInformation',1);
          this.message = "تمت عملية إكمال بياناتك بنجاح سيتم مراجعتها من خلال الإدارة و تفعيل حسابك";
          this.displayResult(this.message);
          this.navCtrl.navigateRoot('login');
        }
      }else{
        this.storage.remove('fullNameLogin');
        this.storage.remove('numberLogin');
        this.storage.remove('passwordLogin');
        this.storage.remove('type');
        this.storage.remove('userId');
        this.storage.remove('catId');
        this.storage.remove('subCatId');
        this.storage.remove('points');
        this.navCtrl.navigateRoot('login');
      }
    }).catch(e=>{
      this.storage.remove('fullNameLogin');
      this.storage.remove('numberLogin');
      this.storage.remove('passwordLogin');
      this.storage.remove('type');
      this.storage.remove('userId');
      this.storage.remove('catId');
      this.storage.remove('subCatId');
      this.storage.remove('points');
      this.navCtrl.navigateRoot('login');
      this.displayResult(this.message);
    })
    await this.checkIfSiteWork();
    this.notifications();
  }
  async updateData(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','information');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    if(this.catIdUser == 0 && this.subCatIdUser == 0 && this.cityId == 0 && this.regionId == 0 && (this.userName == undefined || this.userName == "") && (this.commercialName == undefined || this.commercialName == "") && (this.serviceDetails == undefined || this.serviceDetails == "")){
      this.errorCat = "errorFiled";
      this.isErrorCat = 0;
      this.errorSubCat = "errorFiled";
      this.isErrorSubCat = 0;
      this.errorCity = "errorFiled";
      this.isErrorCity = 0;
      this.errorRegion = "errorFiled";
      this.isErrorRegion = 0;
      this.errorUserName = "errorFiled";
      this.isErrorUserName = 0;
      this.errorCommercialName = "errorFiled";
      this.isErrorCommercialName = 0;
      this.errorServiceDetails = "errorFiled";
      this.isErrorServiceDetails = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.catIdUser == 0){
      this.errorCat = "errorFiled";
      this.isErrorCat = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.subCatIdUser == 0){
      this.errorSubCat = "errorFiled";
      this.isErrorSubCat = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.cityId == 0){
      this.errorCity = "errorFiled";
      this.isErrorCity = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.regionId == 0){
      this.errorRegion = "errorFiled";
      this.isErrorRegion = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.userName == undefined || this.userName == ""){
      this.errorUserName = "errorFiled";
      this.isErrorUserName = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.commercialName == undefined || this.commercialName == ""){
      this.errorCommercialName = "errorFiled";
      this.isErrorCommercialName = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.serviceDetails == undefined || this.serviceDetails == ""){
      this.errorServiceDetails = "errorFiled";
      this.isErrorServiceDetails = 0;
      this.isdisabled = false;
      return false;
    }
    if(this.catIdUser != 0 && this.subCatIdUser != 0 && this.cityId != 0 && this.regionId != 0 && this.userName != undefined && this.commercialName != undefined && this.serviceDetails != undefined){
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 2500,
      });
      await loading.present();
      this.serviceDetailsNew = this.serviceDetails
      var match = /\r|\n/.exec(this.serviceDetails);
      if (match) {
        this.serviceDetailsNew = this.serviceDetails.replaceAll(/\r|\n/ig, " swapkozeyad ");
      }
      await this.usersService.updateData(this.userId,this.catIdUser,this.subCatIdUser,this.cityId,this.regionId,this.userName,this.commercialName,this.serviceDetailsNew,this.typeWork).then(async data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        if(this.operationResult==1){
          const fileTransfer: FileTransferObject = this.transfer.create();
          if(this.firstFileArray!=undefined && this.firstFileArray!=null && this.firstFileArray!=""){
            let options: FileUploadOptions = {
              fileKey: 'file',
              fileName:this.firstFileArray.name,
              mimeType:this.firstFileArray.type,
              chunkedMode:false,
              headers: {}
            }
            fileTransfer.upload(this.firstFileArray.localURL, 'https://admin.eswapco.com/api/addImages/'+this.userId+"/1", options)
              .then((data) => {
              }, (err) => {
              })
          }
          if(this.secondFileArray!=undefined && this.secondFileArray!=null && this.secondFileArray!=""){
            let options: FileUploadOptions = {
              fileKey: 'file',
              fileName:this.secondFileArray.name,
              mimeType:this.secondFileArray.type,
              chunkedMode:false,
              headers: {}
            }
            fileTransfer.upload(this.secondFileArray.localURL, 'https://admin.eswapco.com/api/addImages/'+this.userId+"/2", options)
              .then((data) => {
              }, (err) => {
              })
          }
          if(this.thirdFileArray!=undefined && this.firstFileArray!=null && this.thirdFileArray!=""){
            let options: FileUploadOptions = {
              fileKey: 'file',
              fileName:this.firstFileArray.name,
              mimeType:this.firstFileArray.type,
              chunkedMode:false,
              headers: {}
            }
            fileTransfer.upload(this.firstFileArray.localURL, 'https://admin.eswapco.com/api/addImages/'+this.userId+"/3", options)
              .then((data) => {
              }, (err) => {
              })
          }
          if(this.foreFileArray!=undefined && this.foreFileArray!=null && this.foreFileArray!=""){
            let options: FileUploadOptions = {
              fileKey: 'file',
              fileName:this.foreFileArray.name,
              mimeType:this.foreFileArray.type,
              chunkedMode:false,
              headers: {}
            }
            fileTransfer.upload(this.foreFileArray.localURL, 'https://admin.eswapco.com/api/addImages/'+this.userId+"/4", options)
              .then((data) => {
              }, (err) => {
              })
          }
          await this.storage.set('isaddInformation',1);
          this.message = "تمت عملية إكمال بياناتك بنجاح سيتم مراجعتها من خلال الإدارة و تفعيل حسابك";
          this.displayResult(this.message);
        }else if(this.operationResult==2){
          this.message = "لم تتم عملية إكمال بياناتك بنجاح...البيانات فارغة";
          this.displayResult(this.message);
        }else if(this.operationResult==3){
          this.message = "لم عملية إكمال بياناتك بنجاح...حاول مرة اخرى";
          this.displayResult(this.message);
        }
      }).catch(e=>{
        this.message = "لم عملية إكمال بياناتك بنجاح...حاول مرة اخرى";
        this.displayResult(this.message);
      })
      this.isdisabled = true;
    }
  }

  functionChangeType(type:any){
    if(type == 1){
      this.typeWork=1;
      this.selectClassOne="categoriesHomeCardSelect"
      this.selectClassTow="categoriesHomeCardUnSelect"
    }else{
      this.typeWork=2;
      this.selectClassOne="categoriesHomeCardUnSelect"
      this.selectClassTow="categoriesHomeCardSelect"
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
  ///hear all values
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
  functionPushNotifications(){
    this.navCtrl.navigateRoot("/pushnotification");
  }
  async functionOpenMenue(){
    this.fullName = await this.storage.get('fullNameLogin');
    this.numberLogin = await this.storage.get('numberLogin');
    this.userId = await this.storage.get('userId');
    this.catId = await this.storage.get('catId');
    this.points = await this.storage.get('points');
    this.type = await this.storage.get('type');
    this.email = await this.storage.get('email');
    if(this.userId == null || this.numberLogin == null || this.catId == null || this.type == null){
      this.menu.enable(true,"first");
      this.menu.open("first");
    }else{
      this.menu.enable(true,"last");
      this.menu.open("last");
    }
  }
}
