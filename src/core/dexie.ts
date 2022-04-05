import Dexie, { Table } from "dexie";
import IFriterie from "./models/iFriterie";

class DexieDatabase extends Dexie {
    public friteries: Table<IFriterie, string>;
    
    constructor() {
        super("iFriteriesDB");

        this.version(1)
            .stores({
                friteries: "id",
            });
        
        this.friteries= this.table('friteries');
    };
}

const database = new DexieDatabase();

export default database;