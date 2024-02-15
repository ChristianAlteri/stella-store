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