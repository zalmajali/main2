import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HttpClient} from "@angular/common/http";
import { IonicStorageModule } from '@ionic/storage';

import { Network } from '@ionic-native/network/ngx';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Globalization } from '@ionic-native/globalization/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },CallNumber,Network,SplashScreen,Globalization,FileTransfer,File,Chooser,FilePath,InAppBrowser,HTTP,FileOpener],
  bootstrap: [AppComponent],
})

export class AppModule {}
