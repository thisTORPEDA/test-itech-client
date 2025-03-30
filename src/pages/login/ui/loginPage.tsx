import { FC, ReactElement } from "react";
import { Page } from "../../../shared/components/Page.tsx";
import { LoginForm } from "../../../features/auth/ui/LoginForm.tsx";
import { Link } from "react-router-dom";

export const LoginPage: FC = (): ReactElement => {
  return (
    <Page>
      <LoginForm />
      <Link
        to={"/register"}
        style={{
          padding: "20px 0",
        }}
      >
        Зарегистироваться
      </Link>
    </Page>
  );
};
