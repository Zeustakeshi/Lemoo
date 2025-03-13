import {
    ArrowForward,
    CreditCard,
    Diamond,
    Facebook,
    Instagram,
    LocalOffer,
    Shield,
    ShoppingCart,
    Twitter,
    Watch,
} from "@mui/icons-material";
import { Avatar, Button, Container, Paper } from "@mui/material";
import Spline from "@splinetool/react-spline";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getRefreshToken } from "./helpers/utils/getRefreshToken";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

function App() {
    const [enterSystem, setEnterSystem] = useState(false);

    const handleEnterSystem = () => {
        setEnterSystem(true);
    };

    useEffect(() => {
        const checkAuth = async () => {
            const token = await getRefreshToken();
            if (token) {
                setEnterSystem(true);
            }
        };
        checkAuth();
    }, []);

    return (
        <div>
            {!enterSystem ? (
                <div className="font-sans">
                    {/* Hero Section */}
                    <div className="relative w-full h-screen bg-gradient-to-b from-indigo-100 to-blue-200 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0">
                            <Spline scene="https://prod.spline.design/6zqe11N78Cn1T1Uz/scene.splinecode" />
                        </div>
                        <div
                            style={{
                                background: "rgba(255, 255, 255, 0.23)",
                                borderRadius: "16px",
                                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                                backdropFilter: "blur(6.4px)",
                                WebkitBackdropFilter: "blur(6.4px)",
                                border: "1px solid rgba(255, 255, 255, 0.3)",
                            }}
                            className="relative z-10 text-center p-8 max-w-xl animate-fadeIn"
                        >
                            <h1 className="text-5xl font-bold text-gray-800">
                                Welcome to!{" "}
                                <span className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
                                    Lemoo Seller Center
                                </span>
                            </h1>
                            <p className="text-lg font-semibold text-gray-700 mt-4">
                                Bắt đầu hành trình kinh doanh của bạn ngay hôm
                                nay!
                            </p>
                            <button
                                onClick={handleEnterSystem}
                                className="mt-8 inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-semibold text-lg rounded-full shadow-xl hover:bg-indigo-700 transform hover:scale-105 transition duration-300 ease-in-out"
                            >
                                Bắt đầu ngay! <ArrowForward className="ml-2" />
                            </button>
                        </div>
                    </div>

                    {/* Categories Section */}
                    <section className="py-16 bg-gray-50 animate-slideUp">
                        <Container>
                            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                                Danh mục phổ biến
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                                {[
                                    {
                                        icon: <Diamond fontSize="large" />,
                                        title: "Trang sức",
                                    },
                                    {
                                        icon: <Watch fontSize="large" />,
                                        title: "Đồng hồ",
                                    },
                                    {
                                        icon: <Diamond fontSize="large" />,
                                        title: "Trang sức",
                                    },
                                    {
                                        icon: <Watch fontSize="large" />,
                                        title: "Đồng hồ",
                                    },
                                ].map((item, index) => (
                                    <Paper
                                        key={index}
                                        elevation={3}
                                        className="p-6 text-center rounded-xl transition transform hover:scale-105 hover:shadow-2xl duration-300"
                                    >
                                        <Avatar
                                            className="bg-indigo-100 text-indigo-600 mb-4 mx-auto"
                                            sx={{ width: 56, height: 56 }}
                                        >
                                            {item.icon}
                                        </Avatar>
                                        <h3 className="text-2xl font-semibold text-gray-700">
                                            {item.title}
                                        </h3>
                                    </Paper>
                                ))}
                            </div>
                        </Container>
                    </section>

                    {/* Promotions Section */}
                    <section className="bg-indigo-600 text-white py-20 animate-fadeIn">
                        <Container className="text-center">
                            <h2 className="text-4xl font-bold mb-8">
                                Khuyến mãi lớn nhất trong năm!
                            </h2>
                            <div className="flex justify-center space-x-6 mb-10">
                                {[
                                    { time: "03", label: "Ngày" },
                                    { time: "18", label: "Giờ" },
                                    { time: "45", label: "Phút" },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white text-indigo-600 p-6 rounded-lg shadow-md min-w-[100px] transition transform hover:scale-105 duration-300"
                                    >
                                        <div className="text-3xl font-bold">
                                            {item.time}
                                        </div>
                                        <div className="mt-2">{item.label}</div>
                                    </div>
                                ))}
                            </div>
                            <Button
                                variant="contained"
                                className="bg-white text-indigo-600 hover:bg-gray-100 py-2 px-6 rounded-full text-lg shadow-md inline-flex items-center transition transform hover:scale-105 duration-300"
                            >
                                Mua ngay <ArrowForward className="ml-2" />
                            </Button>
                        </Container>
                    </section>

                    {/* Features Section */}
                    <section className="py-16 animate-slideUp">
                        <Container className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {[
                                {
                                    icon: <LocalOffer fontSize="large" />,
                                    title: "Giá tốt nhất",
                                    text: "Đảm bảo giá tốt nhất",
                                },
                                {
                                    icon: <Shield fontSize="large" />,
                                    title: "Thanh toán an toàn",
                                    text: "Thanh toán bảo vệ 100%",
                                },
                                {
                                    icon: <CreditCard fontSize="large" />,
                                    title: "Dễ dàng hoàn trả",
                                    text: "Chính sách hoàn trả trong 30 ngày",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-6 p-4 rounded-xl hover:bg-gray-100 transition transform hover:scale-105 duration-300"
                                >
                                    <Avatar
                                        className="bg-indigo-100 text-indigo-600"
                                        sx={{ width: 64, height: 64 }}
                                    >
                                        {item.icon}
                                    </Avatar>
                                    <div>
                                        <h3 className="text-2xl font-semibold text-gray-800">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 mt-1">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </Container>
                    </section>

                    {/* Footer */}
                    <footer className="bg-gray-900 text-white py-12 animate-fadeIn">
                        <Container className="grid grid-cols-1 md:grid-cols-4 gap-10">
                            <div>
                                <div className="flex items-center space-x-3 mb-4">
                                    <ShoppingCart
                                        className="text-white"
                                        fontSize="large"
                                    />
                                    <span className="text-2xl font-bold">
                                        Lemmo-Eco
                                    </span>
                                </div>
                                <p className="text-gray-400">
                                    Điểm đến mua sắm trực tuyến đáng tin cậy của
                                    bạn
                                </p>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold mb-4">
                                    Về chúng tôi
                                </h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li className="hover:text-white transition">
                                        <a href="#careers">Nghề nghiệp</a>
                                    </li>
                                    <li className="hover:text-white transition">
                                        <a href="#our-story">
                                            Câu chuyện của chúng tôi
                                        </a>
                                    </li>
                                    <li className="hover:text-white transition">
                                        <a href="#blog">Blog</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold mb-4">
                                    Dịch vụ khách hàng
                                </h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li className="hover:text-white transition">
                                        <a href="#help">Trung tâm trợ giúp</a>
                                    </li>
                                    <li className="hover:text-white transition">
                                        <a href="#track">Theo dõi đơn hàng</a>
                                    </li>
                                    <li className="hover:text-white transition">
                                        <a href="#returns">Hoàn trả</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold mb-4">
                                    Theo dõi chúng tôi
                                </h4>
                                <div className="flex space-x-4">
                                    <a
                                        href="https://www.instagram.com"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Instagram className="hover:text-indigo-400 transition cursor-pointer" />
                                    </a>
                                    <a
                                        href="https://www.facebook.com"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Facebook className="hover:text-indigo-400 transition cursor-pointer" />
                                    </a>
                                    <a
                                        href="https://www.twitter.com"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Twitter className="hover:text-indigo-400 transition cursor-pointer" />
                                    </a>
                                </div>
                            </div>
                        </Container>
                        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
                            © 2025 Lemmo-Eco. Bảo lưu mọi quyền.
                        </div>
                    </footer>
                </div>
            ) : (
                <RouterProvider router={router} />
            )}
        </div>
    );
}

export default App;
