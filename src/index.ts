const {path} = require("path");
const sqlite3 = require('sqlite3').verbose();
const {MemorySession} = require('telegram/sessions');

const EXTENSION = '.session'

export class SQLiteSession extends MemorySession {
    constructor(sessionPath: string, extension: string = EXTENSION) {
        super();
        this.fileName = ':memory:';

        if(sessionPath){
            this.fileName = path.extname(sessionPath) === extension ? sessionPath : sessionPath + extension;
        }
    }

    async load(){
        new sqlite3.Database(this.fileName, sqlite3.OPEN_READONLY, (err: Error | null) => {
            if(err){
                console.error(err);
            }
            console.log("Connected to " + this.fileName);
        });
    }
}

module.exports = SQLiteSession;