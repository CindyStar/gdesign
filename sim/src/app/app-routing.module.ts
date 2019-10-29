import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// 登录页
import { LoginComponent } from './views/login/login.component';
import { IndexComponent } from './views/index/index.component';
import { TipsgroupComponent } from './views/tipsgroup/tipsgroup.component';
import { CenterComponent } from './views/center/center.component';
import { ReleaseComponent } from './views/release/release.component';
import { PageComponent } from './views/page/page.component';
import { SettingComponent } from './views/setting/setting.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    children: [
      {
        path: '',
        component: IndexComponent
      },
      {
        path: ':type',
        component: IndexComponent
      }
    ]
  },
  {
    path: 'tipsgroup',
    component: TipsgroupComponent
  },
  {
    path: 'setting',
    component: SettingComponent
  },
  {
    path: 'center/:id',
    component: CenterComponent
  },
  {
    path: 'release',
    component: ReleaseComponent
  },
  {
    path: 'page/:id',
    component: PageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
