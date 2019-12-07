import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd, NavigationStart } from "@angular/router";//路由传参用到
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClientService } from '../../serve/http-client.service';
import { GlobalService } from '../../serve/global.service';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  typeloading: boolean = true;
  tipsgroup = [];
  pagelist = [];
  type = null;
  initLoading = true;
  pageSize = 5;
  pageIndex = 1;
  hasMore = true;
  constructor(
    private global: GlobalService,
    private http: HttpClientService,
    private activateInfo: ActivatedRoute,
    private message: NzMessageService,
    private router: Router) {
    if (this.router.url.includes('index')) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.type = this.activateInfo.snapshot.params.type || null;
          this.getList();
        }
      });
    }
  }

  ngOnInit() {
    this.getTips();
  }

  showMore() {
    this.pageIndex++;
    this.getList();
  }

  getList() {
    let obj = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    if (this.type) {
      obj['aclass'] = this.type;
    }
    this.http.get('/apis/article', obj, res => {
      if (res.code !== 200) {
        this.message.error('网络错误,请稍后再试!')
      }
      if (this.type) {
        this.pagelist = res['data'];
      } else {
        this.pagelist.push(...res['data']);
      }
      if (res['data'].length < this.pageSize) {
        this.hasMore = false;
      }
      this.initLoading = false;
    });
  }

  getTips() {
    this.http.get('/apis/types', {}, res => {
      if (res.code === 200) {
        this.tipsgroup = res['data'];
      } else {
        this.message.error('网络错误,请稍后再试!')
      }
    });
  }

}
