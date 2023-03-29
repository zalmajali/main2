import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private baseUrl = "https://pw-prog.com/maintenance/api";
  public result:any;
  constructor(private http:HttpClient) { }
  async request(userId:any,departmentId:any,typeId:any=0,getDataByUser:any,departmentSearchId:any=0,suberViserName:any=0,machineNumber:any=0,status:any=0,urgency:any=0,machineDescription:any=0,faultDescription:any=0,sortingBy:any=0,limit:any=1){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"request"+"/"+userId+"/"+departmentId+"/"+typeId+"/"+getDataByUser+"/"+departmentSearchId+"/"+suberViserName+"/"+machineNumber+"/"+status+"/"+urgency+"/"+machineDescription+"/"+faultDescription+"/"+sortingBy+"/"+limit).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async requestOperations(requestId:any,userId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"requestOperations"+"/"+requestId+"/"+userId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async taskOperations(taskId:any,userId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"taskOperations"+"/"+taskId+"/"+userId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async myRequest(userId:any,departmentId:any,getDataByUser:any,orderId:any=0,attachments:any=0,fromSelectDate:any=0,toSelectDate:any=0,machineSearchNumber:any=0,statusSearch:any=0,urgencySearch:any=0,machineSearchDescription:any=0,faultSearchDescription:any=0,sortingBy:any=0,limit:any=1){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"myRequest"+"/"+userId+"/"+departmentId+"/"+getDataByUser+"/"+orderId+"/"+attachments+"/"+fromSelectDate+"/"+toSelectDate+"/"+machineSearchNumber+"/"+statusSearch+"/"+urgencySearch+"/"+machineSearchDescription+"/"+faultSearchDescription+"/"+sortingBy+"/"+limit).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async allRequest(userId:any,departmentId:any,getDataByUser:any,orderId:any=0,attachments:any=0,fromSelectDate:any=0,toSelectDate:any=0,departmentSearchId:any=0,suberViserSearchName:any=0,machineSearchNumber:any=0,statusSearch:any=0,urgencySearch:any=0,machineSearchDescription:any=0,faultSearchDescription:any=0,sortingBy:any=0,limit:any=1){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"allRequest"+"/"+userId+"/"+departmentId+"/"+getDataByUser+"/"+orderId+"/"+attachments+"/"+fromSelectDate+"/"+toSelectDate+"/"+departmentSearchId+"/"+suberViserSearchName+"/"+machineSearchNumber+"/"+statusSearch+"/"+urgencySearch+"/"+machineSearchDescription+"/"+faultSearchDescription+"/"+sortingBy+"/"+limit).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async allRequestUser(userId:any,suberViserSearchName:any,departmentId:any,orderId:any=0,attachments:any=0,fromSelectDate:any=0,toSelectDate:any=0,machineSearchNumber:any=0,statusSearch:any=0,urgencySearch:any=0,machineSearchDescription:any=0,faultSearchDescription:any=0,sortingBy:any=0,limit:any=1){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"allRequestUser"+"/"+userId+"/"+suberViserSearchName+"/"+departmentId+"/"+orderId+"/"+attachments+"/"+fromSelectDate+"/"+toSelectDate+"/"+machineSearchNumber+"/"+statusSearch+"/"+urgencySearch+"/"+machineSearchDescription+"/"+faultSearchDescription+"/"+sortingBy+"/"+limit).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async newRequest(userId:any,departmentId:any,getDataByUser:any,orderId:any=0,attachments:any=0,fromSelectDate:any=0,toSelectDate:any=0,departmentSearchId:any=0,suberViserSearchName:any=0,machineSearchNumber:any=0,statusSearch:any=0,urgencySearch:any=0,machineSearchDescription:any=0,faultSearchDescription:any=0,sortingBy:any=0,limit:any=1){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"newRequest"+"/"+userId+"/"+departmentId+"/"+getDataByUser+"/"+orderId+"/"+attachments+"/"+fromSelectDate+"/"+toSelectDate+"/"+departmentSearchId+"/"+suberViserSearchName+"/"+machineSearchNumber+"/"+statusSearch+"/"+urgencySearch+"/"+machineSearchDescription+"/"+faultSearchDescription+"/"+sortingBy+"/"+limit).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async processingRequest(userId:any,departmentId:any,getDataByUser:any,orderId:any=0,attachments:any=0,fromSelectDate:any=0,toSelectDate:any=0,departmentSearchId:any=0,suberViserSearchName:any=0,machineSearchNumber:any=0,statusSearch:any=0,urgencySearch:any=0,machineSearchDescription:any=0,faultSearchDescription:any=0,sortingBy:any=0,limit:any=1){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"processingrequests"+"/"+userId+"/"+departmentId+"/"+getDataByUser+"/"+orderId+"/"+attachments+"/"+fromSelectDate+"/"+toSelectDate+"/"+departmentSearchId+"/"+suberViserSearchName+"/"+machineSearchNumber+"/"+statusSearch+"/"+urgencySearch+"/"+machineSearchDescription+"/"+faultSearchDescription+"/"+sortingBy+"/"+limit).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async approvedrequests(userId:any,departmentId:any,getDataByUser:any,orderId:any=0,attachments:any=0,fromSelectDate:any=0,toSelectDate:any=0,departmentSearchId:any=0,suberViserSearchName:any=0,machineSearchNumber:any=0,statusSearch:any=0,urgencySearch:any=0,machineSearchDescription:any=0,faultSearchDescription:any=0,sortingBy:any=0,limit:any=1){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"approvedrequests"+"/"+userId+"/"+departmentId+"/"+getDataByUser+"/"+orderId+"/"+attachments+"/"+fromSelectDate+"/"+toSelectDate+"/"+departmentSearchId+"/"+suberViserSearchName+"/"+machineSearchNumber+"/"+statusSearch+"/"+urgencySearch+"/"+machineSearchDescription+"/"+faultSearchDescription+"/"+sortingBy+"/"+limit).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async finishedRequest(userId:any,departmentId:any,getDataByUser:any,orderId:any=0,attachments:any=0,fromSelectDate:any=0,toSelectDate:any=0,departmentSearchId:any=0,suberViserSearchName:any=0,machineSearchNumber:any=0,statusSearch:any=0,urgencySearch:any=0,machineSearchDescription:any=0,faultSearchDescription:any=0,sortingBy:any=0,limit:any=1){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"finishedrequests"+"/"+userId+"/"+departmentId+"/"+getDataByUser+"/"+orderId+"/"+attachments+"/"+fromSelectDate+"/"+toSelectDate+"/"+departmentSearchId+"/"+suberViserSearchName+"/"+machineSearchNumber+"/"+statusSearch+"/"+urgencySearch+"/"+machineSearchDescription+"/"+faultSearchDescription+"/"+sortingBy+"/"+limit).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async canceledrequests(userId:any,departmentId:any,getDataByUser:any,orderId:any=0,attachments:any=0,fromSelectDate:any=0,toSelectDate:any=0,departmentSearchId:any=0,suberViserSearchName:any=0,machineSearchNumber:any=0,statusSearch:any=0,urgencySearch:any=0,machineSearchDescription:any=0,faultSearchDescription:any=0,sortingBy:any=0,limit:any=1){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"canceledrequests"+"/"+userId+"/"+departmentId+"/"+getDataByUser+"/"+orderId+"/"+attachments+"/"+fromSelectDate+"/"+toSelectDate+"/"+departmentSearchId+"/"+suberViserSearchName+"/"+machineSearchNumber+"/"+statusSearch+"/"+urgencySearch+"/"+machineSearchDescription+"/"+faultSearchDescription+"/"+sortingBy+"/"+limit).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async requestDetails(requestId:any,userId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"requestDetails"+"/"+requestId+"/"+userId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async orderReplyUser(userId:any,requestId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"orderReplyUser"+"/"+userId+"/"+requestId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async incomingReplyUser(userId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"incomingReplyUser"+"/"+userId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async taskReplyUser(userId:any,requestId:any,taskId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"taskReplyUser"+"/"+userId+"/"+requestId+"/"+taskId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async allAssignedUser(requestId:any,userId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"allAssignedUser"+"/"+requestId+"/"+userId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async requestDetailsFineshed(userId:any,requestId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"requestDetailsFineshed"+"/"+userId+"/"+requestId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async taskDetails(taskId:any,userId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"taskDetails"+"/"+taskId+"/"+userId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async allTasks(userId:any=0,orderId:any=0,departmentId:any=0,assigned:any=0,statusVal:any=0,limitNew:any=0){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"allTasks"+"/"+userId+"/"+orderId+"/"+departmentId+"/"+assigned+"/"+statusVal+"/"+limitNew).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async newTasks(userId:any=0,getDataByUser:any=0,orderId:any=0,departmentId:any=0,assigned:any=0,limitNew:any=0){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"newTasks"+"/"+userId+"/"+getDataByUser+"/"+orderId+"/"+departmentId+"/"+assigned+"/"+limitNew).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async progressTasks(userId:any=0,getDataByUser:any=0,orderId:any=0,departmentId:any=0,assigned:any=0,limitNew:any=0){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"progressTasks"+"/"+userId+"/"+getDataByUser+"/"+orderId+"/"+departmentId+"/"+assigned+"/"+limitNew).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async finishedTasks(userId:any=0,getDataByUser:any=0,orderId:any=0,departmentId:any=0,assigned:any=0,limitNew:any=0){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"finishedTasks"+"/"+userId+"/"+getDataByUser+"/"+orderId+"/"+departmentId+"/"+assigned+"/"+limitNew).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async onHoldTasks(userId:any=0,getDataByUser:any=0,orderId:any=0,departmentId:any=0,assigned:any=0,limitNew:any=0){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"onHoldTasks"+"/"+userId+"/"+getDataByUser+"/"+orderId+"/"+departmentId+"/"+assigned+"/"+limitNew).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async replySeenByUser(replyId:any,userId:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"replySeenByUser"+"/"+replyId+"/"+userId,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async requestReopen(requestId:any,userId:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"requestReopen"+"/"+requestId+"/"+userId,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async taskProceed(taskId:any,userId:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"taskProceed"+"/"+taskId+"/"+userId,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async taskProgress(taskId:any,userId:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"taskProgress"+"/"+taskId+"/"+userId,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async taskHold(taskId:any,userId:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"taskHold"+"/"+taskId+"/"+userId,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async taskDelete(taskId:any,userId:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"taskDelete"+"/"+taskId+"/"+userId,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  async requestStarat(requestId:any,userId:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"requestStarat"+"/"+requestId+"/"+userId,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async getAllRequest(userId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"getAllRequest/"+userId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async getAllRequestUserSelect(userId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"getAllRequestUserSelect/"+userId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async requestApproval(requestId:any,userId:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"requestApproval"+"/"+requestId+"/"+userId,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async requestCancel(requestId:any,reason:any,userId:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"requestCancel"+"/"+requestId+"/"+reason+"/"+userId,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async addTask(requestId:any,orderId:any,userId:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"addTask"+"/"+requestId+"/"+orderId+"/"+userId,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async requestRefusal(requestId:any,userId:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"requestRefusal"+"/"+requestId+"/"+userId,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async showAdmin(requestId:any,userId:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"showAdmin"+"/"+requestId+"/"+userId,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async selectUserRequests(requestId:any){
    return new Promise(resolve => {
      this.http.get(this.baseUrl+'/'+"selectUserRequests"+"/"+requestId).subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async taskfinished(userId:any,taskId:any,dateStart:any,dateEnd:any,workingHours:any,technicianName:any,findings:any,corrections:any,replacedParts:any,notes:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"addRequests"+"/"+userId+"/"+taskId+"/"+dateStart+"/"+dateEnd+"/"+workingHours+"/"+technicianName+"/"+findings+"/"+corrections+"/"+replacedParts+"/"+notes,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async requestfinished(userId:any,requestId:any,findings:any,corrections:any,replacedParts:any,notes:any,dateEnd:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"requestfinished"+"/"+userId+"/"+requestId+"/"+findings+"/"+corrections+"/"+replacedParts+"/"+notes+"/"+dateEnd,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async addRequests(departmentId:any,machineNumberVal:any,machineDescriptionVal:any,machineStatusVal:any,faultDescriptionVal:any,urgencyVal:any,userId:any,allowShowGeneral:any=0){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"addRequests"+"/"+departmentId+"/"+machineNumberVal+"/"+machineDescriptionVal+"/"+machineStatusVal+"/"+faultDescriptionVal+"/"+urgencyVal+"/"+userId+"/"+allowShowGeneral,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async orderReplyAdd(userId:any,departmentId:any,requestId:any,selectTypeToSened:any,selectUserWork:any=0,replyMsg:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"orderReplyAdd"+"/"+userId+"/"+departmentId+"/"+requestId+"/"+selectTypeToSened+"/"+selectUserWork+"/"+replyMsg,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async editRequests(requestId:any,departmentId:any,machineNumberVal:any,machineDescriptionVal:any,machineStatusVal:any,faultDescriptionVal:any,urgencyVal:any,userId:any,allowShowGeneral:any=0){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"editRequests"+"/"+requestId+"/"+departmentId+"/"+machineNumberVal+"/"+machineDescriptionVal+"/"+machineStatusVal+"/"+faultDescriptionVal+"/"+urgencyVal+"/"+userId+"/"+allowShowGeneral,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  async addReply(userId:any,selectUser:any,replysContent:any,requestId:any,departmentId:any){
    return new Promise(resolve => {
      this.http.post(this.baseUrl+'/'+"addReply"+"/"+userId+"/"+selectUser+"/"+replysContent+"/"+requestId+"/"+departmentId,"").subscribe(data => {
        return this.result = resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
