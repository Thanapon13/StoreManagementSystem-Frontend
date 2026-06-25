import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmptyState from "@/components/common/EmptyState";
import ProductTableRow from "@/components/dashboard/ProductTableRow";
import type { Product } from "@/types/product";

type ProductListProps = {
  products: Product[];
  onAddProduct: () => void;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
};

const ProductList = ({
  products,
  onAddProduct,
  onEdit,
  onDelete,
}: ProductListProps) => {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={Store}
        title="No products yet"
        description="Create your first product to start selling."
        action={
          <Button className="rounded-full shadow-sm" onClick={onAddProduct}>
            Add Product
          </Button>
        }
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-foreground/5">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map(product => (
            <ProductTableRow
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductList;
