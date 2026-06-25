import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/buttons/Buttons";
import FieldError from "@/components/error/FieldError";
import type { actionFunction } from "@/utils/types";
import type { UserRole } from "@/types/user";

type RegisterInput = {
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterFormProps = {
  action: actionFunction;
  errors: Record<string, string>;
  input: RegisterInput;
  role: UserRole | "";
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoleChange: (role: UserRole) => void;
};

const RegisterForm = ({
  action,
  errors,
  input,
  role,
  onChangeInput,
  onRoleChange,
}: RegisterFormProps) => {
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
          autoComplete="new-password"
          value={input.password}
          onChange={onChangeInput}
        />
        <FieldError message={errors.password} />
      </div>

      <div>
        <FormInput
          name="confirmPassword"
          type="password"
          label="Confirm password"
          autoComplete="new-password"
          value={input.confirmPassword}
          onChange={onChangeInput}
        />
        <FieldError message={errors.confirmPassword} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="role">Account type</Label>
        <input type="hidden" name="role" value={role} />
        <Select value={role} onValueChange={value => onRoleChange(value as UserRole)}>
          <SelectTrigger id="role" className="w-full">
            <SelectValue placeholder="Select account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="buyer">Buyer</SelectItem>
            <SelectItem value="seller">Seller</SelectItem>
          </SelectContent>
        </Select>
        <FieldError message={errors.role} />
      </div>

      <SubmitButton
        text="Register"
        size="sm"
        className="mt-2 rounded-full shadow-sm"
        pendingText="Creating account..."
      />
    </FormContainer>
  );
};

export default RegisterForm;
