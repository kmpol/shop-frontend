import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminProductService } from './admin-product.service';
import { Observable, Subject, map, startWith, switchMap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { AdminProduct } from './model/adminProduct';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
})
export class AdminProductComponent implements AfterViewInit {
  private destroy$: Subject<void> = new Subject();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];
  totalElements: number = 0;
  products: AdminProduct[] = [];

  constructor(private adminProductService: AdminProductService) {}

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.adminProductService.getProducts(
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        })
      )
      .subscribe((data) => {
        this.totalElements = data.totalElements;
        this.products = data.content;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
