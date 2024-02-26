import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 

import { Product } from '@/types';

import { TbFaceId, TbFaceIdError } from "react-icons/tb"

interface LikeStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

 // Custom Toast Error
 const toastError = (message: string) => {
    toast.error(message, {
      style: {
        background: "white",
        color: "red",
      },
      icon: <TbFaceIdError size={30} />,
    });
  };
  // Custom Toast Success
  const toastSuccess = (message: string) => {
    toast.error(message, {
      style: {
        background: "white",
        color: "green",
      },
      icon: <TbFaceId size={30} />,
    });
  };

const useLike = create(
  persist<LikeStore>((set, get) => ({
  items: [],
  addItem: (data: Product) => {
    const currentItems = get().items;
    const existingItem = currentItems.find((item) => item.id === data.id);
    
    if (existingItem) {
      return toastError('Item already in wishlist.');
    }

    set({ items: [...get().items, data] });
    toastSuccess('Item added to wishlist.');
  },
  removeItem: (id: string) => {
    set({ items: [...get().items.filter((item) => item.id !== id)] });
    toastSuccess('Item removed from wishlist.');
  },
  removeAll: () => set({ items: [] }),
}), {
  name: 'likes-storage',
  storage: createJSONStorage(() => localStorage)
}));

export default useLike;