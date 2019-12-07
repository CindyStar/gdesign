import { Component, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditorConfig } from 'editor-config';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { HttpClientService } from '../../serve/http-client.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../serve/global.service';
declare var editormd: any;
@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})

export class ReleaseComponent implements OnInit {

  pageId: any;
  editor: any;
  @ViewChild('detailmarkdown', { static: false }) detailmarkdown: ElementRef; // 找到第一个符合条件的节点
  conf = new EditorConfig();
  tipsgroup = [];
  validateForm: FormGroup;
  isVisible = false;
  newTips = null;
  newColor = null;

  constructor(
    private http: HttpClientService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private routeInfo: ActivatedRoute,
    private global: GlobalService
  ) { }

  ngOnInit() {
    this.pageId = this.routeInfo.snapshot.queryParams._id;
    this.validateForm = this.fb.group({
      atitle: [null, [Validators.required]],
      acontent: [null],
      aclass: [null, [Validators.required]],
      avatar: [null],
      apublic: [true]
    });
    if (this.pageId) {
      this.getPage();
    } else {
      this.editor = editormd('detailmarkdown', this.conf);
    }
    this.getTips();

  }
  getPage() {
    this.http.get('/apis/article/' + this.pageId, {}, res => {
      this.conf.setMarkDown(res.data.markdown);
      this.validateForm.get('atitle').setValue(res.data.atitle);
      this.validateForm.get('acontent').setValue(res.data.acontent);
      this.validateForm.get('aclass').setValue(res.data.aclass['_id']);
      this.validateForm.get('avatar').setValue(res.data.avatar);
      this.validateForm.get('apublic').setValue(res.data.apublic);
      this.editor = editormd('detailmarkdown', this.conf);
    });
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
    const val = {
      tname: this.newTips.trim(),
      tcolor: this.newColor
    };
    if (!val || val.tname.length === 0) {
      this.message.error('分类名称不能为空!');
      return;
    }
    this.http.post('/apis/types', val, res => {
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
    const content = this.editor.getHTML();
    const markdawn = this.editor.getMarkdown();
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
    value.abstract = abstract.substr(0, 100) + '...';
    value.uid = this.global.user['_id'];
    value.markdown = markdawn;
    this.http.post('/apis/article', this.validateForm.value, res => {
      if (res.code === 200) {
        if (this.pageId) {
          this.message.success('修改成功');
        } else {
          this.message.success('发表成功');
        }
        this.router.navigateByUrl("/user/page/" + res.data['_id']);
      } else {
        this.message.error('发表失败');
      }
    })
  }
}
