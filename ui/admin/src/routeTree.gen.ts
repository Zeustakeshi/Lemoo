/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SidebarImport } from './routes/_sidebar'
import { Route as AuthAuthImport } from './routes/auth/_auth'
import { Route as SidebarhomeIndexImport } from './routes/_sidebar.(home)/index'
import { Route as AuthAuthLoginImport } from './routes/auth/_auth.login'
import { Route as SidebarStoresStoreImport } from './routes/_sidebar.stores/_store'
import { Route as SidebarStoresStoreIndexImport } from './routes/_sidebar.stores/_store.index'

// Create Virtual Routes

const AuthImport = createFileRoute('/auth')()
const SidebarStoresImport = createFileRoute('/_sidebar/stores')()

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const SidebarRoute = SidebarImport.update({
  id: '/_sidebar',
  getParentRoute: () => rootRoute,
} as any)

const SidebarStoresRoute = SidebarStoresImport.update({
  id: '/stores',
  path: '/stores',
  getParentRoute: () => SidebarRoute,
} as any)

const AuthAuthRoute = AuthAuthImport.update({
  id: '/_auth',
  getParentRoute: () => AuthRoute,
} as any)

const SidebarhomeIndexRoute = SidebarhomeIndexImport.update({
  id: '/(home)/',
  path: '/',
  getParentRoute: () => SidebarRoute,
} as any)

const AuthAuthLoginRoute = AuthAuthLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthAuthRoute,
} as any)

const SidebarStoresStoreRoute = SidebarStoresStoreImport.update({
  id: '/_store',
  getParentRoute: () => SidebarStoresRoute,
} as any)

const SidebarStoresStoreIndexRoute = SidebarStoresStoreIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => SidebarStoresStoreRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_sidebar': {
      id: '/_sidebar'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof SidebarImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/auth/_auth': {
      id: '/auth/_auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthAuthImport
      parentRoute: typeof AuthRoute
    }
    '/_sidebar/stores': {
      id: '/_sidebar/stores'
      path: '/stores'
      fullPath: '/stores'
      preLoaderRoute: typeof SidebarStoresImport
      parentRoute: typeof SidebarImport
    }
    '/_sidebar/stores/_store': {
      id: '/_sidebar/stores/_store'
      path: '/stores'
      fullPath: '/stores'
      preLoaderRoute: typeof SidebarStoresStoreImport
      parentRoute: typeof SidebarStoresRoute
    }
    '/auth/_auth/login': {
      id: '/auth/_auth/login'
      path: '/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthAuthLoginImport
      parentRoute: typeof AuthAuthImport
    }
    '/_sidebar/(home)/': {
      id: '/_sidebar/(home)/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof SidebarhomeIndexImport
      parentRoute: typeof SidebarImport
    }
    '/_sidebar/stores/_store/': {
      id: '/_sidebar/stores/_store/'
      path: '/'
      fullPath: '/stores/'
      preLoaderRoute: typeof SidebarStoresStoreIndexImport
      parentRoute: typeof SidebarStoresStoreImport
    }
  }
}

// Create and export the route tree

interface SidebarStoresStoreRouteChildren {
  SidebarStoresStoreIndexRoute: typeof SidebarStoresStoreIndexRoute
}

const SidebarStoresStoreRouteChildren: SidebarStoresStoreRouteChildren = {
  SidebarStoresStoreIndexRoute: SidebarStoresStoreIndexRoute,
}

const SidebarStoresStoreRouteWithChildren =
  SidebarStoresStoreRoute._addFileChildren(SidebarStoresStoreRouteChildren)

interface SidebarStoresRouteChildren {
  SidebarStoresStoreRoute: typeof SidebarStoresStoreRouteWithChildren
}

const SidebarStoresRouteChildren: SidebarStoresRouteChildren = {
  SidebarStoresStoreRoute: SidebarStoresStoreRouteWithChildren,
}

const SidebarStoresRouteWithChildren = SidebarStoresRoute._addFileChildren(
  SidebarStoresRouteChildren,
)

interface SidebarRouteChildren {
  SidebarStoresRoute: typeof SidebarStoresRouteWithChildren
  SidebarhomeIndexRoute: typeof SidebarhomeIndexRoute
}

const SidebarRouteChildren: SidebarRouteChildren = {
  SidebarStoresRoute: SidebarStoresRouteWithChildren,
  SidebarhomeIndexRoute: SidebarhomeIndexRoute,
}

const SidebarRouteWithChildren =
  SidebarRoute._addFileChildren(SidebarRouteChildren)

interface AuthAuthRouteChildren {
  AuthAuthLoginRoute: typeof AuthAuthLoginRoute
}

const AuthAuthRouteChildren: AuthAuthRouteChildren = {
  AuthAuthLoginRoute: AuthAuthLoginRoute,
}

const AuthAuthRouteWithChildren = AuthAuthRoute._addFileChildren(
  AuthAuthRouteChildren,
)

interface AuthRouteChildren {
  AuthAuthRoute: typeof AuthAuthRouteWithChildren
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthAuthRoute: AuthAuthRouteWithChildren,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof SidebarRouteWithChildren
  '/auth': typeof AuthAuthRouteWithChildren
  '/stores': typeof SidebarStoresStoreRouteWithChildren
  '/auth/login': typeof AuthAuthLoginRoute
  '/': typeof SidebarhomeIndexRoute
  '/stores/': typeof SidebarStoresStoreIndexRoute
}

export interface FileRoutesByTo {
  '/auth': typeof AuthAuthRouteWithChildren
  '/stores': typeof SidebarStoresStoreIndexRoute
  '/auth/login': typeof AuthAuthLoginRoute
  '/': typeof SidebarhomeIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_sidebar': typeof SidebarRouteWithChildren
  '/auth': typeof AuthRouteWithChildren
  '/auth/_auth': typeof AuthAuthRouteWithChildren
  '/_sidebar/stores': typeof SidebarStoresRouteWithChildren
  '/_sidebar/stores/_store': typeof SidebarStoresStoreRouteWithChildren
  '/auth/_auth/login': typeof AuthAuthLoginRoute
  '/_sidebar/(home)/': typeof SidebarhomeIndexRoute
  '/_sidebar/stores/_store/': typeof SidebarStoresStoreIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/auth' | '/stores' | '/auth/login' | '/' | '/stores/'
  fileRoutesByTo: FileRoutesByTo
  to: '/auth' | '/stores' | '/auth/login' | '/'
  id:
    | '__root__'
    | '/_sidebar'
    | '/auth'
    | '/auth/_auth'
    | '/_sidebar/stores'
    | '/_sidebar/stores/_store'
    | '/auth/_auth/login'
    | '/_sidebar/(home)/'
    | '/_sidebar/stores/_store/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  SidebarRoute: typeof SidebarRouteWithChildren
  AuthRoute: typeof AuthRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  SidebarRoute: SidebarRouteWithChildren,
  AuthRoute: AuthRouteWithChildren,
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
        "/_sidebar",
        "/auth"
      ]
    },
    "/_sidebar": {
      "filePath": "_sidebar.tsx",
      "children": [
        "/_sidebar/stores",
        "/_sidebar/(home)/"
      ]
    },
    "/auth": {
      "filePath": "auth",
      "children": [
        "/auth/_auth"
      ]
    },
    "/auth/_auth": {
      "filePath": "auth/_auth.tsx",
      "parent": "/auth",
      "children": [
        "/auth/_auth/login"
      ]
    },
    "/_sidebar/stores": {
      "filePath": "_sidebar.stores",
      "parent": "/_sidebar",
      "children": [
        "/_sidebar/stores/_store"
      ]
    },
    "/_sidebar/stores/_store": {
      "filePath": "_sidebar.stores/_store.tsx",
      "parent": "/_sidebar/stores",
      "children": [
        "/_sidebar/stores/_store/"
      ]
    },
    "/auth/_auth/login": {
      "filePath": "auth/_auth.login.tsx",
      "parent": "/auth/_auth"
    },
    "/_sidebar/(home)/": {
      "filePath": "_sidebar.(home)/index.tsx",
      "parent": "/_sidebar"
    },
    "/_sidebar/stores/_store/": {
      "filePath": "_sidebar.stores/_store.index.tsx",
      "parent": "/_sidebar/stores/_store"
    }
  }
}
ROUTE_MANIFEST_END */
