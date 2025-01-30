import { ProductDetail, ProductSku } from "@/common/type/product.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductDetailState {
    product?: ProductDetail;
    activeSku?: ProductSku;
}

const initialState: ProductDetailState = {};

export const ProductDetailSlice = createSlice({
    name: "ProductDetail",
    initialState,
    reducers: {
        setProduct(state, action: PayloadAction<ProductDetail>) {
            const product = action.payload;

            state.product = product;
            state.activeSku = product.skus[0];
        },
        setActiveSku(state, action: PayloadAction<ProductSku>) {
            state.activeSku = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setProduct, setActiveSku } = ProductDetailSlice.actions;

export default ProductDetailSlice.reducer;
