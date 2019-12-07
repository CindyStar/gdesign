import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// 登录页
import { LayoutComponent } from './views/layout/layout.component';
import { LoginComponent } from './views/login/login.component';
import { IndexComponent } from './views/index/index.component';
import { TipsgroupComponent } from './views/tipsgroup/tipsgroup.component';
import { CenterComponent } from './views/center/center.component';
import { ReleaseComponent } from './views/release/release.component';
import { PageComponent } from './views/page/page.component';
import { SettingComponent } from './views/setting/setting.component';
import { AuthGuard } from './auth/auth.guard';
import { PagelistComponent } from './components/pagelist/pagelist.component';

import { UserlistComponent } from './admin/userlist/userlist.component';
import { CallbackComponent } from './admin/callback/callback.component';
import { TypelistComponent } from './admin/typelist/typelist.component';
import { AdlayoutComponent } from './admin/adlayout/adlayout.component';
import { AdloginComponent } from './admin/adlogin/adlogin.component';
import { PageadminComponent } from './admin/pageadmin/pageadmin.component';
import { AdminGuard } from './auth/admin.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
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
        canActivate: [AuthGuard],
        component: TipsgroupComponent
      },
      {
        path: 'setting',
        canActivate: [AuthGuard],
        component: SettingComponent
      },
      {
        path: 'center/:id',
        canActivate: [AuthGuard],
        component: CenterComponent
      },
      {
        path: 'release',
        canActivate: [AuthGuard],
        component: ReleaseComponent
      },
      {
        path: 'page/:id',
        canActivate: [AuthGuard],
        component: PageComponent
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'adlogin',
    component: AdloginComponent,
  },
  {
    path: 'admin',
    component: AdlayoutComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: PageadminComponent
      },
      {
        path: 'userlist',
        component: UserlistComponent
      },
      {
        path: 'callback',
        component: CallbackComponent
      },
      {
        path: 'typelist',
        component: TypelistComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
