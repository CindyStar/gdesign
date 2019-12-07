import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../serve/http-client.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-pageadmin',
  templateUrl: './pageadmin.component.html',
  styleUrls: ['./pageadmin.component.scss']
})
export class PageadminComponent implements OnInit {

  pageSize = 10;
  pageIndex = 1;
  pagelist = [];
  initLoading = true;
  constructor(
    private http: HttpClientService,
    private msg: NzMessageService
  ) { }

  ngOnInit() {
    this.getPagelist();
  }

  getPagelist() {
    let obj = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    this.http.get('/apis/article', obj, res => {
      if (res.code === 200) {
        console.log(res.data)
        this.pagelist = res.data;
      } else {
        this.msg.error('网络错误,请稍后再试!')
      }
      this.initLoading = false;
    });
  }

  showMore() {
    this.pageIndex++;
    this.getPagelist();
  }

  delete(id) {
    this.http.delete('/apis/article/' + id, {}, res => {
      if (res.code === 200) {
        this.msg.success('删除成功');
        this.getPagelist();
      }
    })
  }

}
