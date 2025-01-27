import { CartResponse } from "@/common/type/cart.type";

export const cartData: CartResponse = {
    id: "cart-001",
    items: [
        {
            id: "item-001",
            storeId: "store-001",
            skus: [
                {
                    lemooSku: "sku-001",
                    productId: "prod-001",
                    image: "https://img.lazcdn.com/g/p/28df49ba07be9ebbb67b275bfe5a635e.jpg_120x120q80.jpg_.webp",
                    quantity: 2,
                    price: 199.99,
                    variants: {
                        ["màu sắc"]: "đỏ",
                        ["kích thước"]: "xl",
                    },
                },
                {
                    lemooSku: "sku-002",
                    productId: "prod-002",
                    image: "https://img.lazcdn.com/g/p/28df49ba07be9ebbb67b275bfe5a635e.jpg_120x120q80.jpg_.webp",
                    quantity: 1,
                    price: 89.99,
                    variants: {
                        ["màu sắc"]: "xanh",
                        ["chất liệu"]: "vải thô",
                    },
                },
            ],
        },
        {
            id: "item-002",
            storeId: "store-002",
            skus: [
                {
                    lemooSku: "sku-003",
                    productId: "prod-003",
                    image: "https://img.lazcdn.com/g/p/28df49ba07be9ebbb67b275bfe5a635e.jpg_120x120q80.jpg_.webp",
                    quantity: 3,
                    price: 49.99,
                    variants: {
                        ["màu sắc"]: "xanh",
                        ["chất liệu"]: "vải thô",
                    },
                },
            ],
        },
        {
            id: "item-003",
            storeId: "store-003",
            skus: [
                {
                    lemooSku: "sku-004",
                    productId: "prod-004",
                    image: "https://img.lazcdn.com/g/p/28df49ba07be9ebbb67b275bfe5a635e.jpg_120x120q80.jpg_.webp",
                    quantity: 1,
                    price: 399999,
                    variants: {
                        ["màu sắc"]: "trắng",
                        ["loại máy"]: "FXN90",
                    },
                },
                {
                    lemooSku: "sku-005",
                    productId: "prod-005",
                    image: "https://img.lazcdn.com/g/p/28df49ba07be9ebbb67b275bfe5a635e.jpg_120x120q80.jpg_.webp",
                    quantity: 4,
                    price: 10000,
                    variants: {
                        ["màu sắc"]: "đen",
                        ["loại máy"]: "FXN90",
                    },
                },
            ],
        },
    ],
};
