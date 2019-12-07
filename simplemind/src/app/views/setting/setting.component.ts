import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile, UploadXHRArgs } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { GlobalService } from '../../serve/global.service';
import { HttpClientService } from '../../serve/http-client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  callbackVisiable: boolean;
  calltype: any;
  userId: any;
  loading = false;
  avatarUrl: string;
  uploadUrl: string;

  baseInfoForm: FormGroup;
  // error success validating warning
  unameStatus = 'success';
  upassworsStatus = 'success';
  passwordVisible = false;
  upassword = '';
  baseInfoSb = true;
  baseLoading = false;

  pagelist = [];
  initLoading = true;

  pageSize = 5;
  pageIndex = 1;
  hasMore = true;

  callbackForm: FormGroup;
  cbList: any = [];
  cbloading = true;
  constructor(
    private msg: NzMessageService,
    private global: GlobalService,
    private http: HttpClientService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userId = this.global.user['_id'];
    this.avatarUrl = this.global.user['uavatar'];
    this.uploadUrl = '/apis/uavatar/' + this.userId;
    this.baseInfoChange();
    this.getPagelist();
    this.getPassword();
    this.getCallType();
    this.getCallBack();
    this.callbackForm = this.fb.group({
      uid: [this.userId],
      bcontent: [null, [Validators.required]],
      btype: [, [Validators.required]]
    })
  }

  getCallType() {
    this.http.get('/apis/calltype', {}, res => {
      this.calltype = res;
      this.cbloading = false;
      this.callbackForm.get('btype').setValue(res[0]._id);
      console.log(res);
    })
  }
  getCallBack() {
    this.http.get('/apis/callback', { id: this.userId }, res => {
      this.cbList = res;
      this.cbloading = false;
      this.callbackForm.get('btype').setValue(res[0]._id);
      console.log(res);
    })
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
        this.pagelist.push(...res['data']);
        this.initLoading = false;
      } else {
        this.msg.error('网络错误,请稍后再试!')
      }
      if (res.data.length < this.pageSize) {
        this.hasMore = false;
      }
    });
  }
  getPassword() {
    this.http.get('/apis/password/' + this.userId, {}, res => {
      if (res.code === 200) {
        this.upassword = res.data['upassword'];
        this.baseInfoForm.get('upassword').setValue(this.upassword)
      }
    })
  }

  baseInfoChange() {
    this.baseInfoForm = this.fb.group({
      uname: [this.global.user.uname, [Validators.required]],
      upassword: [this.upassword, [Validators.required]]
    })
    this.baseInfoForm.valueChanges.subscribe(res => {
      if (res.uname === this.global.user.uname && res.upassword === this.upassword) {
        this.baseInfoSb = true;
      } else {
        this.baseInfoSb = false;
      }
    })
    this.baseInfoForm.get('uname').valueChanges.subscribe(res => {
      if (res === '') {
        this.unameStatus = 'error';
      } else {
        this.unameStatus = 'success';
      }
    })
    this.baseInfoForm.get('upassword').valueChanges.subscribe(res => {
      if (res === '') {
        this.upassworsStatus = 'error';
      } else {
        this.upassworsStatus = 'success';
      }
    })
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.msg.error('请上传jpg格式的图片');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('请上传大小小于2M的图片');
        observer.complete();
        return;
      }
      observer.next(isJPG && isLt2M);
      observer.complete();
    });
  };

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        const resUrl = info.file.response.data;
        info.file.thumbUrl = resUrl;
        this.avatarUrl = resUrl;
        this.changeUser({ uavatar: resUrl })
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }
  submitBaseForm() {
    this.unameStatus = 'validating';
    this.upassworsStatus = 'validating';
    this.baseLoading = true;
    if (this.baseInfoForm.invalid) {
      return;
    }
    const value = this.baseInfoForm.value;
    this.changeUser(value);
  }

  changeUser(data) {
    this.http.put('/apis/user/' + this.userId, data, res => {
      this.baseLoading = false;
      if (res.code === 200) {
        this.global.updateUser(res.data);
        this.msg.success('修改成功!');
        this.unameStatus = 'success';
        this.upassworsStatus = 'success';
        this.baseInfoSb = true;
      } else {
        this.msg.error('信息修改失败!');
        this.unameStatus = 'error';
        this.upassworsStatus = 'error';
        this.baseInfoSb = false;
      }
    })
  }
  getChildEvent(event) {
    this.getPagelist();
  }
  submitcallbackForm() {
    if (this.callbackForm.valid) {
      const val = this.callbackForm.value;
      this.http.post('/apis/callback', val, res => {
        if (res.errors) {
          this.msg.error('提交失败请重新提交')
        } else {
          this.msg.success('提交成功');
          this.callbackForm.reset();
          this.callbackVisiable = false;
          this.getCallBack();
        }
      })
    }
  }
  showCallback() {
    this.callbackVisiable = true;
  }
  handleCancel() {
    this.callbackVisiable = false;
  }
}
