import { z } from "zod";

export const MAX_IMAGE_SIZE_MB = 2;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
export const MAX_IMAGE_COUNT = 6;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const ACCEPTED_IMAGE_LABEL = "JPG, PNG, WEBP";

const baseSchema = z.object({
  title: z.string().trim().min(1, "title is required"),
  description: z
    .string()
    .trim()
    .min(1, "description is required")
    .max(300, "description must not exceed 300 characters"),
  unitPrice: z.coerce
    .number({ message: "unit price must be a number" })
    .nonnegative("unit price must not be negative"),
  quantity: z.coerce
    .number({ message: "quantity must be a number" })
    .int("quantity must be a whole number")
    .min(0, "quantity cannot be negative"),
});

const isBlank = (value: unknown): boolean =>
  typeof value !== "string" || value.trim() === "";

export type ProductPayload = {
  title: string;
  description: string;
  unitPrice: number;
  quantity: number;
  images: File[];
};

type ValidateResult =
  | { data: ProductPayload; errors?: undefined }
  | { data?: undefined; errors: Record<string, string> };

const validateImages = (images: File[], isEditMode: boolean): string | null => {
  if (images.length === 0) {
    return isEditMode ? null : "at least 1 image is required";
  }

  if (images.length > MAX_IMAGE_COUNT) {
    return `you can upload up to ${MAX_IMAGE_COUNT} images`;
  }

  const invalidType = images.find(file => !ACCEPTED_IMAGE_TYPES.includes(file.type));
  if (invalidType) {
    return `image must be a ${ACCEPTED_IMAGE_LABEL} file`;
  }

  const tooLarge = images.find(file => file.size > MAX_IMAGE_SIZE_BYTES);
  if (tooLarge) {
    return `each image must be ${MAX_IMAGE_SIZE_MB}MB or smaller`;
  }

  return null;
};

export const validateProduct = (
  input: Record<string, unknown>,
  images: File[],
  { isEditMode = false }: { isEditMode?: boolean } = {},
): ValidateResult => {
  const imageError = validateImages(images, isEditMode);

  if (imageError) {
    return { errors: { image: imageError } };
  }

  const requiredErrors: Record<string, string> = {};
  if (isBlank(input.unitPrice)) requiredErrors.unitPrice = "unit price is required";
  if (isBlank(input.quantity)) requiredErrors.quantity = "quantity is required";

  if (Object.keys(requiredErrors).length > 0) {
    return { errors: requiredErrors };
  }

  const baseResult = baseSchema.safeParse({
    title: input.title,
    description: input.description,
    unitPrice: input.unitPrice,
    quantity: input.quantity,
  });

  if (!baseResult.success) {
    const errors: Record<string, string> = {};
    for (const issue of baseResult.error.issues) {
      const key = issue.path[0]?.toString() ?? "form";
      if (!errors[key]) errors[key] = issue.message;
    }
    return { errors };
  }

  return {
    data: {
      ...baseResult.data,
      images,
    },
  };
};
