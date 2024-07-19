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
  charityName: string  
  charityUrl: string   
  shoeSizeEU: string   
  topSize: string     
  bottomSize: string   
  products: Product[];
  soldCount: number;
}

export interface Store {
  id: string;
  name: string;
}

export interface Product {
  id: string;
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
