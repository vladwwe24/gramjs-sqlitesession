const path = require("path");
const sqlite3 = require("sqlite3");
const {open} = require('sqlite');
const {AuthKey} = require("telegram/crypto/AuthKey");
const {MemorySession} = require("telegram/sessions");

const EXTENSION = '.session'

class SQLiteSession extends MemorySession {
    constructor(sessionPath, extension = EXTENSION) {
        super();
        sqlite3.verbose();

        this.fileName = ':memory:';

        if (sessionPath) {
            this.fileName = path.extname(sessionPath) === extension ? sessionPath : sessionPath + extension;
        }
    }

    async load() {
        this._conn = await open({
            filename: this.fileName,
            driver: sqlite3.Database
        });
        const session = await this._conn.get("select * from sessions");

        let authKey = session?.auth_key;
        if (authKey && typeof authKey === "object") {
            this._authKey = new AuthKey();
            if ("data" in authKey) {
                authKey = Buffer.from(authKey.data);
            }
            await this._authKey.setKey(authKey);
        }

        const dcId = session?.dc_id;
        if (dcId) {
            this._dcId = dcId;
        }

        const port = session?.port;
        if (port) {
            this._port = port;
        }
        const serverAddress = session?.server_address;
        if (serverAddress) {
            this._serverAddress = serverAddress;
        }
    }
}

module.exports = SQLiteSession;