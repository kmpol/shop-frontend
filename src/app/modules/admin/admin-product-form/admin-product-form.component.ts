import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminCategoryNameDto } from '../common/dto/adminCategoryNameDto';
import { FormCategoryService } from './form-category.service';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
})
export class AdminProductFormComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  categories: Array<AdminCategoryNameDto> = [];

  constructor(private formCategoryService: FormCategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.formCategoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  get name() {
    return this.parentForm.get('name');
  }

  get description() {
    return this.parentForm.get('description');
  }

  get fullDescription() {
    return this.parentForm.get('fullDescription');
  }

  get price() {
    return this.parentForm.get('price');
  }

  get categoryId() {
    return this.parentForm.get('categoryId');
  }

  get currency() {
    return this.parentForm.get('currency');
  }

  get slug() {
    return this.parentForm.get('slug');
  }
}
