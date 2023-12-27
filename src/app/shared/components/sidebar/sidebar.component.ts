import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { SidebarCategory } from './model/sidebarCategory';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  categories: Array<SidebarCategory> = [];

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.sidebarService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
