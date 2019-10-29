import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { Router } from "@angular/router";//路由传参用到
import { ActivatedRoute, Params } from '@angular/router';//获取路由传参用到

import { IndexComponent } from './views/index/index.component';
import { HeaderComponent } from './components/header/header.component';
import { PagelistComponent } from './components/pagelist/pagelist.component';
import { PageComponent } from './views/page/page.component';
import { TipsgroupComponent } from './views/tipsgroup/tipsgroup.component';
import { ReleaseComponent } from './views/release/release.component';
import { CenterComponent } from './views/center/center.component';
import { SettingComponent } from './views/setting/setting.component';

import { QuillModule } from 'ngx-quill';
import { TransHtmlPipe } from './pipe/trans-html.pipe';

registerLocaleData(zh);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    HeaderComponent,
    PagelistComponent,
    PageComponent,
    TipsgroupComponent,
    ReleaseComponent,
    CenterComponent,
    SettingComponent,
    TransHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    QuillModule.forRoot()
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, QuillModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
