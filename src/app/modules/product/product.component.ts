import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './model/product';
import { Subject, takeUntil } from 'rxjs';
import { Page } from 'src/app/shared/model/page';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  page: Page<Product> | undefined = undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.getProductPage(0, 10);
  }

  onPageEvent(event: PageEvent) {
    this.getProductPage(event.pageIndex, event.pageSize);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getProductPage(page: number, size: number) {
    this.productService
      .getProducts(page, size)
      .pipe(takeUntil(this.destroy$))
      .subscribe((page: Page<Product>) => {
        this.page = page;
      });
  }
}
