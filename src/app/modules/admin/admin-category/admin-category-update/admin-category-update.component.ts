import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminCategoryService } from '../admin-category.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminMessageService } from '../../admin-message.service';
import { AdminCategory } from '../model/adminCategory';

@Component({
  selector: 'app-admin-category-update',
  templateUrl: './admin-category-update.component.html',
  styleUrls: ['./admin-category-update.component.scss'],
})
export class AdminCategoryUpdateComponent implements OnInit {
  categoryForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminCategoryService: AdminCategoryService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private adminMessageSerice: AdminMessageService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: [''],
      slug: ['', [Validators.required, Validators.minLength(4)]],
    });
    this.fillCategoryForm();
  }

  fillCategoryForm() {
    this.adminCategoryService
      .getCategory(Number(this.route.snapshot.params['id']))
      .subscribe((category) => {
        this.categoryForm.setValue({
          name: category.name,
          description: category.description,
          slug: category.slug,
        });
      });
  }

  onSubmitForm() {
    this.adminCategoryService
      .updateCategory(
        Number(this.route.snapshot.params['id']),
        this.categoryForm.value
      )
      .subscribe({
        next: (category) => {
          this.mapCategoryResponseToFormValues(category);
          this.snackBar.open('Category update successful!', '', {
            duration: 3000,
          });
        },

        error: (err) => {
          this.adminMessageSerice.addSpringErrors(err);
        },
      });
  }

  private mapCategoryResponseToFormValues(category: AdminCategory) {
    this.categoryForm.setValue({
      name: category.name,
      description: category.description,
      slug: category.slug,
    });
  }
}
