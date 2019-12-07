import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../serve/global.service';
import { HttpClientService } from '../serve/http-client.service';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private global: GlobalService,
    private message: NzMessageService,
    private http: HttpClientService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    // 判断本地有没有token
    const token = sessionStorage.getItem('access_token');
    const user = sessionStorage.getItem('user');
    // 如果token有值，表示登录成功，继续跳转，否则跳转到首页
    if (token && user) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }

}
