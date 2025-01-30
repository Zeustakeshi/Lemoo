import { Pageable } from "@/common/type/page.type";
import { StoreType } from "@/common/type/store.type";

export const stores: StoreType[] = [
    {
        storeId: "1",
        name: "SuperMart",
        shortCode: "SM",
        status: "ACTIVE",
        type: "CORPORATE",
    },
    {
        storeId: "2",
        name: "FreshFoods",
        shortCode: "FF",
        status: "ACTIVE",
        type: "INDIVIDUAL",
    },
    {
        storeId: "3",
        name: "TechGadgets",
        shortCode: "TG",
        status: "PENDING",
        type: "CORPORATE",
    },
    {
        storeId: "4",
        name: "FashionStyle",
        shortCode: "FS",
        status: "ACTIVE",
        type: "INDIVIDUAL",
    },
    {
        storeId: "5",
        name: "HomeDeco",
        shortCode: "HD",
        status: "NOT_ACTIVE",
        type: "CORPORATE",
    },
    {
        storeId: "6",
        name: "SportZone",
        shortCode: "SZ",
        status: "ACTIVE",
        type: "INDIVIDUAL",
    },
    {
        storeId: "7",
        name: "BookWorms",
        shortCode: "BW",
        status: "ACTIVE",
        type: "CORPORATE",
    },
    {
        storeId: "8",
        name: "HealthHaven",
        shortCode: "HH",
        status: "PENDING",
        type: "INDIVIDUAL",
    },
    {
        storeId: "9",
        name: "PetParadise",
        shortCode: "PP",
        status: "ACTIVE",
        type: "CORPORATE",
    },
    {
        storeId: "10",
        name: "GourmetDelight",
        shortCode: "GD",
        status: "ACTIVE",
        type: "INDIVIDUAL",
    },
];

export const pageStores: Pageable<StoreType> = {
    content: stores,
    empty: false,
    first: true,
    last: false,
    pageNumber: 0,
    size: 10,
    totalElements: 10,
    totalPages: 1,
};
