import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClientService } from '../../serve/http-client.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../serve/global.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-adlogin',
  templateUrl: './adlogin.component.html',
  styleUrls: ['./adlogin.component.scss']
})
export class AdloginComponent implements OnInit {
  validateForm: FormGroup;

  // error success validating warning
  passwordVisible = false;
  constructor(
    private fb: FormBuilder,
    private http: HttpClientService,
    private router: Router,
    private global: GlobalService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      uaccount: [null, [Validators.required]],
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
    this.http.post('/apis/login', val, res => {
      if (res.code === 200 && res.data.Jurisdiction === 1) {
        this.global.updateUser(res.data);
        this.router.navigate(['/admin']);
        this.message.success('登录成功!');
      } else {
        this.message.error('当前账号不可登录后台,请联系管理员申请账号!');
      }
    })
  }

}
