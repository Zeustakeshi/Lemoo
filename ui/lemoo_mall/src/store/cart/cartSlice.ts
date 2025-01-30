import { CartItemType, CartType } from "@/common/type/cart.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface CartState {
    cart?: CartType;
    selectedCartItems: CartItemType[];
}

// Define the initial state using that type
const initialState: CartState = {
    selectedCartItems: [],
};

export const CartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        updateCart(state, action: PayloadAction<CartType>) {
            state.cart = action.payload;
        },
        removeCartItemFromSelectedCartItem(state) {
            if (!state.cart) return;
            state.cart.items = state.cart.items.filter(
                (item) =>
                    !state.selectedCartItems.some(
                        (selectedItem) => selectedItem.id === item.id
                    )
            );
        },
        removeCartItemSku(
            state,
            action: PayloadAction<{ cartItemId: string; skuCode: string }>
        ) {
            if (!state.cart) return;
            const { cartItemId, skuCode } = action.payload;

            const cartItem = state.cart.items.find(
                (item) => item.id === cartItemId
            );
            if (!cartItem) return;

            cartItem.skus = cartItem.skus.filter(
                (sku) => sku.lemooSku !== skuCode
            );

            state.cart.items = state.cart.items.filter(
                (item) => item.skus.length > 0
            );
        },
        setSelectedCartItems(state, action: PayloadAction<CartItemType[]>) {
            state.selectedCartItems = action.payload;
            console.log({ action });
        },
        selectAllCartItem(state) {
            state.selectedCartItems = state.cart?.items ?? [];
        },
        clearAllSelectedCartItem(state) {
            state.selectedCartItems = [];
        },
        selectCartItem(state, action: PayloadAction<string>) {
            const storeId = action.payload;
            if (!state.cart) return;
            const cartItem = state.cart.items.find(
                (item) => item.storeId === storeId
            );

            state.selectedCartItems = state.selectedCartItems.filter(
                (item) => item.storeId !== storeId
            );

            if (cartItem) state.selectedCartItems.push(cartItem);
        },
        clearSelectedCartItem(state, action: PayloadAction<string>) {
            const storeId = action.payload;
            state.selectedCartItems = state.selectedCartItems.filter(
                (item) => item.storeId !== storeId
            );
        },
        selectCartItemSku(
            state,
            action: PayloadAction<{ skuCode: string; cartItemId: string }>
        ) {
            // Check if the cart exists in the state
            if (!state.cart) {
                console.error("select sku failed. Cart not found");
                return;
            }

            // Destructure the payload from the action
            const { skuCode, cartItemId } = action.payload;

            // Find the cart item in the cart using the provided cartItemId
            const cartItem = state.cart.items.find(
                (item) => item.id === cartItemId
            );

            // If the cart item is not found, log an error and return
            if (!cartItem) {
                console.error("select sku failed. Cart item not found");
                return;
            }

            // Check if the cart item is already selected
            let selectedCartItem = state.selectedCartItems.find(
                (item) => item.id === cartItemId
            );

            if (selectedCartItem) {
                // If the item is already selected, remove it from the selected items
                state.selectedCartItems = state.selectedCartItems.filter(
                    (item) => item.id !== cartItemId
                );
            } else {
                // If not selected, create a shallow copy of the cart item with an empty skus array
                selectedCartItem = { ...cartItem, skus: [] };
            }

            // Find the SKU in the cart item's skus array using the provided skuCode
            const cartItemSku = cartItem.skus.find(
                (sku) => sku.lemooSku === skuCode
            );

            // If the SKU is not found, log an error and return
            if (!cartItemSku) {
                console.error("select sku failed. Cart item sku not found");
                return;
            }

            // Add the found SKU to the selected cart item's skus array
            selectedCartItem.skus.push(cartItemSku);

            // Add the updated selected cart item to the selectedCartItems array in the state
            state.selectedCartItems.push(selectedCartItem);
        },
        clearSelectedCartItemSku(
            state,
            action: PayloadAction<{ skuCode: string; cartItemId: string }>
        ) {
            // Check if the cart exists in the state
            if (!state.cart) {
                console.error("clear select sku failed. Cart not found");
                return;
            }

            // Destructure the payload from the action
            const { skuCode, cartItemId } = action.payload;

            // Find the cart item in the cart using the provided cartItemId
            const cartItem = state.cart.items.find(
                (item) => item.id === cartItemId
            );

            // If the cart item is not found, log an error and return
            if (!cartItem) {
                console.error("clear select sku failed. Cart item not found");
                return;
            }

            // Check if the cart item is already selected
            const selectedCartItem = state.selectedCartItems.find(
                (item) => item.id === cartItemId
            );

            if (!selectedCartItem) {
                console.error(
                    "clear select sku failed. Cart item not selected"
                );
                return;
            }

            selectedCartItem.skus = selectedCartItem.skus.filter(
                (sku) => sku.lemooSku !== skuCode
            );
        },
    },
});

export const {
    updateCart,
    removeCartItemFromSelectedCartItem,
    removeCartItemSku,
    setSelectedCartItems,
    selectAllCartItem,
    selectCartItem,
    selectCartItemSku,
    clearSelectedCartItem,
    clearAllSelectedCartItem,
    clearSelectedCartItemSku,
} = CartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default CartSlice.reducer;
