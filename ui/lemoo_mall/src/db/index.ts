import Dexie, { EntityTable } from "dexie";
import { AddressModel } from "./models/address.model";
import { SearchHistoryModel } from "./models/search.model";

const db = new Dexie("LemooDatabase") as Dexie & {
    searchHistories: EntityTable<SearchHistoryModel, "keyword">;
    addresses: EntityTable<AddressModel, "id">;
};

// Schema declaration:
db.version(2).stores({
    searchHistories: "keyword",
    cartItems: "id, storeId",
    addresses: "id",
});

export { db };
