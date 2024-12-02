export interface Billboard {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboardId: string;
  billboard: Billboard;
  products: Product[];
}

export interface Designer {
  id: string;
  name: string;
  billboardId: string;
  billboard: Billboard;
  products: Product[];
}

export interface Seller {
  id: string;
  name: string;
  instagramHandle: string;
  billboardId: string;
  billboard: Billboard;
  charityName: string; // TODO: remove and update adding the charity model
  charityUrl: string; // TODO: remove and update adding the charity model
  shoeSizeEU: string;
  topSize: string;
  bottomSize: string;
  products: Product[];
  soldCount: number;
  sellerType: string;
  storeName: string;
  description: string;
}

export interface Store {
  id: string;
  name: string;
  email: string;
  storeName: string;
  currency: string;
  countryCode: string;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  description: string;
  ourPrice: string;
  retailPrice: string;
  size: Size;
  color: Color;
  condition: Condition;
  material: Material;
  gender: Gender;
  subcategory: Subcategory;
  images: Image[];
  isFeatured: boolean;
  isArchived: boolean;
  isOnSale: boolean;
  isCharity: boolean;
  isHidden: boolean;
  isOnline: boolean;

  likes: number | null | undefined;
  clicks: number | null | undefined;

  category: Category;
  seller: Seller;
  designer: Designer;
  designerId: string;
}

export interface Image {
  id: string;
  url: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}
export interface Color {
  id: string;
  name: string;
  value: string;
}
export interface Condition {
  id: string;
  name: string;
  value: string;
}
export interface Material {
  id: string;
  name: string;
  value: string;
}
export interface Gender {
  id: string;
  name: string;
  value: string;
}
export interface Subcategory {
  id: string;
  name: string;
  value: string;
}

export interface Order {
  id: string;
  storeId: string;
  store: Store;
  orderItems: OrderItem[];
  isPaid: boolean;
  hasBeenDispatched: boolean;
  totalAmount: string;

  soldByStaffId?: string | null;
  soldByStaff?: Staff | null;

  phone: string;
  address: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  Payout: Payout[];

  userId?: string | null;
  orderHistoryUsers: User[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
}

export interface Payout {
  id: string;
  storeId?: string | null;
  store?: Store | null;

  sellerId?: string | null;
  seller?: Seller | null;

  orderItemId?: string | null;
  orderItem?: OrderItem | null;

  orderId?: string | null;
  order?: Order | null;

  amount?: string | null;
  transferGroupId?: string | null;
  stripeTransferId?: string | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface Staff {
  id: string;
  storeId?: string | null;
  store?: Store | null;

  email?: string | null;
  name?: string | null;
  staffType?: string | null;

  orders: Order[];
  orderItems: OrderItem[];
  customers: User[];

  totalSales?: number;
  targetTotalSales?: number;

  totalTransactionCount?: number;
  targetTotalTransactionCount?: number;

  totalItemsSold?: number;
  targetTotalItemsSold?: number;

  returningCustomers?: number;
  targetReturningCustomers?: number;

  createdAt: Date;
  updatedAt: Date;

  isArchived: boolean;

  products: Product[];
}

export interface User {
  id: string;
  storeId?: string | null;
  store?: Store | null;
  email: string;
  postalCode?: string | null;
  phoneNumber?: string | null;

  name?: string;
  createdAt: Date;
  updatedAt: Date;
  hashedPassword: string;

  interactingStaff: Staff[];

  likeList: Product[];
  clickList: Product[];
  products: Product[];

  orderHistory: Order[];
  purchaseHistory: Product[];
  followingSeller: Seller[];

  totalPurchases?: number;
  totalItemsPurchased?: number;
  totalTransactionCount?: number;

  isArchived: boolean;
}
