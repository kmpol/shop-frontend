import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminProductUpdateService } from './admin-product-update.service';
import { AdminProductUpdate } from './model/adminProductUpdate';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-product-update',
  templateUrl: './admin-product-update.component.html',
  styleUrls: ['./admin-product-update.component.scss'],
})
export class AdminProductUpdateComponent implements OnInit {
  product!: AdminProductUpdate;
  productForm!: FormGroup;

  constructor(
    private router: ActivatedRoute,
    private adminProductUpdateService: AdminProductUpdateService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProduct();

    this.productForm = this.formBuilder.group({
      name: [''],
      description: [''],
      category: [''],
      price: [''],
      currency: ['PLN'],
    });
  }

  getProduct() {
    let id: number = Number(this.router.snapshot.params['id']);
    this.adminProductUpdateService.getProduct(id).subscribe((product) => {
      this.setFormFields(product);
    });
  }

  onSubmitForm() {
    let id: number = Number(this.router.snapshot.params['id']);
    this.adminProductUpdateService
      .saveProduct(id, this.productForm.value as AdminProductUpdate)
      .subscribe({
        next: (product) => {
          this.setFormFields(product);
          this.snackBar.open('Saved successfuly!', '', { duration: 3000 });
        },
        error: (err) => {
          console.log(err);
          this.snackBar.open('Something bad happened ' + err, '', {
            duration: 3000,
          });
        },
      });
  }

  private setFormFields(product: AdminProductUpdate): void {
    this.productForm.setValue({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      currency: product.currency,
    });
  }
}
