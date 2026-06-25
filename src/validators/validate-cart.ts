import { z } from "zod";

const quantitySchema = z.coerce
  .number({ message: "quantity must be a number" })
  .int("quantity must be a whole number")
  .min(1, "quantity must be at least 1");

type ValidateResult = { ok: true; data: number } | { ok: false; error: string };

export const validateCartQuantity = (value: unknown): ValidateResult => {
  const result = quantitySchema.safeParse(value);

  if (!result.success) {
    return { ok: false, error: result.error.issues[0]?.message ?? "invalid quantity" };
  }

  return { ok: true, data: result.data };
};
