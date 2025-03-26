import { getAllOrder } from "@/api/order.api";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const orders = [
  {
    id: "ORD123456",
    paymentMethod: "CREDIT_CARD",
    orderDate: "2024-03-26T14:30:00Z",
    status: "DELIVERED",
    vouchers: ["DISCOUNT10"],
    items: [
      {
        lemooSku: "SKU001",
        image:
          "https://i.pinimg.com/736x/dd/73/dc/dd73dcfae5dbe8ebefc548943ac1695a.jpg",
        price: 100,
        quantity: 2,
      },
      {
        lemooSku: "SKU002",
        image:
          "https://i.pinimg.com/736x/35/e0/3d/35e03d1b5e39b16b7fc1dc55e580544f.jpg",
        price: 50,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD123457",
    paymentMethod: "PAYPAL",
    orderDate: "2024-03-25T10:15:00Z",
    status: "PENDING",
    vouchers: ["ưu đãi ngập tràn tháng 3"],
    items: [
      {
        lemooSku: "SKU003",
        image:
          "https://i.pinimg.com/474x/90/1e/6c/901e6c64c3f87d3ccde2e5f9a44b4342.jpg",
        price: 75,
        quantity: 3,
      },
    ],
  },
  {
    id: "ORD123458",
    paymentMethod: "COD",
    orderDate: "2024-03-24T08:00:00Z",
    status: "CONFIRMED",
    vouchers: ["FREESHIP"],
    items: [
      {
        lemooSku: "SKU004",
        image:
          "https://i.pinimg.com/736x/57/e4/7b/57e47b709e0ea9d81a0a6f27b326bb27.jpg",
        price: 120,
        quantity: 1,
      },
      {
        lemooSku: "SKU005",
        image:
          "https://i.pinimg.com/736x/1b/20/52/1b20520d29cfa685f23dc07934e0bae3.jpg",
        price: 200,
        quantity: 2,
      },
    ],
  },
  {
    id: "ORD123459",
    paymentMethod: "COD",
    orderDate: "2024-03-24T08:00:00Z",
    status: "CONFIRMED",
    vouchers: ["FREESHIP"],
    items: [
      {
        lemooSku: "SKU006",
        image:
          "https://i.pinimg.com/736x/6e/8e/05/6e8e058ed83422f2f885fdff27be8062.jpg",
        price: 120,
        quantity: 1,
      },
      {
        lemooSku: "SKU007",
        image:
          "https://i.pinimg.com/736x/5a/5e/10/5a5e10cf35c07da59ba1733d2cb75277.jpg",
        price: 200,
        quantity: 2,
      },
    ],
  },
];

const OrderTable = ({ status }: { status: string }) => {
  const storeId = JSON.parse(sessionStorage.getItem("storeInfo") || "{}");

  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => await getAllOrder(storeId.id),
  });
  console.log("Order", data);
  const [orderList, setOrderList] = useState(orders);

  const updateOrderStatus = (id: string, newStatus: string) => {
    setOrderList((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders = orderList.filter((order) => order.status === status);
  console.log("filteredOrders: ", filteredOrders);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead> </TableHead>
          <TableHead>Sản Phẩm</TableHead>
          <TableHead>Giảm Giá</TableHead>
          <TableHead>Giá</TableHead>
          <TableHead>Số Lượng</TableHead>
          <TableHead>Ngày Đặt</TableHead>
          <TableHead>Tổng cộng</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredOrders.map((order) => (
          <>
            <div className="flex items-center justify-center space-x-3 p-2 m-2 border rounded-lg">
              <h1 className="font-semibold">Mã đơn hàng: </h1>
              <span>{order.id}</span>
            </div>
            {order.items.map((item) => (
              <TableRow key={item.lemooSku}>
                <TableCell>
                  <img
                    src={item.image}
                    alt={item.lemooSku}
                    className="w-12 h-12"
                  />
                </TableCell>

                <TableCell>{item.lemooSku}</TableCell>
                <TableCell>{order.vouchers}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>${item.quantity * item.price}</TableCell>

                {status === "PENDING" && (
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">xác nhận</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() =>
                            updateOrderStatus(order.id, "delivery")
                          }
                        >
                          Xác nhận đơn hàng
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            updateOrderStatus(order.id, "canceled")
                          }
                        >
                          Từ chối
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
                {status === "CONFIRMED" && (
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">xác nhận</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() =>
                            updateOrderStatus(order.id, "delivery")
                          }
                        >
                          Đã ship đi
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            updateOrderStatus(order.id, "canceled")
                          }
                        >
                          Hủy
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderTable;
