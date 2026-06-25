import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import { SubmitButton } from "@/components/buttons/Buttons";
import FieldError from "@/components/error/FieldError";
import { createProduct, updateProduct } from "@/apis/product-api";
import { validateProduct } from "@/validators/validate-product";
import type { ActionState, actionFunction } from "@/utils/types";
import type { Product } from "@/types/product";

const initialInput = {
  title: "",
  description: "",
  unitPrice: "",
  quantity: "",
};

type ProductFormProps = {
  product?: Product | null;
  onSuccess?: () => void;
};

const ProductForm = ({ product, onSuccess }: ProductFormProps) => {
  const isEditMode = Boolean(product);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [input, setInput] = useState(
    product
      ? {
          title: product.title,
          description: product.description,
          unitPrice: String(product.unit_price),
          quantity: String(product.quantity),
        }
      : initialInput,
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const productAction: actionFunction = async (
    _prevState,
    formData,
  ): Promise<ActionState> => {
    setErrors({});

    const rawData = Object.fromEntries(
      Array.from(formData.entries()).filter(([key]) => !key.startsWith("$")),
    );

    const { data, errors: validationErrors } = validateProduct(
      rawData,
      imageFiles,
      { isEditMode },
    );

    if (validationErrors) {
      setErrors(validationErrors);
      return { message: "validation error", errors: validationErrors };
    }

    try {
      formData.set("title", data.title);
      formData.set("description", data.description ?? "");
      formData.set("unitPrice", String(data.unitPrice));
      formData.set("quantity", String(data.quantity));
      data.images.forEach(file => formData.append("images", file));

      const { data: response } = isEditMode
        ? await updateProduct(product!.id, formData)
        : await createProduct(formData);
      toast.success(response.message);
      onSuccess?.();
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

  return (
    <FormContainer action={productAction} className="flex flex-col gap-4">
      <FieldError message={errors.form} />

      <div>
        <FormInput
          name="title"
          type="text"
          label="Title"
          value={input.title}
          onChange={handleChangeInput}
        />
        <FieldError message={errors.title} />
      </div>

      <div>
        <FormInput
          name="description"
          type="text"
          label="Description"
          value={input.description}
          onChange={handleChangeInput}
        />
        <FieldError message={errors.description} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <FormInput
            name="unitPrice"
            type="number"
            label="Price (฿)"
            value={input.unitPrice}
            onChange={handleChangeInput}
          />
          <FieldError message={errors.unitPrice} />
        </div>

        <div>
          <FormInput
            name="quantity"
            type="number"
            label="Quantity"
            value={input.quantity}
            onChange={handleChangeInput}
          />
          <FieldError message={errors.quantity} />
        </div>
      </div>

      <ImageInput
        files={imageFiles}
        onChange={setImageFiles}
        error={errors.image}
        existingImages={product?.image ? [product.image] : []}
      />

      <SubmitButton
        text={isEditMode ? "Save changes" : "Create product"}
        size="sm"
        className="mt-2 rounded-full shadow-sm"
        pendingText="Saving..."
      />
    </FormContainer>
  );
};

export default ProductForm;
