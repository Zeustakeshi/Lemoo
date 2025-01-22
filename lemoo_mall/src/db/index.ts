import Dexie, { EntityTable } from "dexie";
import { SearchHistoryModel } from "./models/search.model";

const db = new Dexie("LemooDatabase") as Dexie & {
    searchHistories: EntityTable<SearchHistoryModel, "keyword">;
};

// Schema declaration:
db.version(1).stores({
    searchHistories: "keyword",
});

export { db };
