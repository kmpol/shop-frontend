import { Product } from '../../product/model/product';

export interface Category {
  name: string;
  description: string;
  slug: string;
  products: Array<Product>;
}
