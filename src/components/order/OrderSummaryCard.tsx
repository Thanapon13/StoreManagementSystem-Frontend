import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import OrderStatusBadge from "@/components/order/OrderStatusBadge";
import type { OrderWithItems } from "@/types";
import type { ReactNode } from "react";

interface OrderSummaryCardProps {
  order: OrderWithItems;
  footer?: ReactNode;
}

const OrderSummaryCard = ({ order, footer }: OrderSummaryCardProps) => {
  return (
    <Card className="rounded-3xl shadow-sm ring-1 ring-foreground/5">
      <CardHeader className="flex-row items-start justify-between">
        <div>
          <CardTitle>Order #{order.id}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <img src={item.product.image} alt={item.product.title} className="size-12 rounded-xl object-cover" />
            <div className="flex-1">
              <p className="text-sm font-medium">{item.product.title}</p>
              <p className="text-xs text-muted-foreground">
                {item.quantity} x ฿{item.price_at_purchase.toLocaleString()}
              </p>
            </div>
            <p className="text-sm font-medium">
              ฿{(item.quantity * item.price_at_purchase).toLocaleString()}
            </p>
          </div>
        ))}
        <p className="text-right font-semibold">
          Total: <span className="text-primary">฿{order.total_price.toLocaleString()}</span>
        </p>
      </CardContent>
      {footer && <CardFooter className="justify-end gap-2 rounded-b-3xl">{footer}</CardFooter>}
    </Card>
  );
};

export default OrderSummaryCard;
