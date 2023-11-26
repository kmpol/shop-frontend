import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './model/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((props: Product[]) => {
        this.products = props;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
