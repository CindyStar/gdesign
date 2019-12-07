import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../serve/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adlayout',
  templateUrl: './adlayout.component.html',
  styleUrls: ['./adlayout.component.scss']
})
export class AdlayoutComponent implements OnInit {

  constructor(
    private global: GlobalService,
    private router: Router
  ) { console.log(this.router.url);}

  ngOnInit() {
    
  }

}
