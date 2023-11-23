import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  categories: string[] = ['Category 1', 'Category 2', 'Category 3'];

  constructor() {}

  ngOnInit(): void {}
}
