import { Card, CardContent, Grid, useTheme } from "@mui/material";
import { TrendingUp, ShoppingCart, People } from "@mui/icons-material";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

const chartData = [
  { name: "Tháng 1", value: 4000 },
  { name: "Tháng 2", value: 3000 },
  { name: "Tháng 3", value: 5000 },
  { name: "Tháng 4", value: 2780 },
  { name: "Tháng 5", value: 1890 },
  { name: "Tháng 6", value: 2390 },
];

export default function StoreDashboard() {
  const theme = useTheme();

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Bảng điều khiển cửa hàng
        </h1>
        <p className="text-gray-600">
          Cập nhật thống kê và hiệu suất kinh doanh
        </p>
      </div>

      {/* Thống kê nhanh */}
      <Grid container spacing={4} className="mb-8">
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
              borderRadius: 3,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Doanh thu
                  </h2>
                  <p className="text-3xl font-bold text-green-600">$12,500</p>
                  <div className="flex items-center mt-2 text-green-500">
                    <TrendingUp className="mr-1" />
                    <span className="text-sm">+12.5% so với tháng trước</span>
                  </div>
                </div>
                <div className="bg-green-100 p-4 rounded-full">
                  <ShoppingCart className="text-green-600 text-2xl" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
              borderRadius: 3,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Đơn hàng
                  </h2>
                  <p className="text-3xl font-bold text-blue-600">320</p>
                  <div className="flex items-center mt-2 text-blue-500">
                    <TrendingUp className="mr-1" />
                    <span className="text-sm">+8.2% so với tháng trước</span>
                  </div>
                </div>
                <div className="bg-blue-100 p-4 rounded-full">
                  <ShoppingCart className="text-blue-600 text-2xl" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
              borderRadius: 3,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Khách hàng
                  </h2>
                  <p className="text-3xl font-bold text-purple-600">150</p>
                  <div className="flex items-center mt-2 text-purple-500">
                    <TrendingUp className="mr-1" />
                    <span className="text-sm">+5.7% so với tháng trước</span>
                  </div>
                </div>
                <div className="bg-purple-100 p-4 rounded-full">
                  <People className="text-purple-600 text-2xl" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Biểu đồ doanh thu */}
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          padding: 3,
        }}
      >
        <h3 className="text-xl font-semibold mb-4">Xu hướng doanh thu</h3>
        {/* <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke={theme.palette.primary.main}
                strokeWidth={2}
                dot={{ fill: theme.palette.primary.main }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div> */}
      </Card>
    </div>
  );
}
