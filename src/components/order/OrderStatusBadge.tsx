import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/types";

const STATUS_CLASS: Record<OrderStatus, string> = {
  pending: "bg-secondary text-secondary-foreground",
  paid: "bg-accent text-accent-foreground",
  shipped: "bg-primary/15 text-primary",
  completed: "bg-primary text-primary-foreground",
  cancelled: "",
};

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  shipped: "Shipped",
  completed: "Completed",
  cancelled: "Cancelled",
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  return (
    <Badge
      variant={status === "cancelled" ? "destructive" : "outline"}
      className={cn("rounded-full border-transparent px-3", STATUS_CLASS[status])}
    >
      {STATUS_LABEL[status]}
    </Badge>
  );
};

export default OrderStatusBadge;
