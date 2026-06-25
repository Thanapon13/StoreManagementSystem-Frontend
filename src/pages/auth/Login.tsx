import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";
import { validateLogin } from "@/validators/validate-login";
import useAuth from "@/hooks/useAuth";
import type { ActionState, actionFunction } from "@/utils/types";

const initialInput = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { userLogin } = useAuth();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [input, setInput] = useState(initialInput);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const clearInput = () => setInput(initialInput);

  const loginAction: actionFunction = async (
    _prevState,
    formData,
  ): Promise<ActionState> => {
    setErrors({});

    const rawData = Object.fromEntries(
      Array.from(formData.entries()).filter(([key]) => !key.startsWith("$")),
    );

    const { data, errors: validationErrors } = validateLogin(rawData);

    if (validationErrors) {
      setErrors(validationErrors);
      return { message: "validation error", errors: validationErrors };
    }

    try {
      const user = await userLogin(data.email, data.password);
      clearInput();
      await Swal.fire({
        icon: "success",
        title: "Logged in",
        timer: 1000,
        showConfirmButton: false,
      });
      navigate(user.role === "seller" ? "/seller/dashboard" : "/");
      return { message: "logged in" };
    } catch (err) {
      const message =
        (axios.isAxiosError(err) && err.response?.data?.message) ||
        "Something went wrong, please try again.";
      toast.error(message);
      setErrors({ form: message });
      return { message, errors: { form: message } };
    }
  };

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-6 py-16">
      <Card className="rounded-3xl shadow-lg shadow-primary/5">
        <CardHeader>
          <CardTitle className="text-xl">Log in</CardTitle>
          <CardDescription>Welcome back to StoreFront.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm
            action={loginAction}
            errors={errors}
            input={input}
            onChangeInput={handleChangeInput}
          />

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
