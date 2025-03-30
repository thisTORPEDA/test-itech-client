import { FC, ReactElement } from "react";
import { useLoginUser } from "../../../entities/user/api/userApi.ts";
import { useFormik } from "formik";
import { registerSchema } from "../../../entities/user/lib/validations/regsiterSchema.ts";
import { Button, Stack, TextField } from "@mui/material";

export const LoginForm: FC = (): ReactElement => {
  const { mutate: login, isPending } = useLoginUser();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      login(values);
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
      <h2>Вход</h2>
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

        <Button disabled={isPending} type="submit" variant="contained">
          Войти
        </Button>
      </Stack>
    </form>
  );
};
