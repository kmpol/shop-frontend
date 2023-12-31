import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminCategoryNameDto } from '../common/dto/adminCategoryNameDto';
import { AdminCategoryService } from './admin-category.service';
import { AdminConfirmDialogService } from '../common/service/admin-confirm-dialog.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
})
export class AdminCategoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  categories: Array<AdminCategoryNameDto> = [];
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private adminCategoryService: AdminCategoryService,
    private adminConfirmDialog: AdminConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.adminCategoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  confirmDelete(element: AdminCategoryNameDto) {
    this.adminConfirmDialog
      .openConfirmDialog('Are you sure you want to delete?')
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.adminCategoryService.deleteCategory(element.id).subscribe(() => {
            this.categories.forEach((category, index) => {
              if (element == category) {
                this.categories.splice(index, 1);
                this.table.renderRows();
              }
            });
          });
        }
      });
  }
}
