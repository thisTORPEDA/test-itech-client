import { FC, ReactElement } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { registerSchema } from "../../../entities/user/lib/validations/regsiterSchema.ts";
import { useRegisterUser } from "../../../entities/user/api/userApi.ts";

export const RegisterForm: FC = (): ReactElement => {
  const { mutate: register, isPending } = useRegisterUser();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      register({
        email: values.email,
        password: values.password,
      });
    },
  });

  return (
    <form
      style={{
        display: "flex",
        alignItems: "center",
        flexFlow: "column wrap",
      }}
      onSubmit={(event) => {
        event.preventDefault();
        formik.handleSubmit();
      }}
    >
      <h2>Регистрация</h2>
      <Stack spacing={2}>
        <TextField
          label="Email"
          name="email"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && !!formik.errors.email}
          helperText={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""
          }
          value={formik.values.email}
        />
        <TextField
          label="Пароль"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && !!formik.errors.password}
          helperText={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""
          }
          value={formik.values.password}
        />
        <TextField
          label="Повторите пароль"
          name="repeatPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.repeatPassword && !!formik.errors.repeatPassword
          }
          helperText={
            formik.touched.repeatPassword && formik.errors.repeatPassword
              ? formik.errors.repeatPassword
              : ""
          }
          value={formik.values.repeatPassword}
        />
        <Button disabled={isPending} type="submit" variant="contained">
          Зарегистрироваться
        </Button>
      </Stack>
    </form>
  );
};
