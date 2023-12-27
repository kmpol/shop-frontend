import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fullpageadmin',
  templateUrl: './fullpageadmin.component.html',
  styleUrls: ['./fullpageadmin.component.scss'],
})
export class FullpageadminComponent implements OnInit {
  public menu: string[] = ['Orders', 'Products', 'Stats'];

  constructor() {}

  ngOnInit(): void {}
}
