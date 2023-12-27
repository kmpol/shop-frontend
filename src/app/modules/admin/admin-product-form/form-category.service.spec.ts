import { TestBed } from '@angular/core/testing';

import { FormCategoryService } from './form-category.service';

describe('FormCategoryService', () => {
  let service: FormCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
