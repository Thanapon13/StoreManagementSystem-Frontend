export type ActionState = {
  message: string;
  code?: number;
  errors?: Record<string, string>;
};

export type actionFunction = (
  prevState: ActionState,
  formData: FormData,
) => Promise<ActionState>;
