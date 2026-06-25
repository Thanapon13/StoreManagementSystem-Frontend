import { useActionState } from "react";
import type { actionFunction, ActionState } from "@/utils/types";

const initialState: ActionState = {
  message: "",
  code: undefined,
};

type FormContainerProps = {
  action: actionFunction;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
};

const FormContainer = ({
  action,
  children,
  className,
  onClick,
}: FormContainerProps) => {
  const [, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className={className} onClick={onClick}>
      {children}
    </form>
  );
};

export default FormContainer;
