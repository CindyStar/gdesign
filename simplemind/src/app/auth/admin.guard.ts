import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../serve/global.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private global: GlobalService,
    private router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }
  checkLogin(): boolean {
    // 判断本地有没有token
    // 如果token有值，表示登录成功，继续跳转，否则跳转到首页
    if (this.global.user.Jurisdiction === 1) {
      return true;
    }
    this.router.navigateByUrl('/adlogin');
    return false;
  }

}
