// import các thư viện UI và animation
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TrendingUp, ShoppingCart, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const stats = [
  {
    title: "Doanh thu",
    value: "$12,500",
    change: "+12.5%",
    icon: <ShoppingCart className="text-green-600" />,
    color: "bg-green-100",
  },
  {
    title: "Đơn hàng",
    value: "320",
    change: "+8.2%",
    icon: <ShoppingCart className="text-blue-600" />,
    color: "bg-blue-100",
  },
  {
    title: "Khách hàng",
    value: "150",
    change: "+5.7%",
    icon: <Users className="text-purple-600" />,
    color: "bg-purple-100",
  },
];

export default function StoreDashboard() {
  const [filter, setFilter] = useState("month");

  return (
    <div className="flex flex-col gap-8 p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Bảng điều khiển cửa hàng
        </h1>
        <p className="text-gray-600">
          Cập nhật thống kê và hiệu suất kinh doanh
        </p>
      </div>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div key={idx} whileHover={{ scale: 1.03 }} className="w-full">
            <Card className="rounded-2xl shadow-md">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-1">
                    {stat.title}
                  </h2>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {stat.change} so với tháng trước
                  </div>
                </div>
                <div className={`p-4 rounded-full ${stat.color}`}>
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs lọc theo ngày, tuần, tháng */}
      <Tabs defaultValue="month" onValueChange={setFilter} className="w-full">
        <TabsList className="bg-white justify-center">
          <TabsTrigger value="day">Ngày</TabsTrigger>
          <TabsTrigger value="week">Tuần</TabsTrigger>
          <TabsTrigger value="month">Tháng</TabsTrigger>
        </TabsList>

        <TabsContent value="day">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <StatChart title="Doanh thu theo ngày" />
            <StatChart title="Đơn hàng theo ngày" />
            <StatChart title="Sản phẩm bán chạy theo ngày" />
          </div>
        </TabsContent>

        <TabsContent value="week">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <StatChart title="Doanh thu theo tuần" />
            <StatChart title="Đơn hàng theo tuần" />
            <StatChart title="Sản phẩm bán chạy theo tuần" />
          </div>
        </TabsContent>

        <TabsContent value="month">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <StatChart title="Doanh thu theo tháng" />
            <StatChart title="Đơn hàng theo tháng" />
            <StatChart title="Sản phẩm bán chạy theo tháng" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatChart({ title }: { readonly title: string }) {
  const chartData = [400, 500, 600, 550, 700, 800, 750];
  const xLabels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
        <div className="h-48">
          <LineChart
            xAxis={[{ scaleType: "point", data: xLabels }]}
            series={[{ data: chartData }]}
            height={180}
          />
        </div>
      </CardContent>
    </Card>
  );
}
