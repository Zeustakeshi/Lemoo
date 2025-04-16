import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const orderData = {
  content:
    "đen - nhựa [LM_2kZS11_1N0314_p3jE5HB] [1 cái], đen - kính [LM_2kZS11_ge6xN_p3jE5HB] [1 cái]",
  shippingOrderCode: "LBUX44",
  totalAmount: 0,
  orderId: "67fe3f43d63cc26e39880a1b",
  logs: [
    {
      status: "PICKED",
      tripCode: "",
      updatedDate: "2025-04-15T14:00:52.641",
    },
    {
      status: "PICKING",
      tripCode: "",
      updatedDate: "2025-04-15T11:18:32.734",
    },
  ],
  leadtimeOrder: {
    from_estimate_date: "2025-04-17T16:59:59Z",
    to_estimate_date: "2025-04-17T16:59:59Z",
    picked_date: "2025-04-15T14:00:52.63Z",
  },
  status: "PICKED",
};

const statusLabels: Record<string, string> = {
  PICKED: "Đã lấy hàng",
  PICKING: "Đang lấy hàng",
  SHIPPING: "Đang giao hàng",
  DELIVERED: "Đã giao hàng",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${hh}:${min} ${dd}/${mm}/${yyyy}`;
}

export default function OrderTracking() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <motion.h1
        className="text-2xl font-bold text-center text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Theo Dõi Đơn Hàng (fake data)
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="rounded-2xl shadow-xl">
          <CardContent className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Mã đơn hàng</p>
                <p className="text-lg font-semibold">
                  {orderData.shippingOrderCode}
                </p>
              </div>
              <div
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  orderData.status === "PICKED"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {statusLabels[orderData.status] || orderData.status}
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground mb-1">Sản phẩm</p>
              <p className="text-base font-medium text-gray-800">
                {orderData.content}
              </p>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Lịch sử đơn hàng
              </p>
              <div className="space-y-3 pl-4 border-l-2 border-primary">
                {orderData.logs.map((log, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col gap-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <p className="font-medium text-gray-800">
                      {statusLabels[log.status] || log.status}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(log.updatedDate)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">
                Dự kiến giao hàng
              </p>
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                {formatDate(orderData.leadtimeOrder.from_estimate_date)}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
