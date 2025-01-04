/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as Test2Import } from './routes/test2'
import { Route as TestImport } from './routes/Test'
import { Route as ReviewsoverReviewImport } from './routes/Reviews_overReview'
import { Route as PromotionImport } from './routes/Promotion'
import { Route as StoreCreatStoreImport } from './routes/Store/CreatStore'
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

const Test2Route = Test2Import.update({
  id: '/test2',
  path: '/test2',
  getParentRoute: () => rootRoute,
} as any)

const TestRoute = TestImport.update({
  id: '/Test',
  path: '/Test',
  getParentRoute: () => rootRoute,
} as any)

const ReviewsoverReviewRoute = ReviewsoverReviewImport.update({
  id: '/Reviews_overReview',
  path: '/Reviews_overReview',
  getParentRoute: () => rootRoute,
} as any)

const PromotionRoute = PromotionImport.update({
  id: '/Promotion',
  path: '/Promotion',
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
    '/Promotion': {
      id: '/Promotion'
      path: '/Promotion'
      fullPath: '/Promotion'
      preLoaderRoute: typeof PromotionImport
      parentRoute: typeof rootRoute
    }
    '/Reviews_overReview': {
      id: '/Reviews_overReview'
      path: '/Reviews_overReview'
      fullPath: '/Reviews_overReview'
      preLoaderRoute: typeof ReviewsoverReviewImport
      parentRoute: typeof rootRoute
    }
    '/Test': {
      id: '/Test'
      path: '/Test'
      fullPath: '/Test'
      preLoaderRoute: typeof TestImport
      parentRoute: typeof rootRoute
    }
    '/test2': {
      id: '/test2'
      path: '/test2'
      fullPath: '/test2'
      preLoaderRoute: typeof Test2Import
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
  '/Promotion': typeof PromotionRoute
  '/Reviews_overReview': typeof ReviewsoverReviewRoute
  '/Test': typeof TestRoute
  '/test2': typeof Test2Route
  '/Accout/AccoutSetting': typeof AccoutAccoutSettingRoute
  '/Accout/ConfirmInfo': typeof AccoutConfirmInfoRoute
  '/Accout/FileSeller': typeof AccoutFileSellerRoute
  '/Auth/Login': typeof AuthLoginRoute
  '/Auth/Register': typeof AuthRegisterRoute
  '/Product/AddProduct': typeof ProductAddProductRoute
  '/Product/BennerProducts': typeof ProductBennerProductsRoute
  '/Product/ProductManagement': typeof ProductProductManagementRoute
  '/Store/CreatStore': typeof StoreCreatStoreRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/Promotion': typeof PromotionRoute
  '/Reviews_overReview': typeof ReviewsoverReviewRoute
  '/Test': typeof TestRoute
  '/test2': typeof Test2Route
  '/Accout/AccoutSetting': typeof AccoutAccoutSettingRoute
  '/Accout/ConfirmInfo': typeof AccoutConfirmInfoRoute
  '/Accout/FileSeller': typeof AccoutFileSellerRoute
  '/Auth/Login': typeof AuthLoginRoute
  '/Auth/Register': typeof AuthRegisterRoute
  '/Product/AddProduct': typeof ProductAddProductRoute
  '/Product/BennerProducts': typeof ProductBennerProductsRoute
  '/Product/ProductManagement': typeof ProductProductManagementRoute
  '/Store/CreatStore': typeof StoreCreatStoreRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/Promotion': typeof PromotionRoute
  '/Reviews_overReview': typeof ReviewsoverReviewRoute
  '/Test': typeof TestRoute
  '/test2': typeof Test2Route
  '/Accout/AccoutSetting': typeof AccoutAccoutSettingRoute
  '/Accout/ConfirmInfo': typeof AccoutConfirmInfoRoute
  '/Accout/FileSeller': typeof AccoutFileSellerRoute
  '/Auth/Login': typeof AuthLoginRoute
  '/Auth/Register': typeof AuthRegisterRoute
  '/Product/AddProduct': typeof ProductAddProductRoute
  '/Product/BennerProducts': typeof ProductBennerProductsRoute
  '/Product/ProductManagement': typeof ProductProductManagementRoute
  '/Store/CreatStore': typeof StoreCreatStoreRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/Promotion'
    | '/Reviews_overReview'
    | '/Test'
    | '/test2'
    | '/Accout/AccoutSetting'
    | '/Accout/ConfirmInfo'
    | '/Accout/FileSeller'
    | '/Auth/Login'
    | '/Auth/Register'
    | '/Product/AddProduct'
    | '/Product/BennerProducts'
    | '/Product/ProductManagement'
    | '/Store/CreatStore'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/Promotion'
    | '/Reviews_overReview'
    | '/Test'
    | '/test2'
    | '/Accout/AccoutSetting'
    | '/Accout/ConfirmInfo'
    | '/Accout/FileSeller'
    | '/Auth/Login'
    | '/Auth/Register'
    | '/Product/AddProduct'
    | '/Product/BennerProducts'
    | '/Product/ProductManagement'
    | '/Store/CreatStore'
  id:
    | '__root__'
    | '/'
    | '/Promotion'
    | '/Reviews_overReview'
    | '/Test'
    | '/test2'
    | '/Accout/AccoutSetting'
    | '/Accout/ConfirmInfo'
    | '/Accout/FileSeller'
    | '/Auth/Login'
    | '/Auth/Register'
    | '/Product/AddProduct'
    | '/Product/BennerProducts'
    | '/Product/ProductManagement'
    | '/Store/CreatStore'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  PromotionRoute: typeof PromotionRoute
  ReviewsoverReviewRoute: typeof ReviewsoverReviewRoute
  TestRoute: typeof TestRoute
  Test2Route: typeof Test2Route
  AccoutAccoutSettingRoute: typeof AccoutAccoutSettingRoute
  AccoutConfirmInfoRoute: typeof AccoutConfirmInfoRoute
  AccoutFileSellerRoute: typeof AccoutFileSellerRoute
  AuthLoginRoute: typeof AuthLoginRoute
  AuthRegisterRoute: typeof AuthRegisterRoute
  ProductAddProductRoute: typeof ProductAddProductRoute
  ProductBennerProductsRoute: typeof ProductBennerProductsRoute
  ProductProductManagementRoute: typeof ProductProductManagementRoute
  StoreCreatStoreRoute: typeof StoreCreatStoreRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  PromotionRoute: PromotionRoute,
  ReviewsoverReviewRoute: ReviewsoverReviewRoute,
  TestRoute: TestRoute,
  Test2Route: Test2Route,
  AccoutAccoutSettingRoute: AccoutAccoutSettingRoute,
  AccoutConfirmInfoRoute: AccoutConfirmInfoRoute,
  AccoutFileSellerRoute: AccoutFileSellerRoute,
  AuthLoginRoute: AuthLoginRoute,
  AuthRegisterRoute: AuthRegisterRoute,
  ProductAddProductRoute: ProductAddProductRoute,
  ProductBennerProductsRoute: ProductBennerProductsRoute,
  ProductProductManagementRoute: ProductProductManagementRoute,
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
        "/Promotion",
        "/Reviews_overReview",
        "/Test",
        "/test2",
        "/Accout/AccoutSetting",
        "/Accout/ConfirmInfo",
        "/Accout/FileSeller",
        "/Auth/Login",
        "/Auth/Register",
        "/Product/AddProduct",
        "/Product/BennerProducts",
        "/Product/ProductManagement",
        "/Store/CreatStore"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/Promotion": {
      "filePath": "Promotion.tsx"
    },
    "/Reviews_overReview": {
      "filePath": "Reviews_overReview.tsx"
    },
    "/Test": {
      "filePath": "Test.tsx"
    },
    "/test2": {
      "filePath": "test2.tsx"
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
    "/Store/CreatStore": {
      "filePath": "Store/CreatStore.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
