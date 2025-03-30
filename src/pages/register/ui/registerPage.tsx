import { FC, ReactElement } from "react";
import { Page } from "../../../shared/components/Page.tsx";
import RegisterForm from "../../../features/auth";
import { Link } from "react-router-dom";

type RegisterPageProps = {
  prop?: number;
};

export const RegisterPage: FC<RegisterPageProps> = (): ReactElement => {
  return (
    <Page>
      <RegisterForm />
      <Link
        style={{
          padding: "20px 0",
        }}
        to={"/login"}
      >
        Войти
      </Link>
    </Page>
  );
};
