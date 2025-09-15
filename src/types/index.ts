export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: 'student' | 'merchant' | 'admin';
  schoolId?: string;
  balance: number;
  avatar?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  merchantId: string;
  merchantName: string;
  estimatedTime: number;
  available: boolean;
  stock?: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  userId: string;
  merchantId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  paymentMethod: 'gopay' | 'cash' | 'class_balance';
  pickupTime: Date;
  pickupLocation: string;
  notes?: string;
  createdAt: Date;
}

export interface Promo {
  id: string;
  title: string;
  description: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  minOrder: number;
  validUntil: Date;
  code: string;
  active: boolean;
}

export interface PickupLocation {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number];
  available: boolean;
  operatingHours: string;
}