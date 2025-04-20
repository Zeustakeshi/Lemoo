// import { useNavigate } from "@tanstack/react-router";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { AddressResponse } from "@/common/type/AddressResponse";
// import { sellerInfo } from "@/api/address.api";

// // Định nghĩa type cho AddressResponse dựa trên dữ liệu API

// const UpdateAddress: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const [addresses, setAddresses] = useState<AddressResponse[]>([]);
//   const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
//     null
//   );

//   // Fetch danh sách địa chỉ khi component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await sellerInfo();
//         console.log("Data get address:", response);
//         const addressList = response.content || [];
//         setAddresses(addressList);
//         const defaultAddress = addressList.find(
//           (addr) => addr.isDefault == true
//         );
//         console.log("Data get defaultAddress:", defaultAddress);
//         if (defaultAddress) {
//           setSelectedAddressId(defaultAddress.id);
//         }
//       } catch (error) {
//         console.error("Error fetching addresses:", error);
//         toast.error("Không thể tải danh sách địa chỉ");
//       }
//     };
//     fetchData();
//   }, []);

//   // Xử lý chọn địa chỉ mặc định
//   const handleSetDefault = (id: string) => {
//     setAddresses((prevAddresses) =>
//       prevAddresses.map((address) => ({
//         ...address,
//         isDefault: address.id === id,
//       }))
//     );
//     setSelectedAddressId(id);
//   };

//   // Điều hướng đến trang thêm địa chỉ mới
//   const handleAddAddress = () => {
//     navigate({ to: "/customer" });
//   };

//   // Xử lý cập nhật địa chỉ mặc định
//   const handleUpdate = async () => {
//     if (!selectedAddressId) {
//       toast.error("Vui lòng chọn ít nhất một địa chỉ");
//       return;
//     }

//     try {
//       await updateAddress(selectedAddressId);
//       const customerAdress = await customerInfo();
//       if (customerAdress) {
//         dispatch(updateCustomer(customerAdress));
//       } else {
//         console.error("Customer address is null");
//         toast.error("Không thể cập nhật địa chỉ khách hàng");
//       }
//       toast.success("Cập nhật địa chỉ thành công!");
//       // navigate({ to: "/cart" });
//       navigate({ to: "/order" });
//     } catch (error) {
//       toast.error("Cập nhật địa chỉ thất bại!");
//       console.error("Update error:", error);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl">Cập nhật địa chỉ giao hàng</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {/* Danh sách địa chỉ */}
//           <div className="space-y-4 mb-6">
//             {addresses.length > 0 ? (
//               addresses.map((address) => (
//                 <div
//                   key={address.id}
//                   className={`p-4 border rounded-lg ${
//                     address.isDefault
//                       ? "border-blue-500 bg-blue-50"
//                       : "border-gray-200"
//                   }`}
//                 >
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <Label className="font-semibold">
//                         {address.recipientName}
//                       </Label>
//                       <p>
//                         {address.address.detail}, {address.address.ward.name},{" "}
//                         {address.address.district.name},{" "}
//                         {address.address.province.name}
//                       </p>

//                       <p>Điện thoại: {address.recipientPhone}</p>
//                       <p className="text-sm text-gray-300">
//                         Loại: {address.type}
//                       </p>
//                     </div>
//                     <Button
//                       onClick={() => handleSetDefault(address.id)}
//                       variant={address.isDefault ? "default" : "outline"}
//                       disabled={address.isDefault}
//                       className={`px-3 py-1 ${
//                         address.isDefault
//                           ? "cursor-default"
//                           : "hover:bg-gray-500"
//                       }`}
//                     >
//                       {address.isDefault ? "Mặc định" : "Đặt làm mặc định"}
//                     </Button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">Chưa có địa chỉ nào</p>
//             )}
//           </div>

//           {/* Nút hành động */}
//           <div className="space-y-4">
//             <Button
//               onClick={handleAddAddress}
//               className="w-full bg-blue-500 hover:bg-blue-600"
//             >
//               Thêm địa chỉ mới
//             </Button>
//             <Button
//               onClick={handleUpdate}
//               className="w-full bg-green-500 hover:bg-green-600"
//               disabled={!selectedAddressId}
//             >
//               Cập nhật
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default UpdateAddress;
