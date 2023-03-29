import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgotpasssword',
    loadChildren: () => import('./pages/forgotpasssword/forgotpasssword.module').then( m => m.ForgotpassswordPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },

  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./pages/changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
  {
    path: 'team',
    loadChildren: () => import('./pages/team/team.module').then( m => m.TeamPageModule)
  },
  {
    path: 'addrequest',
    loadChildren: () => import('./pages/addrequest/addrequest.module').then( m => m.AddrequestPageModule)
  },
  {
    path: 'requestdetails',
    loadChildren: () => import('./pages/requestdetails/requestdetails.module').then( m => m.RequestdetailsPageModule)
  },
  {
    path: 'requests',
    loadChildren: () => import('./pages/requests/requests.module').then( m => m.RequestsPageModule)
  },
  {
    path: 'jobsdetails',
    loadChildren: () => import('./pages/jobsdetails/jobsdetails.module').then( m => m.JobsdetailsPageModule)
  },
  {
    path: 'myrequests',
    loadChildren: () => import('./pages/myrequests/myrequests.module').then( m => m.MyrequestsPageModule)
  },
  {
    path: 'approvedrequests',
    loadChildren: () => import('./pages/approvedrequests/approvedrequests.module').then( m => m.ApprovedrequestsPageModule)
  },
  {
    path: 'finishedrequests',
    loadChildren: () => import('./pages/finishedrequests/finishedrequests.module').then( m => m.FinishedrequestsPageModule)
  },
  {
    path: 'canceledrequests',
    loadChildren: () => import('./pages/canceledrequests/canceledrequests.module').then( m => m.CanceledrequestsPageModule)
  },
  {
    path: 'processingrequests',
    loadChildren: () => import('./pages/processingrequests/processingrequests.module').then( m => m.ProcessingrequestsPageModule)
  },
  {
    path: 'allrequest',
    loadChildren: () => import('./pages/allrequest/allrequest.module').then( m => m.AllrequestPageModule)
  },
  {
    path: 'newrequest',
    loadChildren: () => import('./pages/newrequest/newrequest.module').then( m => m.NewrequestPageModule)
  },
  {
    path: 'alltasks',
    loadChildren: () => import('./pages/alltasks/alltasks.module').then( m => m.AlltasksPageModule)
  },
  {
    path: 'newtasks',
    loadChildren: () => import('./pages/newtasks/newtasks.module').then( m => m.NewtasksPageModule)
  },
  {
    path: 'progresstasks',
    loadChildren: () => import('./pages/progresstasks/progresstasks.module').then( m => m.ProgresstasksPageModule)
  },
  {
    path: 'onholdtasks',
    loadChildren: () => import('./pages/onholdtasks/onholdtasks.module').then( m => m.OnholdtasksPageModule)
  },
  {
    path: 'finishedtasks',
    loadChildren: () => import('./pages/finishedtasks/finishedtasks.module').then( m => m.FinishedtasksPageModule)
  },
  {
    path: 'addnewtask',
    loadChildren: () => import('./pages/addnewtask/addnewtask.module').then( m => m.AddnewtaskPageModule)
  },
  {
    path: 'taskdetails',
    loadChildren: () => import('./pages/taskdetails/taskdetails.module').then( m => m.TaskdetailsPageModule)
  },
  {
    path: 'taskfinished',
    loadChildren: () => import('./pages/taskfinished/taskfinished.module').then( m => m.TaskfinishedPageModule)
  },
  {
    path: 'requestsfinished',
    loadChildren: () => import('./pages/requestsfinished/requestsfinished.module').then( m => m.RequestsfinishedPageModule)
  },
  {
    path: 'first',
    loadChildren: () => import('./pages/first/first.module').then( m => m.FirstPageModule)
  },
  {
    path: 'pushnotification',
    loadChildren: () => import('./pages/pushnotification/pushnotification.module').then( m => m.PushnotificationPageModule)
  },
  {
    path: 'editrequest',
    loadChildren: () => import('./pages/editrequest/editrequest.module').then( m => m.EditrequestPageModule)
  },
  {
    path: 'correspondence',
    loadChildren: () => import('./pages/correspondence/correspondence.module').then( m => m.CorrespondencePageModule)
  },
  {
    path: 'addnewtaskorder',
    loadChildren: () => import('./pages/addnewtaskorder/addnewtaskorder.module').then( m => m.AddnewtaskorderPageModule)
  },  {
    path: 'addnewtaskuser',
    loadChildren: () => import('./pages/addnewtaskuser/addnewtaskuser.module').then( m => m.AddnewtaskuserPageModule)
  },
  {
    path: 'allrequestusers',
    loadChildren: () => import('./pages/allrequestusers/allrequestusers.module').then( m => m.AllrequestusersPageModule)
  },
  {
    path: 'correspondencetasks',
    loadChildren: () => import('./pages/correspondencetasks/correspondencetasks.module').then( m => m.CorrespondencetasksPageModule)
  },
  {
    path: 'incomingreplies',
    loadChildren: () => import('./pages/incomingreplies/incomingreplies.module').then( m => m.IncomingrepliesPageModule)
  },
  {
    path: 'onerequest',
    loadChildren: () => import('./pages/onerequest/onerequest.module').then( m => m.OnerequestPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
