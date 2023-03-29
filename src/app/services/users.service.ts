import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = "https://pw-prog.com/maintenance/api";
  public result:any;
  constructor(private http:HttpClient) { }
  async checkUser(jobNumber:any,password:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"checkUser"+"/"+jobNumber+"/"+password,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async employeesSearch(userId:any,departmentId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"employeesSearch"+"/"+userId+"/"+departmentId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async employeeInfo(userId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"employeeInfo"+"/"+userId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async employeesDepartMain(userId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"employeesDepartMain"+"/"+userId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async employees(userId:any,type:any,departmentId:any=0){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"employees"+"/"+userId+"/"+type+"/"+departmentId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async userStatuse(userId:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"userStatuse"+"/"+userId,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async employeesBlock(adminId:any,userId:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"employeesBlock"+"/"+adminId+"/"+userId,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async checkStatuse(userId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"checkStatuse"+"/"+userId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

/*  async employeesDepart(departmentId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"employeesDepart"+"/"+departmentId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }*/
  async departments(userId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"departments"+"/"+userId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async newNotifications(userId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"newNotifications"+"/"+userId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async allNotifications(userId:any,limit:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"allNotifications"+"/"+userId+"/"+limit).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async aboutApp(){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"about").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async updateAccount(userId:any,fullName:any,mobile:any,email:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"updateAccount"+"/"+userId+"/"+fullName+"/"+mobile+"/"+email,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async updateUpdatePush(userId:any,val:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"updateUpdatePush"+"/"+userId+"/"+val,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async updateUpdateImage(userId:any,val:any){
    return new Promise(resolve => {
    this.http.post(this.baseUrl+'/'+"updateUpdateImage"+"/"+userId+"/"+val,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  async forgotPassword(email:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"forgotPassword"+"/"+email,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async changePassword(userId:any,oaldPassword:any,newPassword:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"changePassword"+"/"+userId+"/"+oaldPassword+"/"+newPassword,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
