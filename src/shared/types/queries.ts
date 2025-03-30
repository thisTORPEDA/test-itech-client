import { TUser } from "./user.ts";

export type TMessage = {
  message?: string;
};

export type TAuthPayload = Omit<TUser, "id">;

export type TTokenPesponse = { data: { token: string } };
