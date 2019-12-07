import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClientService } from '../../serve/http-client.service';
import { GlobalService } from '../../serve/global.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  breplay: any;
  cbId: any;
  isVisible: boolean;
  cblist = [];
  typelist = [];
  cbloading = true;
  pageSize = 10;
  pageIndex = 1;
  constructor(
    private message: NzMessageService,
    private global: GlobalService,
    private http: HttpClientService
  ) { }

  ngOnInit() {
    // this.getCallType();
    this.getCallBack();
  }

  getCallType() {
    this.http.get('/apis/calltype', {}, res => {
      this.typelist = res;
      this.cbloading = false;
    })
  }
  getCallBack() {
    this.http.get('/apis/callback', {}, res => {
      this.cblist = res;
      this.cbloading = false;
    })
  }
  showMore() {
    this.pageIndex++;
    this.getCallBack();
  }
  delete(id) {
    this.http.delete('/apis/types/' + id, {}, res => {
      this.message.success(res);
      this.getCallBack();
    })
  }
  showModal(data): void {
    this.isVisible = true;
    this.cbId = data._id;
    console.log(data)
  }
  handleOk(): void {
    this.http.put('/apis/callback/' + this.cbId, { breplay: this.breplay }, res => {
      if (res.error) {
        this.message.error('处理失败,请稍后重新处理!')
      } else {
        this.isVisible = false;
        this.message.success('处理成功!');
        this.getCallBack();
      }
    })
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
