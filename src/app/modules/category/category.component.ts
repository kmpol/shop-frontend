import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { CategoryProducts } from './model/categoryProducts';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  categoryProducts!: CategoryProducts;
  private destroy$: Subject<void> = new Subject();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.getCatregoryWithProducts(0, 10);
      });
    this.getCatregoryWithProducts(0, 10);
  }

  getCatregoryWithProducts(page: number, size: number) {
    let slug = this.route.snapshot.params['slug'];
    this.categoryService
      .getCatregoryWithProducts(slug, page, size)
      .subscribe((category) => (this.categoryProducts = category));
  }

  onPageEvent(event: PageEvent) {
    this.getCatregoryWithProducts(event.pageIndex, event.pageSize);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
