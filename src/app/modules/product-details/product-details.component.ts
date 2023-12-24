import { Component, OnInit } from '@angular/core';
import { ProductDetails } from './model/ProductDetails';
import { ProductDetailsService } from './product-details.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product!: ProductDetails;

  constructor(
    private ProductDetailsService: ProductDetailsService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails() {
    let slug = this.router.snapshot.params['slug'];
    this.ProductDetailsService.getProductDetails(slug).subscribe(
      (productResponse) => (this.product = productResponse)
    );
  }
}
