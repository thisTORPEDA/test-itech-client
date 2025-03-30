import { object, ref, string } from "yup";

export const registerSchema = object().shape({
  email: string().email("Некорректный email").required("Email обязателен"),
  password: string()
    .min(6, "Пароль должен быть не менее 6 символов")
    .max(30, "Пароль должен быть не более 30 символов")
    .required("Пароль обязателен"),
  repeatPassword: string().oneOf([ref("password"), ""], "Пароли не совпадают"),
});
