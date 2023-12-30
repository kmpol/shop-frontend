import { Component, OnInit } from '@angular/core';
import { ProductDetails } from './model/ProductDetails';
import { ProductDetailsService } from './product-details.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from './model/review';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product!: ProductDetails;
  reviewForm!: FormGroup;

  constructor(
    private productDetailsService: ProductDetailsService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProductDetails();
    this.reviewForm = this.formBuilder.group({
      authorName: ['', [Validators.required, Validators.minLength(2)]],
      content: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  getProductDetails() {
    let slug = this.router.snapshot.params['slug'];
    this.productDetailsService
      .getProductDetails(slug)
      .subscribe((productResponse) => (this.product = productResponse));
  }

  onSubmitReviewForm(): void {
    if (!this.reviewForm.valid) return;

    this.productDetailsService
      .saveProductReview({
        content: this.reviewForm.get('content')?.value,
        authorName: this.reviewForm.get('authorName')?.value,
        productId: this.product.id,
      } as Review)
      .subscribe((review) => {
        this.reviewForm.reset();
        this.snackBar.open('Thank you for your opinion', '', {
          duration: 3000,
        });
      });
  }

  get authorName() {
    return this.reviewForm.get('authorName');
  }

  get content() {
    return this.reviewForm.get('content');
  }
}
