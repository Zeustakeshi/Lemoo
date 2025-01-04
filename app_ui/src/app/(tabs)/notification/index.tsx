import Button from "@/components/ui/Button";
import SceenHeaderBack from "@/components/ui/SceenHeaderBack";
import NotificationCard from "@/modules/notification/NotificationCard";
import NotificationGroup from "@/modules/notification/NotificationGroup";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import React from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";

type Props = {};
const { width } = Dimensions.get("window");
const index = (props: Props) => {
    return (
        <View style={{ width }} className="flex-1 w-full">
            <SceenHeaderBack>Thông báo</SceenHeaderBack>
            <ScrollView>
                <NotificationGroup>
                    <NotificationCard
                        icon={
                            <Ionicons
                                name="ticket-outline"
                                size={24}
                                color="#f43f5e"
                            />
                        }
                        iconColor="#f43f5e"
                        title="Khuyễn mãi"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, alias ut. Consequuntur amet nemo non repellat quasi placeat aut impedit!"
                        to="/home"
                    />

                    <NotificationCard
                        icon={
                            <Feather name="users" size={24} color="#22c55e" />
                        }
                        iconColor="#22c55e"
                        title="Bạn bè"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, alias ut. Consequuntur amet nemo non repellat quasi placeat aut impedit!"
                        to="/home"
                    />

                    <NotificationCard
                        icon={
                            <Feather
                                name="shopping-bag"
                                size={24}
                                color="#3b82f6"
                            />
                        }
                        iconColor="#3b82f6"
                        title="Thông báo từ lemoo"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, alias ut. Consequuntur amet nemo non repellat quasi placeat aut impedit!"
                        to="/home"
                    />

                    <NotificationCard
                        icon={
                            <AntDesign name="staro" size={24} color="#eab308" />
                        }
                        iconColor="#eab308"
                        title="Cập nhật đánh giá"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, alias ut. Consequuntur amet nemo non repellat quasi placeat aut impedit!"
                        to="/home"
                    />
                </NotificationGroup>
                <NotificationGroup
                    title="Cập nhật đơn hàng"
                    linkLabel="Xem tất cả"
                    to="/"
                    className="flex-1 justify-center items-center"
                >
                    {/* {new Array(4).fill(0).map((item, index) => (
                        <NotificationCard
                            key={index}
                            image="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
                            title="Giao hàng thành công"
                            description="Bạn vui lòng kiểm tra tất cả sản phẩm trong đơn hàng 190705010247AGP - đã giao ngày 08-07-2019. Nếu bạn hài lòng với sản phẩm, hãy xác nhận đã nhận hàng trong vòng 7 ngày để người bán được nhận tiền sớm hơn. Đừng quên đánh giá sản phẩm để nhận 100 xu nhé!"
                            to="/home"
                            descriptionLine={5}
                        />
                    ))} */}
                    <View className="flex-1 justify-center items-center ">
                        <LottieView
                            style={{
                                width: 100,
                                height: 100,
                                marginTop: 20,
                            }}
                            source={require("../../../assets/images/animations/empty-list.json")}
                            autoPlay
                            loop
                        />
                        <Text className="mt-2 mb-8 text-sm text-muded">
                            Bạn chưa có đơn hàng nào
                        </Text>
                        <Button>
                            <Text className="text-white">Mua Sắm ngay</Text>
                        </Button>
                    </View>
                </NotificationGroup>
            </ScrollView>
        </View>
    );
};

export default index;
