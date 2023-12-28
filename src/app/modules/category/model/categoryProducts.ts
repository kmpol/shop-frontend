import { Page } from 'src/app/shared/model/page';
import { Category } from './category';
import { Product } from '../../product/model/product';

export interface CategoryProducts {
  category: Category;
  products: Page<Product>;
}
