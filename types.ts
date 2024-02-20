export interface Billboard {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: string;
}

export interface Designer {
  id: string;
  name: string;
  billboard: string;
}

export interface Seller {
  id: string;
  name: string;
  instagramHandle: string;
  billboard: string;
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
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
  seller: Seller;
  size: Size;
  color: Color;
  images: Image[];
  isFeatured: boolean;
  isArchived: boolean;
  isOnSale: boolean;
  location: string | null | undefined;
  condition: string | null | undefined;
  sex: string | null | undefined;
  material: string | null | undefined;
  measurements: string | null | undefined;
  likes: number | null | undefined;
  clicks: number | null | undefined;
  reference: string | null | undefined;
  designer: Designer;
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
