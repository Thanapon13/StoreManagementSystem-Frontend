import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/buttons/Buttons";
import FieldError from "@/components/error/FieldError";
import type { actionFunction } from "@/utils/types";

type LoginInput = {
  email: string;
  password: string;
};

type LoginFormProps = {
  action: actionFunction;
  errors: Record<string, string>;
  input: LoginInput;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const LoginForm = ({ action, errors, input, onChangeInput }: LoginFormProps) => {
  return (
    <FormContainer action={action} className="flex flex-col gap-4">
      <FieldError message={errors.form} />

      <div>
        <FormInput
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          value={input.email}
          onChange={onChangeInput}
        />
        <FieldError message={errors.email} />
      </div>

      <div>
        <FormInput
          name="password"
          type="password"
          label="Password"
          autoComplete="current-password"
          value={input.password}
          onChange={onChangeInput}
        />
        <FieldError message={errors.password} />
      </div>

      <SubmitButton
        text="Log in"
        size="sm"
        className="mt-2 rounded-full shadow-sm"
        pendingText="Logging in..."
      />
    </FormContainer>
  );
};

export default LoginForm;
