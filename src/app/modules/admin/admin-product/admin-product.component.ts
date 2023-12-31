import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminProductService } from './admin-product.service';
import {
  Observable,
  Subject,
  map,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { AdminProduct } from './model/adminProduct';
import { AdminConfirmDialogService } from '../common/service/admin-confirm-dialog.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
})
export class AdminProductComponent implements AfterViewInit {
  private destroy$: Subject<void> = new Subject();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns: string[] = ['image', 'id', 'name', 'price', 'actions'];
  totalElements: number = 0;
  products: AdminProduct[] = [];

  constructor(
    private adminProductService: AdminProductService,
    private dialogService: AdminConfirmDialogService
  ) {}

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.adminProductService.getProducts(
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.totalElements = data.totalElements;
        this.products = data.content;
      });
  }

  confirmDelete(element: AdminProduct) {
    this.dialogService
      .openConfirmDialog('Are you sure you want to delete?')
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.adminProductService.delete(element.id).subscribe(() => {
            this.products.forEach((product, index) => {
              if (element == product) {
                this.products.splice(index, 1);
                this.table.renderRows();
              }
            });
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
