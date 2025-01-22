/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as homeIndexImport } from './routes/(home)/index'
import { Route as ProductsProductIdImport } from './routes/products/$productId'

// Create/Update Routes

const homeIndexRoute = homeIndexImport.update({
  id: '/(home)/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProductsProductIdRoute = ProductsProductIdImport.update({
  id: '/products/$productId',
  path: '/products/$productId',
  getParentRoute: () => rootRoute,
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
    '/(home)/': {
      id: '/(home)/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof homeIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/products/$productId': typeof ProductsProductIdRoute
  '/': typeof homeIndexRoute
}

export interface FileRoutesByTo {
  '/products/$productId': typeof ProductsProductIdRoute
  '/': typeof homeIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/products/$productId': typeof ProductsProductIdRoute
  '/(home)/': typeof homeIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/products/$productId' | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '/products/$productId' | '/'
  id: '__root__' | '/products/$productId' | '/(home)/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  ProductsProductIdRoute: typeof ProductsProductIdRoute
  homeIndexRoute: typeof homeIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  ProductsProductIdRoute: ProductsProductIdRoute,
  homeIndexRoute: homeIndexRoute,
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
        "/(home)/"
      ]
    },
    "/products/$productId": {
      "filePath": "products/$productId.tsx"
    },
    "/(home)/": {
      "filePath": "(home)/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
