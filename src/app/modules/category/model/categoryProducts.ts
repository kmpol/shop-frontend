import { Page } from 'src/app/modules/common/model/page';
import { Category } from './category';
import { Product } from '../../common/model/product';

export interface CategoryProducts {
  category: Category;
  products: Page<Product>;
}
