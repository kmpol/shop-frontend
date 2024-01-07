export interface AdminReview {
  id: number;
  authorName: string;
  productId: number;
  content: string;
  isModerated: boolean;
}
