import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductForm from "@/components/dashboard/ProductForm";
import ProductList from "@/components/dashboard/ProductList";
import ProductsPagination from "@/components/dashboard/ProductsPagination";
import { myProducts, deleteProduct } from "@/apis/product-api";
import { toProduct } from "@/utils/map-product";
import type { Product } from "@/types/product";

const SellerDashboardPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const { data } = await myProducts();

      setProducts(data.data.map(toProduct));
    } catch {
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [products, pageSize, page]);

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  const paginatedProducts = products.slice((page - 1) * pageSize, page * pageSize);

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId);
      setProducts(prev => prev.filter(p => p.id !== productId));
      toast.success("Product deleted.");
    } catch (err) {
      const message =
        (axios.isAxiosError(err) && err.response?.data?.message) ||
        "Failed to delete product.";
      toast.error(message);
    }
  };

  const openCreateDialog = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleFormSuccess = () => {
    setDialogOpen(false);
    fetchProducts();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">My Products</h1>
        <Button className="rounded-full shadow-sm" onClick={openCreateDialog}>
          <Plus /> Add Product
        </Button>
      </div>

      <ProductList
        products={paginatedProducts}
        loading={loading}
        pageSize={pageSize}
        onAddProduct={openCreateDialog}
        onEdit={openEditDialog}
        onDelete={handleDelete}
      />

      {!loading && products.length > 0 && (
        <ProductsPagination
          page={page}
          pageSize={pageSize}
          total={products.length}
          onPageChange={setPage}
          onPageSizeChange={handlePageSizeChange}
        />
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add Product"}
            </DialogTitle>
          </DialogHeader>
          <ProductForm product={editingProduct} onSuccess={handleFormSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellerDashboardPage;
