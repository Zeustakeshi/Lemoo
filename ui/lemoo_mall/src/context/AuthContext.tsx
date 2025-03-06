import { getUserInfo } from "@/api/user.api";
import { CART_STORAGE_KEY } from "@/common/constants/cart";
import { USER_STORAGE_KEY } from "@/common/constants/user";
import { TokenType } from "@/common/enum/token.enum";
import { AddProductToCart, CartType } from "@/common/type/cart.type";
import { User } from "@/common/type/user.type";
import { getSessionStorageValue, saveSessionStorage } from "@/lib/storage";
import * as tokenStore from "@/lib/tokenStore";
import { useMutation } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  logout: () => Promise<void>;
  cartInfo: CartType[] | null;
  removeFromCartContext: (
    productId: string,
    storeId: string,
    productSku?: string
  ) => void;
  addToCartContext: (product: AddProductToCart) => void;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [cartInfo, setCartInfo] = useState<CartType[] | null>(null);

  const { isPending, mutateAsync: loadUserInfo } = useMutation({
    mutationKey: ["user-info", "me"],
    mutationFn: () => getUserInfo(),
  });

  useEffect(() => {
    if (!isAuthenticated) loadUser();
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartInfo));
  }, [cartInfo]);

  const loadUser = useCallback(async () => {
    const user = getSessionStorageValue<User | null>(USER_STORAGE_KEY);

    if (user) {
      setUser(user);
      setIsAuthenticated(true);
      return;
    }

    // load channel info
    try {
      const user = await loadUserInfo();
      saveSessionStorage(USER_STORAGE_KEY, user);
      setUser(user);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.log({ error });
      await logout();
    }
  }, []);

  const logout = useCallback(async () => {
    // await logoutApi();
    sessionStorage.removeItem(USER_STORAGE_KEY);
    await tokenStore.removeToken(TokenType.ACCESS_TOKEN);
    await tokenStore.removeToken(TokenType.REFRESH_TOKEN);

    setUser(null);
    setIsAuthenticated(false);
    window.location.href = `http://sso.lemoo.com:5172/auth/login?callback_url=http://lemoo.com:5173`;
  }, []);

  const addToCartContext = (product: AddProductToCart) => {
    console.log("sản phẩm vào context", product);
    setCartInfo((prev) => {
      if (!prev)
        return [
          {
            id: "cart-1",
            items: [
              {
                id: product.productId,
                storeId: product.storeId,
                name: product.productName,
                skus: [
                  {
                    nameSku: product.productName,
                    productName: product.productName,
                    lemooSku: product.productSku,
                    productId: product.productId,
                    image: product.productImage,
                    quantity: product.productQuantity,
                    price: product.productPrice,
                  },
                ],
              },
            ],
          },
        ];

      // Clone giỏ hàng cũ để tránh thay đổi trực tiếp
      const newCart = [...prev];

      // Tìm cửa hàng (store) trong giỏ hàng
      const storeIndex = newCart.findIndex(
        (cart) => cart.id === product.storeId
      );

      if (storeIndex !== -1) {
        // Tìm sản phẩm trong cửa hàng
        const productIndex = newCart[storeIndex].items.findIndex(
          (item) => item.id === product.productId
        );

        if (productIndex !== -1) {
          // Tìm SKU trong sản phẩm
          const skuIndex = newCart[storeIndex].items[
            productIndex
          ].skus.findIndex((sku) => sku.lemooSku === product.productSku);

          if (skuIndex !== -1) {
            // Nếu SKU đã tồn tại, tăng số lượng
            newCart[storeIndex].items[productIndex].skus[skuIndex].quantity +=
              product.productQuantity;
          } else {
            // Nếu SKU chưa tồn tại, thêm mới
            newCart[storeIndex].items[productIndex].skus.push({
              nameSku: product.productName,
              lemooSku: product.productSku,
              productId: product.productId,
              image: product.productImage,
              quantity: product.productQuantity,
              price: product.productPrice,
            });
          }
        } else {
          // Nếu sản phẩm chưa có trong cửa hàng, thêm mới
          newCart[storeIndex].items.push({
            id: product.productId,
            storeId: product.storeId,
            name: product.productName,
            skus: [
              {
                nameSku: product.productName,
                lemooSku: product.productSku,
                productId: product.productId,
                image: product.productImage,
                quantity: product.productQuantity,
                price: product.productPrice,
              },
            ],
          });
        }
      } else {
        // Nếu cửa hàng chưa tồn tại trong giỏ hàng, thêm mới
        newCart.push({
          id: product.storeId,
          items: [
            {
              id: product.productId,
              storeId: product.storeId,
              name: product.productName,
              skus: [
                {
                  nameSku: product.productName,
                  lemooSku: product.productSku,
                  productId: product.productId,
                  image: product.productImage,
                  quantity: product.productQuantity,
                  price: product.productPrice,
                },
              ],
            },
          ],
        });
      }

      return newCart;
    });
  };

  const removeFromCartContext = (
    productId: string,
    storeId: string,
    productSku?: string
  ) => {
    setCartInfo((prev) => {
      if (!prev) return null;

      // Clone giỏ hàng cũ để tránh thay đổi trực tiếp
      const newCart = [...prev];

      // Tìm cửa hàng (store) trong giỏ hàng
      const storeIndex = newCart.findIndex((cart) => cart.id === storeId);
      if (storeIndex === -1) return prev; // Nếu không tìm thấy store, giữ nguyên giỏ hàng

      // Tìm sản phẩm trong cửa hàng
      const productIndex = newCart[storeIndex].items.findIndex(
        (item) => item.id === productId
      );
      if (productIndex === -1) return prev; // Nếu không tìm thấy sản phẩm, giữ nguyên giỏ hàng

      // Nếu có SKU, xóa SKU cụ thể
      if (productSku) {
        const skus = newCart[storeIndex].items[productIndex].skus.filter(
          (sku) => sku.lemooSku !== productSku
        );

        // Nếu không còn SKU nào, xóa luôn sản phẩm
        if (skus.length === 0) {
          newCart[storeIndex].items.splice(productIndex, 1);
        } else {
          newCart[storeIndex].items[productIndex].skus = skus;
        }
      } else {
        // Nếu không truyền SKU, xóa luôn cả sản phẩm
        newCart[storeIndex].items.splice(productIndex, 1);
      }

      // Nếu cửa hàng không còn sản phẩm nào, xóa luôn cửa hàng
      if (newCart[storeIndex].items.length === 0) {
        newCart.splice(storeIndex, 1);
      }

      return newCart.length > 0 ? newCart : null;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        addToCartContext,
        removeFromCartContext,
        cartInfo,
        user,
        isAuthenticated,
        authLoading: isPending,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
