/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TestImport } from './routes/Test'
import { Route as StoreCreatStoreImport } from './routes/Store/CreatStore'
import { Route as PromotionStoreFlashSaleImport } from './routes/Promotion/StoreFlashSale'
import { Route as PromotionRegularVoucherImport } from './routes/Promotion/RegularVoucher'
import { Route as PromotionPromotionImport } from './routes/Promotion/Promotion'
import { Route as ProductProductManagementImport } from './routes/Product/ProductManagement'
import { Route as ProductBennerProductsImport } from './routes/Product/BennerProducts'
import { Route as ProductAddProductImport } from './routes/Product/AddProduct'
import { Route as AuthRegisterImport } from './routes/Auth/Register'
import { Route as AuthLoginImport } from './routes/Auth/Login'
import { Route as AccoutFileSellerImport } from './routes/Accout/FileSeller'
import { Route as AccoutConfirmInfoImport } from './routes/Accout/ConfirmInfo'
import { Route as AccoutAccoutSettingImport } from './routes/Accout/AccoutSetting'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const TestRoute = TestImport.update({
  id: '/Test',
  path: '/Test',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const StoreCreatStoreRoute = StoreCreatStoreImport.update({
  id: '/Store/CreatStore',
  path: '/Store/CreatStore',
  getParentRoute: () => rootRoute,
} as any)

const PromotionStoreFlashSaleRoute = PromotionStoreFlashSaleImport.update({
  id: '/Promotion/StoreFlashSale',
  path: '/Promotion/StoreFlashSale',
  getParentRoute: () => rootRoute,
} as any)

const PromotionRegularVoucherRoute = PromotionRegularVoucherImport.update({
  id: '/Promotion/RegularVoucher',
  path: '/Promotion/RegularVoucher',
  getParentRoute: () => rootRoute,
} as any)

const PromotionPromotionRoute = PromotionPromotionImport.update({
  id: '/Promotion/Promotion',
  path: '/Promotion/Promotion',
  getParentRoute: () => rootRoute,
} as any)

const ProductProductManagementRoute = ProductProductManagementImport.update({
  id: '/Product/ProductManagement',
  path: '/Product/ProductManagement',
  getParentRoute: () => rootRoute,
} as any)

const ProductBennerProductsRoute = ProductBennerProductsImport.update({
  id: '/Product/BennerProducts',
  path: '/Product/BennerProducts',
  getParentRoute: () => rootRoute,
} as any)

const ProductAddProductRoute = ProductAddProductImport.update({
  id: '/Product/AddProduct',
  path: '/Product/AddProduct',
  getParentRoute: () => rootRoute,
} as any)

const AuthRegisterRoute = AuthRegisterImport.update({
  id: '/Auth/Register',
  path: '/Auth/Register',
  getParentRoute: () => rootRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  id: '/Auth/Login',
  path: '/Auth/Login',
  getParentRoute: () => rootRoute,
} as any)

const AccoutFileSellerRoute = AccoutFileSellerImport.update({
  id: '/Accout/FileSeller',
  path: '/Accout/FileSeller',
  getParentRoute: () => rootRoute,
} as any)

const AccoutConfirmInfoRoute = AccoutConfirmInfoImport.update({
  id: '/Accout/ConfirmInfo',
  path: '/Accout/ConfirmInfo',
  getParentRoute: () => rootRoute,
} as any)

const AccoutAccoutSettingRoute = AccoutAccoutSettingImport.update({
  id: '/Accout/AccoutSetting',
  path: '/Accout/AccoutSetting',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/Test': {
      id: '/Test'
      path: '/Test'
      fullPath: '/Test'
      preLoaderRoute: typeof TestImport
      parentRoute: typeof rootRoute
    }
    '/Accout/AccoutSetting': {
      id: '/Accout/AccoutSetting'
      path: '/Accout/AccoutSetting'
      fullPath: '/Accout/AccoutSetting'
      preLoaderRoute: typeof AccoutAccoutSettingImport
      parentRoute: typeof rootRoute
    }
    '/Accout/ConfirmInfo': {
      id: '/Accout/ConfirmInfo'
      path: '/Accout/ConfirmInfo'
      fullPath: '/Accout/ConfirmInfo'
      preLoaderRoute: typeof AccoutConfirmInfoImport
      parentRoute: typeof rootRoute
    }
    '/Accout/FileSeller': {
      id: '/Accout/FileSeller'
      path: '/Accout/FileSeller'
      fullPath: '/Accout/FileSeller'
      preLoaderRoute: typeof AccoutFileSellerImport
      parentRoute: typeof rootRoute
    }
    '/Auth/Login': {
      id: '/Auth/Login'
      path: '/Auth/Login'
      fullPath: '/Auth/Login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof rootRoute
    }
    '/Auth/Register': {
      id: '/Auth/Register'
      path: '/Auth/Register'
      fullPath: '/Auth/Register'
      preLoaderRoute: typeof AuthRegisterImport
      parentRoute: typeof rootRoute
    }
    '/Product/AddProduct': {
      id: '/Product/AddProduct'
      path: '/Product/AddProduct'
      fullPath: '/Product/AddProduct'
      preLoaderRoute: typeof ProductAddProductImport
      parentRoute: typeof rootRoute
    }
    '/Product/BennerProducts': {
      id: '/Product/BennerProducts'
      path: '/Product/BennerProducts'
      fullPath: '/Product/BennerProducts'
      preLoaderRoute: typeof ProductBennerProductsImport
      parentRoute: typeof rootRoute
    }
    '/Product/ProductManagement': {
      id: '/Product/ProductManagement'
      path: '/Product/ProductManagement'
      fullPath: '/Product/ProductManagement'
      preLoaderRoute: typeof ProductProductManagementImport
      parentRoute: typeof rootRoute
    }
    '/Promotion/Promotion': {
      id: '/Promotion/Promotion'
      path: '/Promotion/Promotion'
      fullPath: '/Promotion/Promotion'
      preLoaderRoute: typeof PromotionPromotionImport
      parentRoute: typeof rootRoute
    }
    '/Promotion/RegularVoucher': {
      id: '/Promotion/RegularVoucher'
      path: '/Promotion/RegularVoucher'
      fullPath: '/Promotion/RegularVoucher'
      preLoaderRoute: typeof PromotionRegularVoucherImport
      parentRoute: typeof rootRoute
    }
    '/Promotion/StoreFlashSale': {
      id: '/Promotion/StoreFlashSale'
      path: '/Promotion/StoreFlashSale'
      fullPath: '/Promotion/StoreFlashSale'
      preLoaderRoute: typeof PromotionStoreFlashSaleImport
      parentRoute: typeof rootRoute
    }
    '/Store/CreatStore': {
      id: '/Store/CreatStore'
      path: '/Store/CreatStore'
      fullPath: '/Store/CreatStore'
      preLoaderRoute: typeof StoreCreatStoreImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/Test': typeof TestRoute
  '/Accout/AccoutSetting': typeof AccoutAccoutSettingRoute
  '/Accout/ConfirmInfo': typeof AccoutConfirmInfoRoute
  '/Accout/FileSeller': typeof AccoutFileSellerRoute
  '/Auth/Login': typeof AuthLoginRoute
  '/Auth/Register': typeof AuthRegisterRoute
  '/Product/AddProduct': typeof ProductAddProductRoute
  '/Product/BennerProducts': typeof ProductBennerProductsRoute
  '/Product/ProductManagement': typeof ProductProductManagementRoute
  '/Promotion/Promotion': typeof PromotionPromotionRoute
  '/Promotion/RegularVoucher': typeof PromotionRegularVoucherRoute
  '/Promotion/StoreFlashSale': typeof PromotionStoreFlashSaleRoute
  '/Store/CreatStore': typeof StoreCreatStoreRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/Test': typeof TestRoute
  '/Accout/AccoutSetting': typeof AccoutAccoutSettingRoute
  '/Accout/ConfirmInfo': typeof AccoutConfirmInfoRoute
  '/Accout/FileSeller': typeof AccoutFileSellerRoute
  '/Auth/Login': typeof AuthLoginRoute
  '/Auth/Register': typeof AuthRegisterRoute
  '/Product/AddProduct': typeof ProductAddProductRoute
  '/Product/BennerProducts': typeof ProductBennerProductsRoute
  '/Product/ProductManagement': typeof ProductProductManagementRoute
  '/Promotion/Promotion': typeof PromotionPromotionRoute
  '/Promotion/RegularVoucher': typeof PromotionRegularVoucherRoute
  '/Promotion/StoreFlashSale': typeof PromotionStoreFlashSaleRoute
  '/Store/CreatStore': typeof StoreCreatStoreRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/Test': typeof TestRoute
  '/Accout/AccoutSetting': typeof AccoutAccoutSettingRoute
  '/Accout/ConfirmInfo': typeof AccoutConfirmInfoRoute
  '/Accout/FileSeller': typeof AccoutFileSellerRoute
  '/Auth/Login': typeof AuthLoginRoute
  '/Auth/Register': typeof AuthRegisterRoute
  '/Product/AddProduct': typeof ProductAddProductRoute
  '/Product/BennerProducts': typeof ProductBennerProductsRoute
  '/Product/ProductManagement': typeof ProductProductManagementRoute
  '/Promotion/Promotion': typeof PromotionPromotionRoute
  '/Promotion/RegularVoucher': typeof PromotionRegularVoucherRoute
  '/Promotion/StoreFlashSale': typeof PromotionStoreFlashSaleRoute
  '/Store/CreatStore': typeof StoreCreatStoreRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/Test'
    | '/Accout/AccoutSetting'
    | '/Accout/ConfirmInfo'
    | '/Accout/FileSeller'
    | '/Auth/Login'
    | '/Auth/Register'
    | '/Product/AddProduct'
    | '/Product/BennerProducts'
    | '/Product/ProductManagement'
    | '/Promotion/Promotion'
    | '/Promotion/RegularVoucher'
    | '/Promotion/StoreFlashSale'
    | '/Store/CreatStore'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/Test'
    | '/Accout/AccoutSetting'
    | '/Accout/ConfirmInfo'
    | '/Accout/FileSeller'
    | '/Auth/Login'
    | '/Auth/Register'
    | '/Product/AddProduct'
    | '/Product/BennerProducts'
    | '/Product/ProductManagement'
    | '/Promotion/Promotion'
    | '/Promotion/RegularVoucher'
    | '/Promotion/StoreFlashSale'
    | '/Store/CreatStore'
  id:
    | '__root__'
    | '/'
    | '/Test'
    | '/Accout/AccoutSetting'
    | '/Accout/ConfirmInfo'
    | '/Accout/FileSeller'
    | '/Auth/Login'
    | '/Auth/Register'
    | '/Product/AddProduct'
    | '/Product/BennerProducts'
    | '/Product/ProductManagement'
    | '/Promotion/Promotion'
    | '/Promotion/RegularVoucher'
    | '/Promotion/StoreFlashSale'
    | '/Store/CreatStore'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  TestRoute: typeof TestRoute
  AccoutAccoutSettingRoute: typeof AccoutAccoutSettingRoute
  AccoutConfirmInfoRoute: typeof AccoutConfirmInfoRoute
  AccoutFileSellerRoute: typeof AccoutFileSellerRoute
  AuthLoginRoute: typeof AuthLoginRoute
  AuthRegisterRoute: typeof AuthRegisterRoute
  ProductAddProductRoute: typeof ProductAddProductRoute
  ProductBennerProductsRoute: typeof ProductBennerProductsRoute
  ProductProductManagementRoute: typeof ProductProductManagementRoute
  PromotionPromotionRoute: typeof PromotionPromotionRoute
  PromotionRegularVoucherRoute: typeof PromotionRegularVoucherRoute
  PromotionStoreFlashSaleRoute: typeof PromotionStoreFlashSaleRoute
  StoreCreatStoreRoute: typeof StoreCreatStoreRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  TestRoute: TestRoute,
  AccoutAccoutSettingRoute: AccoutAccoutSettingRoute,
  AccoutConfirmInfoRoute: AccoutConfirmInfoRoute,
  AccoutFileSellerRoute: AccoutFileSellerRoute,
  AuthLoginRoute: AuthLoginRoute,
  AuthRegisterRoute: AuthRegisterRoute,
  ProductAddProductRoute: ProductAddProductRoute,
  ProductBennerProductsRoute: ProductBennerProductsRoute,
  ProductProductManagementRoute: ProductProductManagementRoute,
  PromotionPromotionRoute: PromotionPromotionRoute,
  PromotionRegularVoucherRoute: PromotionRegularVoucherRoute,
  PromotionStoreFlashSaleRoute: PromotionStoreFlashSaleRoute,
  StoreCreatStoreRoute: StoreCreatStoreRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/Test",
        "/Accout/AccoutSetting",
        "/Accout/ConfirmInfo",
        "/Accout/FileSeller",
        "/Auth/Login",
        "/Auth/Register",
        "/Product/AddProduct",
        "/Product/BennerProducts",
        "/Product/ProductManagement",
        "/Promotion/Promotion",
        "/Promotion/RegularVoucher",
        "/Promotion/StoreFlashSale",
        "/Store/CreatStore"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/Test": {
      "filePath": "Test.tsx"
    },
    "/Accout/AccoutSetting": {
      "filePath": "Accout/AccoutSetting.tsx"
    },
    "/Accout/ConfirmInfo": {
      "filePath": "Accout/ConfirmInfo.tsx"
    },
    "/Accout/FileSeller": {
      "filePath": "Accout/FileSeller.tsx"
    },
    "/Auth/Login": {
      "filePath": "Auth/Login.tsx"
    },
    "/Auth/Register": {
      "filePath": "Auth/Register.tsx"
    },
    "/Product/AddProduct": {
      "filePath": "Product/AddProduct.tsx"
    },
    "/Product/BennerProducts": {
      "filePath": "Product/BennerProducts.tsx"
    },
    "/Product/ProductManagement": {
      "filePath": "Product/ProductManagement.tsx"
    },
    "/Promotion/Promotion": {
      "filePath": "Promotion/Promotion.tsx"
    },
    "/Promotion/RegularVoucher": {
      "filePath": "Promotion/RegularVoucher.tsx"
    },
    "/Promotion/StoreFlashSale": {
      "filePath": "Promotion/StoreFlashSale.tsx"
    },
    "/Store/CreatStore": {
      "filePath": "Store/CreatStore.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
