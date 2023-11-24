import { Injectable } from '@angular/core';
import { Product } from './model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  public getProducts(): Product[] {
    return [
      {
        name: 'Apple iPhone 13 Pro',
        category: 'Cat 1',
        description: 'Awesome phone, buy it',
        price: 999.9,
        currency: 'PLN',
      },
      {
        name: 'Apple MacBook Pro 13 M1',
        category: 'Cat 1',
        description: 'Awesome laptop, but it',
        price: 1499.9,
        currency: 'PLN',
      },
      {
        name: 'Apple SmartWatch 2 SE',
        category: 'Cat 1',
        description: 'Awesome watch, but it',
        price: 299.9,
        currency: 'PLN',
      },
    ];
  }
}
