import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { RotateCw } from "lucide-react";

type btnSize = "default" | "lg" | "sm";
type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

type SubmitButtonProps = {
  className?: string;
  size?: btnSize;
  text?: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  pendingText: string;
};

export const SubmitButton = ({
  className,
  size,
  text,
  disabled,
  variant,
  pendingText,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      size={size}
      className={`${className} capitalize`}
      variant={variant}
    >
      {pending ? (
        <>
          <RotateCw className="animate-spin" />
          <span>{pendingText}</span>
        </>
      ) : (
        text
      )}
    </Button>
  );
};
