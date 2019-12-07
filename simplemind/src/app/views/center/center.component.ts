import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { GlobalService } from '../../serve/global.service';
import { HttpClientService } from '../../serve/http-client.service';
import { FormBuilder } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class CenterComponent implements OnInit {

  user: object;
  pagelist = [];
  userId: any;
  initLoading = false;

  pageSize = 5;
  pageIndex = 1;
  hasMore = true;

  constructor(
    private msg: NzMessageService,
    private global: GlobalService,
    private http: HttpClientService,
    private fb: FormBuilder,
    private route: Router,
    private router: ActivatedRoute
  ) {
    if (this.route.url.includes('center/')) {
      this.route.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.initLoading = true;
          this.userId = this.router.snapshot.params.id;
          this.getPagelist();
        }
      });
    }
  }

  ngOnInit() {
  }
  showMore() {
    this.pageIndex++;
    this.getPagelist();
  }
  getPagelist() {
    let obj = {
      _id: this.userId,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    this.http.get('/apis/article', obj, res => {
      if (res.code === 200) {
        console.log(res.data)
        this.pagelist.push(...res.data);
        this.user = this.pagelist[0].uid;
      } else {
        this.msg.error('网络错误,请稍后再试!')
      }
      if (res.data.length < this.pageSize) {
        this.hasMore = false;
      }
      this.initLoading = false;
    });
  }

}
