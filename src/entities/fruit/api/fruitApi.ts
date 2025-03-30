import { TFruit } from "../../../shared/types/fruits.ts";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import axiosRequest from "../../../shared/api/axiosConfig.ts";
import { AxiosError } from "axios";
import { TMessage } from "../../../shared/types/queries.ts";
import queryClient from "../../../shared/api/queryClient.ts";
import toast from "react-hot-toast";

export const useGetAllFruits = (): UseQueryResult<
  TFruit[],
  AxiosError<TMessage>
> => {
  return useQuery({
    queryKey: ["fruits"],
    queryFn: async () => {
      const result = await axiosRequest.get("/fruits/all");

      return result.data;
    },
  });
};

export const useGetOneFruit = (
  id: number,
): UseQueryResult<TFruit, AxiosError<TMessage>> => {
  return useQuery({
    queryKey: [`fruit_${id}`],
    queryFn: async () => {
      const result = await axiosRequest.get(`/fruits/${id}`);

      return result.data;
    },
  });
};

export const useCreateFruit = (): UseMutationResult<
  TFruit,
  AxiosError<TMessage>,
  Omit<TFruit, "id">
> => {
  return useMutation({
    mutationFn: async (body) => {
      const result = await axiosRequest.post(`/fruits/create`, body);

      return result.data;
    },
    onSuccess: (newFruit) => {
      queryClient.setQueryData<TFruit[]>(["fruits"], (oldFruits = []) => [
        ...oldFruits,
        newFruit,
      ]);
    },
  });
};

export const useCreateMockFruits = (): UseMutationResult<
  TFruit[],
  AxiosError<TMessage>,
  void
> => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosRequest.get("/fruits/create/mock");
      return response.data;
    },
    onSuccess: (newFruits) => {
      toast.success("Созданы тестовые фрукты");

      queryClient.setQueryData<TFruit[]>(["fruits"], (oldFruits = []) => [
        ...oldFruits,
        ...newFruits,
      ]);
    },
  });
};

export const useUpdateFruit = (): UseMutationResult<
  TFruit,
  AxiosError<TMessage>,
  TFruit
> => {
  return useMutation({
    mutationFn: async (body) => {
      const result = await axiosRequest.put(`/fruits/update/${body.id}`, body);

      return result.data;
    },
    onSuccess: (updatedFruit) => {
      queryClient.setQueryData<TFruit[]>(["fruits"], (oldFruits = []) =>
        oldFruits.map((fruit) =>
          fruit.id === updatedFruit.id ? updatedFruit : fruit,
        ),
      );

      queryClient.setQueryData([`fruit_${updatedFruit.id}`], updatedFruit);
    },
  });
};

export const useDeleteFruit = (): UseMutationResult<
  TMessage,
  AxiosError<TMessage>,
  number
> => {
  return useMutation({
    mutationFn: async (id: number) => {
      const result = await axiosRequest.delete(`/fruits/delete/${id}`);

      return result.data;
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData<TFruit[]>(["fruits"], (oldFruits = []) =>
        oldFruits.filter((fruit) => fruit.id !== id),
      );
      queryClient.removeQueries({ queryKey: [`fruit_${id}`] });
    },
  });
};
