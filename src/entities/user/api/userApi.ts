import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axiosRequest from "../../../shared/api/axiosConfig.ts";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import {
  TAuthPayload,
  TMessage,
  TTokenPesponse,
} from "../../../shared/types/queries.ts";

export const useRegisterUser = (): UseMutationResult<
  TMessage,
  AxiosError<TMessage>,
  TAuthPayload
> => {
  const navigate = useNavigate();
  return useMutation<TMessage, AxiosError<TMessage>, TAuthPayload>({
    mutationFn: (body) => {
      return axiosRequest.post("/auth/register", body);
    },
    onSuccess: () => {
      navigate("/login");
      toast.success("Вы успешно зарегистрировались! Войдите в систему");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Ошибка регистрации");
    },
  });
};

export const useLoginUser = (): UseMutationResult<
  TTokenPesponse,
  AxiosError<TMessage>,
  TAuthPayload
> => {
  const navigate = useNavigate();

  return useMutation<TTokenPesponse, AxiosError<TMessage>, TAuthPayload>({
    mutationFn: (body) => {
      return axiosRequest.post("/auth/login", body);
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);

      navigate("/home");
      toast.success("Вы вошли в систему");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Ошибка входа");
    },
  });
};
