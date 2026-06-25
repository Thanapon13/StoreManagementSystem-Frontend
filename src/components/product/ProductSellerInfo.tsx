import { Store } from "lucide-react";

type ProductSellerInfoProps = {
  email?: string;
};

const ProductSellerInfo = ({ email }: ProductSellerInfoProps) => {
  if (!email) return null;

  return (
    <div className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted">
        <Store className="size-3.5" />
      </span>
      <span className="truncate">{email}</span>
    </div>
  );
};

export default ProductSellerInfo;
