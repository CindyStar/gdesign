import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  registerForm: FormGroup;
  isLogin = true;
  getVercode = '获取验证码';
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      uaccount: [null, [Validators.required]],
      upassword: [null, [Validators.required]],
      // remember: [true]
    });
    this.registerForm = this.fb.group({
      uname: [null, [Validators.required]],
      uphone: [null, [Validators.required]],
      // captcha: [null, [Validators.required]],
      upassword: [null, [Validators.required]],
      // remember: [true]
    });
  }

  submitvalidateForm(): void {
    for (const keys of Object.keys(this.validateForm.controls)) {
      this.validateForm.get(keys).markAsDirty();
      this.validateForm.get(keys).updateValueAndValidity();
    }

    const val = this.validateForm.value;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    this.http.post('/apis/login', val, httpOptions)
      .toPromise()    // 将可观察对象转为承诺，接下来按照承诺的方式处理。
      .then(response => {
        console.log(response);
        // let data = response.json();
        // if (data.is_ok == 2) {
        // let result: string = data.rs;
        // console.log(result);
        // return Promise.resolve(result);
        // }
        // return Promise.reject("false");
      }).catch(error => {
        console.log(error);
        // return Promise.reject("false");
      });
  }
  submitregisterForm(): void {
    for (const keys of Object.keys(this.registerForm.controls)) {
      this.validateForm.get(keys).markAsDirty();
      this.validateForm.get(keys).updateValueAndValidity();
    }
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
}
