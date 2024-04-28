import { Category, Designer, Seller } from "@/types";

export function sortByMostViewed(data: any) {
    return data.sort((a: any, b: any) => b.clicks - a.clicks);
}

export function sortByMostLiked(data: any) {
    return data.sort((a: any, b: any) => b.likes - a.likes);
}

export function sortPriceLowToHigh(data: any) {
    return data.sort((a: any, b: any) => a.ourPrice - b.ourPrice);
}

export function randomiseData(data: any) {
    return [...(data || [])].sort(() => Math.random() - 0.5);
}
