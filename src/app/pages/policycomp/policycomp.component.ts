import { Component, OnInit,Input } from '@angular/core';
import {ModalController, Platform,NavController,LoadingController} from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import {UsersService} from "../../services/users.service";
@Component({
  selector: 'app-policycomp',
  templateUrl: './policycomp.component.html',
  styleUrls: ['./policycomp.component.scss'],
})
export class PolicycompComponent implements OnInit {
  description:any;
  isThere:any = 1;
  returnData:any;
  operationResult:any;
  fullNameLogin:any;
  emailLogin:any;
  productInShopingCart:any;
  title:any;
  constructor(private activaterouter : ActivatedRoute,private loading: LoadingController,private usersService:UsersService,private navCtrl: NavController,private router : Router,private modalController: ModalController,private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
  }

  ngOnInit() {
    this.usersService.policyApp().then(async data=>{
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: '',
        duration: 2500,
      });
      await loading.present();
      this.returnData = data;
      this.operationResult = this.returnData.Error.ErrorCode;
      if(this.operationResult==1){
        this.description = this.returnData.Data.description;
        this.title = this.returnData.Data.title;
        if(this.description)
          this.isThere = 1;
        else
          this.isThere = 0;
      }
      else if(this.operationResult==2){
        this.isThere = 0;
      }
    });
  }
  closeModel(){
    this.modalController.dismiss({
    });
  }
}
