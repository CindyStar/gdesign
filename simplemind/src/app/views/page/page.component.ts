import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { HttpClientService } from '../../serve/http-client.service';
import { NzMessageService } from 'ng-zorro-antd';
import { distanceInWords } from 'date-fns';
import { GlobalService } from '../../serve/global.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  pageInfo = {
    aclass: {
      tname: ''
    },
    uid: {
      uname: ''
    }
  };
  pageList = [];
  pageId = null;

  data: any[] = [];
  submitting = false;
  user = {};
  inputValue = '';

  loading = true;
  following = false;
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private http: HttpClientService,
    private message: NzMessageService,
    private global: GlobalService
  ) {
    if (this.route.url.includes('page/')) {
      this.route.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.loading = true;
          this.pageId = this.router.snapshot.params.id;
          this.getArticle();
          this.getComment();
        }
      });
    }
  }

  ngOnInit() {
    this.user = this.global.user;
  }

  getArticle() {
    this.http.get('apis/article/' + this.pageId, {}, res => {
      if (res.code === 200) {
        this.pageList = res.articles;
        this.pageInfo = res.data;
        this.loading = false;
      } else {
        this.message.error('网络错误，请稍后再试!')
      }
    })
  }

  getComment() {
    this.http.get('apis/comment/' + this.pageId, {}, res => {
      if (res.code === 200) {
        this.data = res.data
        this.submitting = false;
      } else {
        this.message.error('网络错误，请稍后再试!')
      }
    })
  }

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    const data = {
      ccontent: content,
      aid: this.pageId
    }
    this.http.post('/apis/comment', data, res => {
      if (res.code === 200) {
        this.getComment();
      } else {
        this.message.error('网络错误，请稍后再试!')
      }
    })

  }

  // follow() {
  //   this.following = true;

  // }
}
