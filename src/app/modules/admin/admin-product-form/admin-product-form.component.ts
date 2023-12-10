import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
})
export class AdminProductFormComponent implements OnInit {
  @Input() parentForm!: FormGroup;

  ngOnInit(): void {}
}
