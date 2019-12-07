import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { BehaviorSubject, Observer, Observable, from } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  user: any;
  baseUrl = 'http://localhost:3000/';
  constructor(
    private http: HttpClientService,
    private router: Router,
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  updateUser(data) {
    sessionStorage.setItem('access_token', data['_id']);
    sessionStorage.setItem('user', JSON.stringify(data));
    this.user = data;
  }

  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }

}
