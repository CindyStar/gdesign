import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges {
  isLogin = false;
  constructor(private route: Router) { }
  ngOnInit() {
    if (this.route.url === '/login') {
      this.isLogin = true;
    }
  }
  ngOnChanges() {
    console.log(this.route.url, 111111111)
    if (this.route.url === '/login') {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
}
