import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ClipboardList } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import OrderSummaryCard from "@/components/order/OrderSummaryCard";
import EmptyState from "@/components/common/EmptyState";
import { sellerOrders, updateOrderStatus } from "@/apis/order-api";
import { toOrder } from "@/utils/map-order";
import type { OrderStatus, OrderWithItems } from "@/types";

const STATUS_OPTIONS: OrderStatus[] = ["pending", "paid", "shipped", "completed", "cancelled"];

const SellerOrdersPage = () => {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await sellerOrders();
      setOrders(data.data.map(toOrder));
    } catch {
      toast.error("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    const previousOrders = orders;
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)));

    try {
      await updateOrderStatus(orderId, status);
      toast.success("Order status updated.");
    } catch (err) {
      const message =
        (axios.isAxiosError(err) && err.response?.data?.message) || "Failed to update order status.";
      toast.error(message);
      setOrders(previousOrders);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Orders for My Products</h1>

      {loading ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-40 w-full rounded-3xl" />
          <Skeleton className="h-40 w-full rounded-3xl" />
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No orders yet"
          description="Orders containing your products will show up here."
        />
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <OrderSummaryCard
              key={order.id}
              order={order}
              footer={
                <Select
                  value={order.status}
                  onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                >
                  <SelectTrigger className="w-40 rounded-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerOrdersPage;
