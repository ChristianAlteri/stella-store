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

// export function sortByMostLiked(data: any) {
//     return data.sort((a: any, b: any) => {
//       const totalLikesA = a.products.reduce(
//         //@ts-ignore
//         (acc, product) => acc + product.likes,
//         0
//       );
//       const totalLikesB = b.products.reduce(
//         //@ts-ignore
//         (acc, product) => acc + product.likes,
//         0
//       );
//       return totalLikesB - totalLikesA;
//     });
//   }
  
//   export function sortPriceLowToHigh(data: any) {
//     return data.sort((a: any, b: any) => {
//       const avgLowestPriceA = a.products.reduce((acc, product) => {
//         const price = parseFloat(product.ourPrice) || 0;
//         return acc + price;
//       }, 0) / (a.products.length || 1);
//       const avgLowestPriceB = b.products.reduce((acc, product) => {
//         const price = parseFloat(product.ourPrice) || 0;
//         return acc + price;
//       }, 0) / (b.products.length || 1);
//       return avgLowestPriceA - avgLowestPriceB;
//     });
//   }
  
//   export function sortPriceHighToLow(data: any) {
//     return data.sort((a: any, b: any) => {
//       const avgHighestPriceA = a.products.reduce((acc, product) => {
//         const price = parseFloat(product.ourPrice) || 0;
//         return acc + price;
//       }, 0) / (a.products.length || 1);
//       const avgHighestPriceB = b.products.reduce((acc, product) => {
//         const price = parseFloat(product.ourPrice) || 0;
//         return acc + price;
//       }, 0) / (b.products.length || 1);
//       return avgHighestPriceB - avgHighestPriceA;
//     });
//   }