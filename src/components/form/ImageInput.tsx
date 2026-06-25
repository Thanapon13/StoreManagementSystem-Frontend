import { useEffect, useId, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import FieldError from "@/components/error/FieldError";
import {
  ACCEPTED_IMAGE_LABEL,
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_COUNT,
  MAX_IMAGE_SIZE_MB,
} from "@/validators/validate-product";

type ImageInputProps = {
  files: File[];
  onChange: (files: File[]) => void;
  error?: string;
  existingImages?: string[];
};

type Preview = { key: string; url: string };

const ImageInput = ({
  files,
  onChange,
  error,
  existingImages = [],
}: ImageInputProps) => {
  const inputId = useId();
  const [previews, setPreviews] = useState<Preview[]>([]);

  useEffect(() => {
    const next = files.map((file, index) => ({
      key: `${file.name}-${file.lastModified}-${index}`,
      url: URL.createObjectURL(file),
    }));
    setPreviews(next);

    return () => {
      next.forEach(preview => URL.revokeObjectURL(preview.url));
    };
  }, [files]);

  const showExisting = files.length === 0 && existingImages.length > 0;
  const remainingSlots = MAX_IMAGE_COUNT - files.length;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    onChange([...files, ...selected].slice(0, MAX_IMAGE_COUNT));
    e.target.value = "";
  };

  const handleRemove = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={inputId}>Product images</Label>

      <div className="flex flex-wrap gap-3">
        {showExisting &&
          existingImages.map((url, index) => (
            <div
              key={url}
              className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-input"
            >
              <img
                src={url}
                alt={`Product ${index + 1}`}
                className="size-full object-cover"
              />
            </div>
          ))}

        {previews.map((preview, index) => (
          <div
            key={preview.key}
            className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-input"
          >
            <img
              src={preview.url}
              alt={`Selected ${index + 1}`}
              className="size-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              aria-label="Remove image"
              className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm"
            >
              <X className="size-3" />
            </button>
          </div>
        ))}

        {remainingSlots > 0 && (
          <label
            htmlFor={inputId}
            className="flex size-20 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-input bg-muted/40 text-muted-foreground hover:border-ring"
          >
            <ImagePlus className="size-5" />
            <span className="text-xs">Add</span>
          </label>
        )}
      </div>

      <input
        id={inputId}
        type="file"
        multiple
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        onChange={handleFileChange}
        className="sr-only"
      />

      <p className="text-xs text-muted-foreground">
        {ACCEPTED_IMAGE_LABEL} ไม่เกินรูปละ {MAX_IMAGE_SIZE_MB}MB (สูงสุด{" "}
        {MAX_IMAGE_COUNT} รูป) — เลือกแล้ว {files.length}/{MAX_IMAGE_COUNT}
      </p>

      <FieldError message={error} />
    </div>
  );
};

export default ImageInput;
