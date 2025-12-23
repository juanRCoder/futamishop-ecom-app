import {
  create,
  getAll,
  getByCategoryId,
  getById,
} from "@/services/product.service";
import { useMutation, useQuery } from "@tanstack/react-query";

const AllProducts = (searchTerm?: string, isAdmin: boolean = false) => {
  return useQuery({
    queryKey: ["allProducts", searchTerm, isAdmin],
    queryFn: () => getAll(searchTerm, isAdmin),

    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: searchTerm !== undefined,
  });
};

const ProductsByCategory = (id: string) => {
  return useQuery({
    queryKey: ["getByCategoryId", id],
    queryFn: () => getByCategoryId(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

const useGetById = (id: string) => {
  return useQuery({
    queryKey: ["getById", id],
    queryFn: () => getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

type UseCreateProps = {
  onSuccess?: (data: {
    success: boolean;
    payload: { message: string };
  }) => void;
  onError?: (message: string) => void;
};

const useCreate = ({ onSuccess, onError }: UseCreateProps) => {
  return useMutation({
    mutationFn: async (data: FormData) => create(data),
    onSuccess(data) {
      if (onSuccess) onSuccess(data);
    },
    onError(error) {
      if (onError)
        onError(String(error));
    },
  });
};

export const useProducts = {
  AllProducts,
  ProductsByCategory,
  useGetById,
  useCreate,
};
