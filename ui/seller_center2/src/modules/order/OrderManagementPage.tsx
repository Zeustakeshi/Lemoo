import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderTable from "./OrderTable";

export const OrderManagementPage = () => {
  return (
    <Card className="max-w-6xl mx-auto mt-6 p-6 shadow-xl rounded-2xl">
      <h1 className="text-2xl font-bold text-center text-gray-700 p-5">
        Quản Lý Đơn Hàng
      </h1>
      <CardContent>
        <Tabs defaultValue="PENDING" className="space-y-6">
          <TabsList className="flex gap-4 p-2 bg-gray-100 rounded-lg">
            <TabsTrigger
              value="PENDING"
              className="px-4 py-2 text-gray-700 font-semibold rounded-lg hover:bg-gray-200"
            >
              Đơn Hàng Chờ Xác Nhận
            </TabsTrigger>
            <TabsTrigger
              value="CONFIRMED"
              className="px-4 py-2 text-gray-700 font-semibold rounded-lg hover:bg-gray-200"
            >
              Đơn Đã Xác Nhận
            </TabsTrigger>
            <TabsTrigger
              value="DELIVERED"
              className="px-4 py-2 text-gray-700 font-semibold rounded-lg hover:bg-gray-200"
            >
              Đã Giao
            </TabsTrigger>
          </TabsList>
          {/* Bảng */}
          <TabsContent value="PENDING">
            <OrderTable status="PENDING" />
          </TabsContent>
          <TabsContent value="CONFIRMED">
            <OrderTable status="CONFIRMED" />
          </TabsContent>
          <TabsContent value="DELIVERED">
            <OrderTable status="DELIVERED" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
