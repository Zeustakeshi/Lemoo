/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SearchIndexImport } from './routes/search/index'
import { Route as CartIndexImport } from './routes/cart/index'
import { Route as homeIndexImport } from './routes/(home)/index'
import { Route as StoreLayoutImport } from './routes/store/_layout'
import { Route as ProductsProductIdImport } from './routes/products/$productId'
import { Route as StoreLayoutStoreIdIndexImport } from './routes/store/_layout.$storeId/index'
import { Route as StoreLayoutStoreIdPromotionsIndexImport } from './routes/store/_layout.$storeId/promotions/index'
import { Route as StoreLayoutStoreIdProductsIndexImport } from './routes/store/_layout.$storeId/products/index'

// Create Virtual Routes

const StoreImport = createFileRoute('/store')()

// Create/Update Routes

const StoreRoute = StoreImport.update({
  id: '/store',
  path: '/store',
  getParentRoute: () => rootRoute,
} as any)

const SearchIndexRoute = SearchIndexImport.update({
  id: '/search/',
  path: '/search/',
  getParentRoute: () => rootRoute,
} as any)

const CartIndexRoute = CartIndexImport.update({
  id: '/cart/',
  path: '/cart/',
  getParentRoute: () => rootRoute,
} as any)

const homeIndexRoute = homeIndexImport.update({
  id: '/(home)/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const StoreLayoutRoute = StoreLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => StoreRoute,
} as any)

const ProductsProductIdRoute = ProductsProductIdImport.update({
  id: '/products/$productId',
  path: '/products/$productId',
  getParentRoute: () => rootRoute,
} as any)

const StoreLayoutStoreIdIndexRoute = StoreLayoutStoreIdIndexImport.update({
  id: '/$storeId/',
  path: '/$storeId/',
  getParentRoute: () => StoreLayoutRoute,
} as any)

const StoreLayoutStoreIdPromotionsIndexRoute =
  StoreLayoutStoreIdPromotionsIndexImport.update({
    id: '/$storeId/promotions/',
    path: '/$storeId/promotions/',
    getParentRoute: () => StoreLayoutRoute,
  } as any)

const StoreLayoutStoreIdProductsIndexRoute =
  StoreLayoutStoreIdProductsIndexImport.update({
    id: '/$storeId/products/',
    path: '/$storeId/products/',
    getParentRoute: () => StoreLayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/products/$productId': {
      id: '/products/$productId'
      path: '/products/$productId'
      fullPath: '/products/$productId'
      preLoaderRoute: typeof ProductsProductIdImport
      parentRoute: typeof rootRoute
    }
    '/store': {
      id: '/store'
      path: '/store'
      fullPath: '/store'
      preLoaderRoute: typeof StoreImport
      parentRoute: typeof rootRoute
    }
    '/store/_layout': {
      id: '/store/_layout'
      path: '/store'
      fullPath: '/store'
      preLoaderRoute: typeof StoreLayoutImport
      parentRoute: typeof StoreRoute
    }
    '/(home)/': {
      id: '/(home)/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof homeIndexImport
      parentRoute: typeof rootRoute
    }
    '/cart/': {
      id: '/cart/'
      path: '/cart'
      fullPath: '/cart'
      preLoaderRoute: typeof CartIndexImport
      parentRoute: typeof rootRoute
    }
    '/search/': {
      id: '/search/'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof SearchIndexImport
      parentRoute: typeof rootRoute
    }
    '/store/_layout/$storeId/': {
      id: '/store/_layout/$storeId/'
      path: '/$storeId'
      fullPath: '/store/$storeId'
      preLoaderRoute: typeof StoreLayoutStoreIdIndexImport
      parentRoute: typeof StoreLayoutImport
    }
    '/store/_layout/$storeId/products/': {
      id: '/store/_layout/$storeId/products/'
      path: '/$storeId/products'
      fullPath: '/store/$storeId/products'
      preLoaderRoute: typeof StoreLayoutStoreIdProductsIndexImport
      parentRoute: typeof StoreLayoutImport
    }
    '/store/_layout/$storeId/promotions/': {
      id: '/store/_layout/$storeId/promotions/'
      path: '/$storeId/promotions'
      fullPath: '/store/$storeId/promotions'
      preLoaderRoute: typeof StoreLayoutStoreIdPromotionsIndexImport
      parentRoute: typeof StoreLayoutImport
    }
  }
}

// Create and export the route tree

interface StoreLayoutRouteChildren {
  StoreLayoutStoreIdIndexRoute: typeof StoreLayoutStoreIdIndexRoute
  StoreLayoutStoreIdProductsIndexRoute: typeof StoreLayoutStoreIdProductsIndexRoute
  StoreLayoutStoreIdPromotionsIndexRoute: typeof StoreLayoutStoreIdPromotionsIndexRoute
}

const StoreLayoutRouteChildren: StoreLayoutRouteChildren = {
  StoreLayoutStoreIdIndexRoute: StoreLayoutStoreIdIndexRoute,
  StoreLayoutStoreIdProductsIndexRoute: StoreLayoutStoreIdProductsIndexRoute,
  StoreLayoutStoreIdPromotionsIndexRoute:
    StoreLayoutStoreIdPromotionsIndexRoute,
}

const StoreLayoutRouteWithChildren = StoreLayoutRoute._addFileChildren(
  StoreLayoutRouteChildren,
)

interface StoreRouteChildren {
  StoreLayoutRoute: typeof StoreLayoutRouteWithChildren
}

const StoreRouteChildren: StoreRouteChildren = {
  StoreLayoutRoute: StoreLayoutRouteWithChildren,
}

const StoreRouteWithChildren = StoreRoute._addFileChildren(StoreRouteChildren)

export interface FileRoutesByFullPath {
  '/products/$productId': typeof ProductsProductIdRoute
  '/store': typeof StoreLayoutRouteWithChildren
  '/': typeof homeIndexRoute
  '/cart': typeof CartIndexRoute
  '/search': typeof SearchIndexRoute
  '/store/$storeId': typeof StoreLayoutStoreIdIndexRoute
  '/store/$storeId/products': typeof StoreLayoutStoreIdProductsIndexRoute
  '/store/$storeId/promotions': typeof StoreLayoutStoreIdPromotionsIndexRoute
}

export interface FileRoutesByTo {
  '/products/$productId': typeof ProductsProductIdRoute
  '/store': typeof StoreLayoutRouteWithChildren
  '/': typeof homeIndexRoute
  '/cart': typeof CartIndexRoute
  '/search': typeof SearchIndexRoute
  '/store/$storeId': typeof StoreLayoutStoreIdIndexRoute
  '/store/$storeId/products': typeof StoreLayoutStoreIdProductsIndexRoute
  '/store/$storeId/promotions': typeof StoreLayoutStoreIdPromotionsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/products/$productId': typeof ProductsProductIdRoute
  '/store': typeof StoreRouteWithChildren
  '/store/_layout': typeof StoreLayoutRouteWithChildren
  '/(home)/': typeof homeIndexRoute
  '/cart/': typeof CartIndexRoute
  '/search/': typeof SearchIndexRoute
  '/store/_layout/$storeId/': typeof StoreLayoutStoreIdIndexRoute
  '/store/_layout/$storeId/products/': typeof StoreLayoutStoreIdProductsIndexRoute
  '/store/_layout/$storeId/promotions/': typeof StoreLayoutStoreIdPromotionsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/products/$productId'
    | '/store'
    | '/'
    | '/cart'
    | '/search'
    | '/store/$storeId'
    | '/store/$storeId/products'
    | '/store/$storeId/promotions'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/products/$productId'
    | '/store'
    | '/'
    | '/cart'
    | '/search'
    | '/store/$storeId'
    | '/store/$storeId/products'
    | '/store/$storeId/promotions'
  id:
    | '__root__'
    | '/products/$productId'
    | '/store'
    | '/store/_layout'
    | '/(home)/'
    | '/cart/'
    | '/search/'
    | '/store/_layout/$storeId/'
    | '/store/_layout/$storeId/products/'
    | '/store/_layout/$storeId/promotions/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  ProductsProductIdRoute: typeof ProductsProductIdRoute
  StoreRoute: typeof StoreRouteWithChildren
  homeIndexRoute: typeof homeIndexRoute
  CartIndexRoute: typeof CartIndexRoute
  SearchIndexRoute: typeof SearchIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  ProductsProductIdRoute: ProductsProductIdRoute,
  StoreRoute: StoreRouteWithChildren,
  homeIndexRoute: homeIndexRoute,
  CartIndexRoute: CartIndexRoute,
  SearchIndexRoute: SearchIndexRoute,
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
        "/products/$productId",
        "/store",
        "/(home)/",
        "/cart/",
        "/search/"
      ]
    },
    "/products/$productId": {
      "filePath": "products/$productId.tsx"
    },
    "/store": {
      "filePath": "store",
      "children": [
        "/store/_layout"
      ]
    },
    "/store/_layout": {
      "filePath": "store/_layout.tsx",
      "parent": "/store",
      "children": [
        "/store/_layout/$storeId/",
        "/store/_layout/$storeId/products/",
        "/store/_layout/$storeId/promotions/"
      ]
    },
    "/(home)/": {
      "filePath": "(home)/index.tsx"
    },
    "/cart/": {
      "filePath": "cart/index.tsx"
    },
    "/search/": {
      "filePath": "search/index.tsx"
    },
    "/store/_layout/$storeId/": {
      "filePath": "store/_layout.$storeId/index.tsx",
      "parent": "/store/_layout"
    },
    "/store/_layout/$storeId/products/": {
      "filePath": "store/_layout.$storeId/products/index.tsx",
      "parent": "/store/_layout"
    },
    "/store/_layout/$storeId/promotions/": {
      "filePath": "store/_layout.$storeId/promotions/index.tsx",
      "parent": "/store/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
