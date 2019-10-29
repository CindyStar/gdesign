import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";//路由传参用到
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClientService } from '../../serve/http-client.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  tipsgroup = [];
  pagelist = [];
  type = '';
  constructor(private http: HttpClientService,
    private activateInfo: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getList();
    this.getTips();
    this.activateInfo.params.subscribe(queryParams => {
      if (queryParams.type) {
        this.type = queryParams.type;
      }
    })
  }

  getList() {
    this.http.get('/apis/article', {}, res => {
      console.log('data', res);
      this.pagelist = res['data'];
    });
  }

  getTips() {
    this.http.get('/apis/types', {}, res => {
      console.log('data', res);
      this.tipsgroup = res['data'];
    });
  }

}
