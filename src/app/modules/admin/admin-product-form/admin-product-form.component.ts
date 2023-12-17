import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
})
export class AdminProductFormComponent implements OnInit {
  @Input() parentForm!: FormGroup;

  ngOnInit(): void {}

  get name() {
    return this.parentForm.get('name');
  }

  get description() {
    return this.parentForm.get('description');
  }

  get price() {
    return this.parentForm.get('price');
  }

  get category() {
    return this.parentForm.get('category');
  }

  get currency() {
    return this.parentForm.get('currency');
  }
}
