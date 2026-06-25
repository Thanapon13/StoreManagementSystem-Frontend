import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "email is required")
    .email({ message: "email must be a valid email" }),
  password: z.string().trim().min(1, "password is required"),
});

export type LoginPayload = z.infer<typeof loginSchema>;

type ValidateResult =
  | { data: LoginPayload; errors?: undefined }
  | { data?: undefined; errors: Record<string, string> };

export const validateLogin = (input: Record<string, unknown>): ValidateResult => {
  const result = loginSchema.safeParse(input);

  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0]?.toString() ?? "form";
      if (!errors[key]) errors[key] = issue.message;
    }
    return { errors };
  }

  return { data: result.data };
};
