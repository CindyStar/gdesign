import { Component, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditorConfig } from 'editor-config';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { HttpClientService } from '../../serve/http-client.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
declare var editormd: any;
@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})

export class ReleaseComponent implements OnInit {

  @ViewChild('detailmarkdown', { static: false }) detailmarkdown: ElementRef; // 找到第一个符合条件的节点
  conf = new EditorConfig();
  tipsgroup = [];
  validateForm: FormGroup;
  isVisible = false;
  newTips = null;

  constructor(private http: HttpClientService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      atitle: [null, [Validators.required]],
      acontent: [null],
      aclass: [null, [Validators.required]],
      avatar: [null],
      apublic: [true]
    });
    this.getTips();
    editormd('detailmarkdown', this.conf);
  }

  getTips() {
    this.http.get('/apis/types', {}, res => {
      console.log('data', res);
      this.tipsgroup = res['data'];
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    const val = this.newTips;
    if (!val || val.length === 0 || val.trim().length === 0) {
      return;
    }
    this.http.post('/apis/types', { tname: val.trim() }, res => {
      this.isVisible = false;
      if (res.code === 200) {
        this.message.success('添加成功');
        this.getTips();
      } else if (res.code) {
        this.message.error('添加失败，请重试!');
      }
    })
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const content = this.detailmarkdown.nativeElement.children[3].value;
    if (this.validateForm.invalid && this.validateForm.dirty) {
      this.message.error('标题或分类或内容不能为空!');
      return;
    }
    if (content.length < 10) {
      this.message.error('内容需大于10个字！');
      return;
    }
    this.validateForm.get('acontent').setValue(content);
    let value = this.validateForm.value
    let reg = /(?<=>).*?(?=<)/g;
    let abstract = content.match(reg).join(' ').trim();
    value.abstract = abstract.substr(0,100)+'...';
    value.uid = '5da7291b31a7644dd49bfe8c'
    this.http.post('/apis/article', this.validateForm.value, res => {
      if (res.code === 200) {
        this.message.success('发表成功');
        this.router.navigateByUrl("/page/" + res.data['_id']);
      } else {
        this.message.error('发表失败');
      }
    })
  }
}
