'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

import { deleteCarts, patchCarts, postCarts } from '@/services/api/cart-controller';
import { HttpError } from '@/types/axios.dto';
import type { CartRequest, CartSchema } from '@/types/cart-controller';

export const usePostCartItem = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  return useMutation<CartSchema, Error, CartRequest>({
    mutationFn: async (cartData) => {
      return await postCarts(cartData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    },
    onError: (error) => {
      if (error instanceof HttpError && error.status === 401) {
        router.push(`/login?afterLogin=${encodeURIComponent(pathname)}`);
      }
    },
  });
};

export const usePatchCartItem = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  return useMutation<CartSchema, Error, CartRequest>({
    mutationFn: async (cartData) => {
      return await patchCarts(cartData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    },
    onError: (error) => {
      if (error instanceof HttpError && error.status === 401) {
        router.push(`/login?afterLogin=${encodeURIComponent(pathname)}`);
      }
    },
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  return useMutation<CartSchema, Error, number>({
    mutationFn: async (itemId) => {
      return await deleteCarts(itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    },
    onError: (error) => {
      if (error instanceof HttpError && error.status === 401) {
        router.push(`/login?afterLogin=${encodeURIComponent(pathname)}`);
      }
    },
  });
};
