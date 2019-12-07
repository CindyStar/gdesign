import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientService } from '../../serve/http-client.service';
import { GlobalService } from '../../serve/global.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  UserId: any;
  uphoneTips: string = "请输入11位手机号!";
  uaccountTips = "请输入6位以上字母加数字组合!";
  unameTips = "请输入昵称!";
  upasswordTips = "请输入6-12位字母加数字组合!";
  validateForm: FormGroup;
  registerForm: FormGroup;
  isLogin = true;
  getVercode = '获取验证码';

  // error success validating warning
  unameStatus = 'warning';
  uphoneStatus = 'warning';
  uaccountStatus = 'warning';
  upassworsStatus = 'warning';
  passwordVisible = false;
  isReg = false;

  isVisible = false;
  baseInfoForm: FormGroup;
  oldPdIcon = false;
  newPdIcon = false;
  confirPdIcon = false;
  oldPdStatus = 'warning';
  newPdStatus = 'warning';
  confirPdStatus = 'warning';
  accountStatus = 'warning';
  oldPdTips = '请输入6-12位字母加数字组合!'
  newPdTips = '请输入6-12位字母加数字组合!'
  confirPdTips = '请输入6-12位字母加数字组合!'
  accountTips = '请输入您账号!'
  constructor(
    private fb: FormBuilder,
    private http: HttpClientService,
    private router: Router,
    private global: GlobalService,
    private message: NzMessageService) { }

  ngOnInit() {
    this.baseInfoForm = this.fb.group({
      uaccount: [null, [Validators.required, Validators.pattern(/^[0-9A-Za-z]{6,}$/)]],
      oldPassword: [null, [Validators.required, Validators.pattern(/^[0-9A-Za-z]{6,12}$/)]],
      newPassword: [null, [Validators.required, Validators.pattern(/^[0-9A-Za-z]{6,12}$/)]],
      upassword: [null, [Validators.required, Validators.pattern(/^[0-9A-Za-z]{6,12}$/)]],
    })
    this.validateForm = this.fb.group({
      uaccount: [null, [Validators.required]],
      upassword: [null, [Validators.required]],
      // remember: [true]
    });
    this.registerForm = this.fb.group({
      uname: [null, [Validators.required]],
      uaccount: [null, [Validators.required, Validators.pattern(/^[0-9A-Za-z]{6,}$/)]],
      uphone: [null, [Validators.required, Validators.pattern(/^1[3456789]\d{9}$/)]],
      // captcha: [null, [Validators.required]],
      upassword: [null, [Validators.required, Validators.pattern(/^[0-9A-Za-z]{6,12}$/)]],
      // remember: [true]
    });
    this.getUphone();
    this.getuname();
    this.getuaccount();
    this.registerForm.get('upassword').valueChanges.subscribe(res => {
      if (this.registerForm.get('upassword').invalid) {
        this.upassworsStatus = 'error';
      }
      if (this.registerForm.get('upassword').valid) {
        this.upassworsStatus = ' success';
      }
    })
    this.registerForm.valueChanges.subscribe(res => {
      this.isReg = true;
    })
    this.baseInfoForm.valueChanges.subscribe(res => {
      const newPd = this.baseInfoForm.get('newPassword');
      const rePd = this.baseInfoForm.get('upassword');
      if (newPd.valid) {
        this.newPdStatus = 'success';
      } else if (newPd.invalid && newPd.dirty) {
        this.newPdStatus = 'error'
      } else {
        this.newPdStatus = 'warning'
      }
      if (rePd.valid && rePd.value === newPd.value) {
        this.confirPdStatus = 'success';
      } else if (rePd.value !== newPd.value) {
        this.confirPdTips = '两次密码输入不一致!'
        this.confirPdStatus = 'error'
      } else if (rePd.invalid && rePd.dirty) {
        this.confirPdStatus = 'error'
      } else {
        this.confirPdStatus = 'warning'
      }
    })
  }
  getUserId() {
    const ctrl = this.baseInfoForm.get('uaccount');
    this.UserId = null;
    if (ctrl.invalid && ctrl.dirty) {
      this.accountStatus = 'error'
    }
    if (ctrl.valid) {
      this.accountStatus = 'validating'
      this.http.get('/apis/getUserId/' + ctrl.value, {}, res => {
        if (res.code === 200 && res.data) {
          this.accountStatus = 'success'
          this.UserId = res.data;
        } else {
          this.accountStatus = 'error'
          this.accountTips = '账号不存在';
        }
      })
    }
  }
  getPassword() {
    const ctrl = this.baseInfoForm.get('oldPassword');
    if (!this.UserId) {
      this.oldPdStatus = 'error'
      this.oldPdTips = '请输入账号!';
    } else if (ctrl.invalid && ctrl.dirty) {
      this.oldPdStatus = 'error'
    } else if (ctrl.valid) {
      this.oldPdStatus = 'validating'
      this.http.get('/apis/getPassword/' + ctrl.value, { _id: this.UserId }, res => {
        if (res.data) {
          this.oldPdStatus = 'success'
        } else {
          this.oldPdStatus = 'error'
          this.oldPdTips = '密码错误!';
        }
      })
    }
  }
  getUphone() {
    const ctrl = this.registerForm.get('uphone');
    if (ctrl.invalid && ctrl.dirty) {
      this.uphoneStatus = 'error'
    }
    if (ctrl.valid) {
      this.uphoneStatus = 'validating'
      this.http.get('/apis/register/uphone/' + ctrl.value, {}, res => {
        if (res.code === 200) {
          this.uphoneStatus = 'success'
        } else {
          this.uphoneStatus = 'error'
          this.uphoneTips = '手机号已注册!请更换手机号!';
        }
      })
    }
  }
  getuname() {
    const ctrl = this.registerForm.get('uname');
    if (ctrl.invalid && ctrl.dirty) {
      this.unameStatus = 'error'
    }
    if (ctrl.valid) {
      this.unameStatus = 'validating'
      this.http.get('/apis/register/uname/' + ctrl.value, {}, res => {
        if (res.code === 200) {
          this.unameStatus = 'success'
        } else {
          this.unameStatus = 'error'
          this.unameTips = '此昵称已存在,请勿重复注册!';
        }
      })
    }
  }
  getuaccount() {
    const ctrl = this.registerForm.get('uaccount');
    if (ctrl.invalid && ctrl.dirty) {
      this.uaccountStatus = 'error'
    }
    if (ctrl.valid) {
      this.uaccountStatus = 'validating'
      this.http.get('/apis/register/uaccount/' + ctrl.value, {}, res => {
        if (res.code === 200) {
          this.uaccountStatus = 'success'
        } else {
          this.uaccountStatus = 'error'
          this.uaccountTips = '此账号已存在,请勿重复注册!';
        }
      })
    }
  }

  submitvalidateForm(): void {
    for (const keys of Object.keys(this.validateForm.controls)) {
      this.validateForm.get(keys).markAsDirty();
      this.validateForm.get(keys).updateValueAndValidity();
    }
    const val = this.validateForm.value;
    this.http.post('/apis/login', val, res => {
      if (res.code === 200) {
        this.global.updateUser(res.data);
        this.router.navigate(['/user/index']);
        this.message.success('登录成功!');
      } else {
        this.message.error(res.data);
      }
    })
  }
  submitregisterForm(): void {
    for (const keys of Object.keys(this.registerForm.controls)) {
      this.registerForm.get(keys).markAsDirty();
      this.registerForm.get(keys).updateValueAndValidity();
    }
    const val = this.registerForm.value;
    console.log(val);
    this.http.post('/apis/register', val, res => {
      if (res.code === 200) {
        this.isLogin = true;
        this.message.success('注册成功!');
      } else {
        this.message.error(res.data);
      }
    })
  }
  toregister(): void {
    this.isLogin = false;
  }
  tologin(): void {
    this.isLogin = true;
  }
  getCaptcha(): void {
    this.getVercode = '重新获取(59S)';
  }
  showModal(): void {
    this.isVisible = true;
    this.getUserId();
  }
  handleCancel() {
    this.isVisible = false;
    this.UserId = null;
    this.baseInfoForm.reset();
  }
  handleOk() {
    for (const i in this.baseInfoForm.controls) {
      this.baseInfoForm.controls[i].markAsDirty();
      this.baseInfoForm.controls[i].updateValueAndValidity();
    }
    if (this.baseInfoForm.valid) {
      const value = this.baseInfoForm.value;
      this.http.put('/apis/user/' + this.UserId, value, res => {
        if (res.code === 200) {
          this.isVisible = false;
          this.UserId = null;
          this.message.success('密码修改成功！请重新登录！')
        } else {
          this.message.success('网络错误，请重试！')
        }
      })
    }
  }
}
