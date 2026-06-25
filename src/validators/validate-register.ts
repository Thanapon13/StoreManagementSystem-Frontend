import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, "email is required")
      .email({ message: "email must be a valid email" }),
    role: z.enum(["seller", "buyer"], {
      message: "role must be either seller or buyer",
    }),
    password: z
      .string()
      .trim()
      .min(1, "password is required")
      .min(6, "password must have at least 6 characters")
      .regex(/^[a-zA-Z0-9]+$/, "password must contain number or alphabet"),
    confirmPassword: z.string().trim().min(1, "confirm password is required"),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "password and confirm password did not match",
    path: ["confirmPassword"],
  });

export type RegisterPayload = z.infer<typeof registerSchema>;

type ValidateResult =
  | { data: RegisterPayload; errors?: undefined }
  | { data?: undefined; errors: Record<string, string> };

export const validateRegister = (input: Record<string, unknown>): ValidateResult => {
  const result = registerSchema.safeParse(input);

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
