import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClientService } from '../../serve/http-client.service';
import { GlobalService } from '../../serve/global.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  judId: any;
  userId: any;
  isVisible: boolean;
  pageSize = 10;
  pageIndex = 1;
  initLoading = true;
  userlist: any = [{
    tname: 1
  }];
  constructor(
    private global: GlobalService,
    private message: NzMessageService,
    private http: HttpClientService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.http.get('/apis/user', {}, res => {
      this.userlist = res;
      this.initLoading = false;
      this.userlist.forEach(el => {
        this.http.get('/apis/article', { _id: el._id }, res => {
          if (res.code === 200) {
            el.articles = res.data.length;
          }
        })
      })
    })
  }

  showModal(data): void {
    this.isVisible = true;
    this.userId = data._id;
    this.judId = data.Jurisdiction;
    console.log(this.judId);
  }
  handleOk(): void {
    this.http.put('/apis/user/' + this.userId, { Jurisdiction: this.judId }, res => {
      this.isVisible = false;
      if (res.code === 200) {
        this.message.success('修改成功');
        this.getUser();
      } else if (res.code) {
        this.message.error('修改失败，请重试!');
      }
    })
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  showMore() {
    this.pageIndex++;
    this.getUser();
  }

  delete(id) {
    this.http.delete('/apis/user/' + id, {}, res => {
      this.message.success(res);
      this.getUser();
    })
  }
}
