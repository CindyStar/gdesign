import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pagelist',
  templateUrl: './pagelist.component.html',
  styleUrls: ['./pagelist.component.scss']
})
export class PagelistComponent implements OnInit {
  @Input() list: object;
  constructor() { }

  ngOnInit() {
    console.log(this.list)
  }

}
