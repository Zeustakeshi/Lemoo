/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from "@tanstack/react-router";

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as IndexImport } from "./routes/index";
import { Route as ProductProductImport } from "./routes/product/_product";
import { Route as ProductProductAddProductImport } from "./routes/product/_product.addProduct";
import { Route as ProfileImport } from "./routes/profile";
import { Route as PromotionVouchersFreeshipingIndexImport } from "./routes/promotion/vouchers/freeshiping/index";
import { Route as PromotionVouchersIndexImport } from "./routes/promotion/vouchers/index";
import { Route as PromotionVouchersRegularIndexImport } from "./routes/promotion/vouchers/regular/index";
import { Route as PromotionVouchersStoreFollowerIndexImport } from "./routes/promotion/vouchers/store-follower/index";
import { Route as StoreStoreImport } from "./routes/store/_store";
import { Route as StoreStoreCreateImport } from "./routes/store/_store.create";
import { Route as StoreStoreDashboardImport } from "./routes/store/_store.dashboard";

// Create Virtual Routes

const StoreImport = createFileRoute("/store")();
const ProductImport = createFileRoute("/product")();

// Create/Update Routes

const StoreRoute = StoreImport.update({
    id: "/store",
    path: "/store",
    getParentRoute: () => rootRoute,
} as any);

const ProductRoute = ProductImport.update({
    id: "/product",
    path: "/product",
    getParentRoute: () => rootRoute,
} as any);

const ProfileRoute = ProfileImport.update({
    id: "/profile",
    path: "/profile",
    getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
    id: "/",
    path: "/",
    getParentRoute: () => rootRoute,
} as any);

const StoreStoreRoute = StoreStoreImport.update({
    id: "/_store",
    getParentRoute: () => StoreRoute,
} as any);

const ProductProductRoute = ProductProductImport.update({
    id: "/_product",
    getParentRoute: () => ProductRoute,
} as any);

const PromotionVouchersIndexRoute = PromotionVouchersIndexImport.update({
    id: "/promotion/vouchers/",
    path: "/promotion/vouchers/",
    getParentRoute: () => rootRoute,
} as any);

const StoreStoreDashboardRoute = StoreStoreDashboardImport.update({
    id: "/dashboard",
    path: "/dashboard",
    getParentRoute: () => StoreStoreRoute,
} as any);

const StoreStoreCreateRoute = StoreStoreCreateImport.update({
    id: "/create",
    path: "/create",
    getParentRoute: () => StoreStoreRoute,
} as any);

const ProductProductAddProductRoute = ProductProductAddProductImport.update({
    id: "/addProduct",
    path: "/addProduct",
    getParentRoute: () => ProductProductRoute,
} as any);

const PromotionVouchersStoreFollowerIndexRoute =
    PromotionVouchersStoreFollowerIndexImport.update({
        id: "/promotion/vouchers/store-follower/",
        path: "/promotion/vouchers/store-follower/",
        getParentRoute: () => rootRoute,
    } as any);

const PromotionVouchersRegularIndexRoute =
    PromotionVouchersRegularIndexImport.update({
        id: "/promotion/vouchers/regular/",
        path: "/promotion/vouchers/regular/",
        getParentRoute: () => rootRoute,
    } as any);

const PromotionVouchersFreeshipingIndexRoute =
    PromotionVouchersFreeshipingIndexImport.update({
        id: "/promotion/vouchers/freeshiping/",
        path: "/promotion/vouchers/freeshiping/",
        getParentRoute: () => rootRoute,
    } as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
    interface FileRoutesByPath {
        "/": {
            id: "/";
            path: "/";
            fullPath: "/";
            preLoaderRoute: typeof IndexImport;
            parentRoute: typeof rootRoute;
        };
        "/profile": {
            id: "/profile";
            path: "/profile";
            fullPath: "/profile";
            preLoaderRoute: typeof ProfileImport;
            parentRoute: typeof rootRoute;
        };
        "/product": {
            id: "/product";
            path: "/product";
            fullPath: "/product";
            preLoaderRoute: typeof ProductImport;
            parentRoute: typeof rootRoute;
        };
        "/product/_product": {
            id: "/product/_product";
            path: "/product";
            fullPath: "/product";
            preLoaderRoute: typeof ProductProductImport;
            parentRoute: typeof ProductRoute;
        };
        "/store": {
            id: "/store";
            path: "/store";
            fullPath: "/store";
            preLoaderRoute: typeof StoreImport;
            parentRoute: typeof rootRoute;
        };
        "/store/_store": {
            id: "/store/_store";
            path: "/store";
            fullPath: "/store";
            preLoaderRoute: typeof StoreStoreImport;
            parentRoute: typeof StoreRoute;
        };
        "/product/_product/addProduct": {
            id: "/product/_product/addProduct";
            path: "/addProduct";
            fullPath: "/product/addProduct";
            preLoaderRoute: typeof ProductProductAddProductImport;
            parentRoute: typeof ProductProductImport;
        };
        "/store/_store/create": {
            id: "/store/_store/create";
            path: "/create";
            fullPath: "/store/create";
            preLoaderRoute: typeof StoreStoreCreateImport;
            parentRoute: typeof StoreStoreImport;
        };
        "/store/_store/dashboard": {
            id: "/store/_store/dashboard";
            path: "/dashboard";
            fullPath: "/store/dashboard";
            preLoaderRoute: typeof StoreStoreDashboardImport;
            parentRoute: typeof StoreStoreImport;
        };
        "/promotion/vouchers/": {
            id: "/promotion/vouchers/";
            path: "/promotion/vouchers";
            fullPath: "/promotion/vouchers";
            preLoaderRoute: typeof PromotionVouchersIndexImport;
            parentRoute: typeof rootRoute;
        };
        "/promotion/vouchers/freeshiping/": {
            id: "/promotion/vouchers/freeshiping/";
            path: "/promotion/vouchers/freeshiping";
            fullPath: "/promotion/vouchers/freeshiping";
            preLoaderRoute: typeof PromotionVouchersFreeshipingIndexImport;
            parentRoute: typeof rootRoute;
        };
        "/promotion/vouchers/regular/": {
            id: "/promotion/vouchers/regular/";
            path: "/promotion/vouchers/regular";
            fullPath: "/promotion/vouchers/regular";
            preLoaderRoute: typeof PromotionVouchersRegularIndexImport;
            parentRoute: typeof rootRoute;
        };
        "/promotion/vouchers/store-follower/": {
            id: "/promotion/vouchers/store-follower/";
            path: "/promotion/vouchers/store-follower";
            fullPath: "/promotion/vouchers/store-follower";
            preLoaderRoute: typeof PromotionVouchersStoreFollowerIndexImport;
            parentRoute: typeof rootRoute;
        };
    }
}

// Create and export the route tree

interface ProductProductRouteChildren {
    ProductProductAddProductRoute: typeof ProductProductAddProductRoute;
}

const ProductProductRouteChildren: ProductProductRouteChildren = {
    ProductProductAddProductRoute: ProductProductAddProductRoute,
};

const ProductProductRouteWithChildren = ProductProductRoute._addFileChildren(
    ProductProductRouteChildren
);

interface ProductRouteChildren {
    ProductProductRoute: typeof ProductProductRouteWithChildren;
}

const ProductRouteChildren: ProductRouteChildren = {
    ProductProductRoute: ProductProductRouteWithChildren,
};

const ProductRouteWithChildren =
    ProductRoute._addFileChildren(ProductRouteChildren);

interface StoreStoreRouteChildren {
    StoreStoreCreateRoute: typeof StoreStoreCreateRoute;
    StoreStoreDashboardRoute: typeof StoreStoreDashboardRoute;
}

const StoreStoreRouteChildren: StoreStoreRouteChildren = {
    StoreStoreCreateRoute: StoreStoreCreateRoute,
    StoreStoreDashboardRoute: StoreStoreDashboardRoute,
};

const StoreStoreRouteWithChildren = StoreStoreRoute._addFileChildren(
    StoreStoreRouteChildren
);

interface StoreRouteChildren {
    StoreStoreRoute: typeof StoreStoreRouteWithChildren;
}

const StoreRouteChildren: StoreRouteChildren = {
    StoreStoreRoute: StoreStoreRouteWithChildren,
};

const StoreRouteWithChildren = StoreRoute._addFileChildren(StoreRouteChildren);

export interface FileRoutesByFullPath {
    "/": typeof IndexRoute;
    "/profile": typeof ProfileRoute;
    "/product": typeof ProductProductRouteWithChildren;
    "/store": typeof StoreStoreRouteWithChildren;
    "/product/addProduct": typeof ProductProductAddProductRoute;
    "/store/create": typeof StoreStoreCreateRoute;
    "/store/dashboard": typeof StoreStoreDashboardRoute;
    "/promotion/vouchers": typeof PromotionVouchersIndexRoute;
    "/promotion/vouchers/freeshiping": typeof PromotionVouchersFreeshipingIndexRoute;
    "/promotion/vouchers/regular": typeof PromotionVouchersRegularIndexRoute;
    "/promotion/vouchers/store-follower": typeof PromotionVouchersStoreFollowerIndexRoute;
}

export interface FileRoutesByTo {
    "/": typeof IndexRoute;
    "/profile": typeof ProfileRoute;
    "/product": typeof ProductProductRouteWithChildren;
    "/store": typeof StoreStoreRouteWithChildren;
    "/product/addProduct": typeof ProductProductAddProductRoute;
    "/store/create": typeof StoreStoreCreateRoute;
    "/store/dashboard": typeof StoreStoreDashboardRoute;
    "/promotion/vouchers": typeof PromotionVouchersIndexRoute;
    "/promotion/vouchers/freeshiping": typeof PromotionVouchersFreeshipingIndexRoute;
    "/promotion/vouchers/regular": typeof PromotionVouchersRegularIndexRoute;
    "/promotion/vouchers/store-follower": typeof PromotionVouchersStoreFollowerIndexRoute;
}

export interface FileRoutesById {
    __root__: typeof rootRoute;
    "/": typeof IndexRoute;
    "/profile": typeof ProfileRoute;
    "/product": typeof ProductRouteWithChildren;
    "/product/_product": typeof ProductProductRouteWithChildren;
    "/store": typeof StoreRouteWithChildren;
    "/store/_store": typeof StoreStoreRouteWithChildren;
    "/product/_product/addProduct": typeof ProductProductAddProductRoute;
    "/store/_store/create": typeof StoreStoreCreateRoute;
    "/store/_store/dashboard": typeof StoreStoreDashboardRoute;
    "/promotion/vouchers/": typeof PromotionVouchersIndexRoute;
    "/promotion/vouchers/freeshiping/": typeof PromotionVouchersFreeshipingIndexRoute;
    "/promotion/vouchers/regular/": typeof PromotionVouchersRegularIndexRoute;
    "/promotion/vouchers/store-follower/": typeof PromotionVouchersStoreFollowerIndexRoute;
}

export interface FileRouteTypes {
    fileRoutesByFullPath: FileRoutesByFullPath;
    fullPaths:
        | "/"
        | "/profile"
        | "/product"
        | "/store"
        | "/product/addProduct"
        | "/store/create"
        | "/store/dashboard"
        | "/promotion/vouchers"
        | "/promotion/vouchers/freeshiping"
        | "/promotion/vouchers/regular"
        | "/promotion/vouchers/store-follower";
    fileRoutesByTo: FileRoutesByTo;
    to:
        | "/"
        | "/profile"
        | "/product"
        | "/store"
        | "/product/addProduct"
        | "/store/create"
        | "/store/dashboard"
        | "/promotion/vouchers"
        | "/promotion/vouchers/freeshiping"
        | "/promotion/vouchers/regular"
        | "/promotion/vouchers/store-follower";
    id:
        | "__root__"
        | "/"
        | "/profile"
        | "/product"
        | "/product/_product"
        | "/store"
        | "/store/_store"
        | "/product/_product/addProduct"
        | "/store/_store/create"
        | "/store/_store/dashboard"
        | "/promotion/vouchers/"
        | "/promotion/vouchers/freeshiping/"
        | "/promotion/vouchers/regular/"
        | "/promotion/vouchers/store-follower/";
    fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
    IndexRoute: typeof IndexRoute;
    ProfileRoute: typeof ProfileRoute;
    ProductRoute: typeof ProductRouteWithChildren;
    StoreRoute: typeof StoreRouteWithChildren;
    PromotionVouchersIndexRoute: typeof PromotionVouchersIndexRoute;
    PromotionVouchersFreeshipingIndexRoute: typeof PromotionVouchersFreeshipingIndexRoute;
    PromotionVouchersRegularIndexRoute: typeof PromotionVouchersRegularIndexRoute;
    PromotionVouchersStoreFollowerIndexRoute: typeof PromotionVouchersStoreFollowerIndexRoute;
}

const rootRouteChildren: RootRouteChildren = {
    IndexRoute: IndexRoute,
    ProfileRoute: ProfileRoute,
    ProductRoute: ProductRouteWithChildren,
    StoreRoute: StoreRouteWithChildren,
    PromotionVouchersIndexRoute: PromotionVouchersIndexRoute,
    PromotionVouchersFreeshipingIndexRoute:
        PromotionVouchersFreeshipingIndexRoute,
    PromotionVouchersRegularIndexRoute: PromotionVouchersRegularIndexRoute,
    PromotionVouchersStoreFollowerIndexRoute:
        PromotionVouchersStoreFollowerIndexRoute,
};

export const routeTree = rootRoute
    ._addFileChildren(rootRouteChildren)
    ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/profile",
        "/product",
        "/store",
        "/promotion/vouchers/",
        "/promotion/vouchers/freeshiping/",
        "/promotion/vouchers/regular/",
        "/promotion/vouchers/store-follower/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/profile": {
      "filePath": "profile.tsx"
    },
    "/product": {
      "filePath": "product",
      "children": [
        "/product/_product"
      ]
    },
    "/product/_product": {
      "filePath": "product/_product.tsx",
      "parent": "/product",
      "children": [
        "/product/_product/addProduct"
      ]
    },
    "/store": {
      "filePath": "store",
      "children": [
        "/store/_store"
      ]
    },
    "/store/_store": {
      "filePath": "store/_store.tsx",
      "parent": "/store",
      "children": [
        "/store/_store/create",
        "/store/_store/dashboard"
      ]
    },
    "/product/_product/addProduct": {
      "filePath": "product/_product.addProduct.tsx",
      "parent": "/product/_product"
    },
    "/store/_store/create": {
      "filePath": "store/_store.create.tsx",
      "parent": "/store/_store"
    },
    "/store/_store/dashboard": {
      "filePath": "store/_store.dashboard.tsx",
      "parent": "/store/_store"
    },
    "/promotion/vouchers/": {
      "filePath": "promotion/vouchers/index.tsx"
    },
    "/promotion/vouchers/freeshiping/": {
      "filePath": "promotion/vouchers/freeshiping/index.tsx"
    },
    "/promotion/vouchers/regular/": {
      "filePath": "promotion/vouchers/regular/index.tsx"
    },
    "/promotion/vouchers/store-follower/": {
      "filePath": "promotion/vouchers/store-follower/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
