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
import RegisterForm from "@/components/auth/RegisterForm";
import { register } from "@/apis/auth-api";
import { validateRegister } from "@/validators/validate-register";
import type { ActionState, actionFunction } from "@/utils/types";
import type { UserRole } from "@/types/user";

const initialInput = {
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole | "">("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [input, setInput] = useState(initialInput);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const registerAction: actionFunction = async (
    _prevState,
    formData,
  ): Promise<ActionState> => {
    setErrors({});

    const rawData = Object.fromEntries(
      Array.from(formData.entries()).filter(([key]) => !key.startsWith("$")),
    );

    const { data, errors: validationErrors } = validateRegister(rawData);

    if (validationErrors) {
      setErrors(validationErrors);
      return { message: "validation error", errors: validationErrors };
    }

    try {
      const { data: response } = await register(data);
      clearInput();
      await Swal.fire({
        icon: "success",
        title: "Register success",
        text: response.message,
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/login");
      return { message: response.message };
    } catch (err) {
      const message =
        (axios.isAxiosError(err) && err.response?.data?.message) ||
        "Something went wrong, please try again.";
      toast.error(message);
      setErrors({ form: message });
      return { message, errors: { form: message } };
    }
  };

  const clearInput = () => {
    setInput(initialInput);
    setRole("");
  };

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-6 py-16">
      <Card className="rounded-3xl shadow-lg shadow-primary/5">
        <CardHeader>
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>
            Join StoreFront as a buyer or seller.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <RegisterForm
            action={registerAction}
            errors={errors}
            input={input}
            role={role}
            onChangeInput={handleChangeInput}
            onRoleChange={setRole}
          />

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
