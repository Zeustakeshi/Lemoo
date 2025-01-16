/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProfileImport } from './routes/profile'
import { Route as IndexImport } from './routes/index'
import { Route as AuthAuthImport } from './routes/auth/_auth'
import { Route as AuthAuthRegisterImport } from './routes/auth/_auth.register'
import { Route as AuthAuthLoginImport } from './routes/auth/_auth.login'

// Create Virtual Routes

const AuthImport = createFileRoute('/auth')()

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const ProfileRoute = ProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthAuthRoute = AuthAuthImport.update({
  id: '/_auth',
  getParentRoute: () => AuthRoute,
} as any)

const AuthAuthRegisterRoute = AuthAuthRegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => AuthAuthRoute,
} as any)

const AuthAuthLoginRoute = AuthAuthLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthAuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileImport
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
    '/auth/_auth/login': {
      id: '/auth/_auth/login'
      path: '/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthAuthLoginImport
      parentRoute: typeof AuthAuthImport
    }
    '/auth/_auth/register': {
      id: '/auth/_auth/register'
      path: '/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthAuthRegisterImport
      parentRoute: typeof AuthAuthImport
    }
  }
}

// Create and export the route tree

interface AuthAuthRouteChildren {
  AuthAuthLoginRoute: typeof AuthAuthLoginRoute
  AuthAuthRegisterRoute: typeof AuthAuthRegisterRoute
}

const AuthAuthRouteChildren: AuthAuthRouteChildren = {
  AuthAuthLoginRoute: AuthAuthLoginRoute,
  AuthAuthRegisterRoute: AuthAuthRegisterRoute,
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
  '/': typeof IndexRoute
  '/profile': typeof ProfileRoute
  '/auth': typeof AuthAuthRouteWithChildren
  '/auth/login': typeof AuthAuthLoginRoute
  '/auth/register': typeof AuthAuthRegisterRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/profile': typeof ProfileRoute
  '/auth': typeof AuthAuthRouteWithChildren
  '/auth/login': typeof AuthAuthLoginRoute
  '/auth/register': typeof AuthAuthRegisterRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/profile': typeof ProfileRoute
  '/auth': typeof AuthRouteWithChildren
  '/auth/_auth': typeof AuthAuthRouteWithChildren
  '/auth/_auth/login': typeof AuthAuthLoginRoute
  '/auth/_auth/register': typeof AuthAuthRegisterRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/profile' | '/auth' | '/auth/login' | '/auth/register'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/profile' | '/auth' | '/auth/login' | '/auth/register'
  id:
    | '__root__'
    | '/'
    | '/profile'
    | '/auth'
    | '/auth/_auth'
    | '/auth/_auth/login'
    | '/auth/_auth/register'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ProfileRoute: typeof ProfileRoute
  AuthRoute: typeof AuthRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ProfileRoute: ProfileRoute,
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
        "/",
        "/profile",
        "/auth"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/profile": {
      "filePath": "profile.tsx"
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
        "/auth/_auth/login",
        "/auth/_auth/register"
      ]
    },
    "/auth/_auth/login": {
      "filePath": "auth/_auth.login.tsx",
      "parent": "/auth/_auth"
    },
    "/auth/_auth/register": {
      "filePath": "auth/_auth.register.tsx",
      "parent": "/auth/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
