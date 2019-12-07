import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from '../../serve/http-client.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-pagelist',
  templateUrl: './pagelist.component.html',
  styleUrls: ['./pagelist.component.scss']
})
export class PagelistComponent implements OnInit {
  @Input() list: object;
  @Input() loading: boolean;
  @Input() ctrl: boolean;
  @Output() childEvent: EventEmitter<any> = new EventEmitter();
  constructor(
    private http: HttpClientService,
    private msg: NzMessageService
  ) { }

  ngOnInit() { }

  delete(id) {
    this.http.delete('/apis/article/' + id, {}, res => {
      if (res.code === 200) {
        this.msg.success('删除成功');
        this.childEvent.emit();
      }
    })
  }

}
