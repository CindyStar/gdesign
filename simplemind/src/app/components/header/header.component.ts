import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../serve/global.service';
import { HttpClientService } from '../../serve/http-client.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchChange$: any;
  isLoading: boolean;
  keyword: string;
  optionList: any;
  isSearch = true;
  isEmpty = true;
  constructor(
    private http: HttpClientService,
    private global: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  searchPage() {
    if (this.isLoading) {
      return
    }
    if(this.keyword === ''){
      this.isSearch = true;
    }
    this.isLoading = true;
    this.http.get('/apis/article/search', { keyword: this.keyword }, res => {
      if (!res.error) {
        if(res.length === 0){
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
        }
        this.optionList = res;
        this.isLoading = false;
      }
    });
  }

  topage(id) {
    this.keyword = '';
    this.isEmpty = true;
    this.isSearch = true;
    this.optionList = [];
    this.router.navigate(['/user/page', id]);
  }
}
