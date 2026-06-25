export interface Product {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  unit_price: number;
  quantity: number;
  image: string;
  created_at: string;
  seller?: { id: number; email: string };
}
