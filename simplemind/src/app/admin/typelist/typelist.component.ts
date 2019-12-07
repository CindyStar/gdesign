import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClientService } from '../../serve/http-client.service';

@Component({
  selector: 'app-typelist',
  templateUrl: './typelist.component.html',
  styleUrls: ['./typelist.component.scss']
})
export class TypelistComponent implements OnInit {
  modalId: any;
  isVisible: boolean;
  typelist: any;
  pageSize = 10;
  pageIndex = 1;
  initLoading = true;
  newTips: string;
  newColor: string;
  constructor(
    private message: NzMessageService,
    private http: HttpClientService
  ) { }

  ngOnInit() {
    this.getType();
  }

  getType() {
    this.http.get('/apis/types', {}, res => {
      if (res.code === 200) {
        this.typelist = res['data'];
        this.initLoading = false;
      } else {
        this.message.error('网络错误,请稍后再试!')
      }
    });
  }
  showModal(data): void {
    this.isVisible = true;
    console.log(data)
    this.modalId = data._id;
    this.newTips = data.tname;
    this.newColor = data.tcolor;
  }
  handleOk(): void {
    const val = {
      tname: this.newTips.trim(),
      tcolor: this.newColor
    };
    if (this.newTips.trim().length === 0) {
      this.message.error('分类名称不能为空!');
      return;
    }
    if (this.modalId) {
      this.setType(val);
    } else {
      this.addType(val);
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  addType(val) {
    this.http.post('/apis/types', val, res => {
      this.isVisible = false;
      this.modalId = '';
      if (res.code === 200) {
        this.message.success('添加成功');
        this.getType();
      } else if (res.code) {
        this.message.error('添加失败，请重试!');
      }
    })
  }
  setType(val) {
    this.http.put('/apis/types/' + this.modalId, val, res => {
      this.isVisible = false;
      this.modalId = null;
      if (res.code === 200) {
        this.message.success('修改成功');
        this.getType();
      } else if (res.code) {
        this.message.error('修改失败，请重试!');
      }
    })
  }

  showMore() {
    this.pageIndex++;
    this.getType();
  }

  delete(id) {
    this.http.delete('/apis/types/' + id, {}, res => {
      this.message.success(res);
      this.getType();
    })
  }
}
