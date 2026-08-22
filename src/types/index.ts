export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
}

export interface Order {
  id: string;
  customerId: string;
  total: number;
  date: string;
}

export interface Review {
  id: string;
  productId: string;
  rating: number;
  comment: string;
}
