# gramjs-sqlitesession

GramJS SqliteSession for working with **.session** files.
>Note: SqliteSession does not support using inside the browser. (Node.js ONLY)

## How to get started

Install **gramjs-sqlitesession**:

```
$ npm i -D gramjs-sqlitesession
```

Then run this code to send a message to yourself.

```javascript
const {TelegramClient} = require('telegram');
const SQLiteSession = require('gramjs-sqlitesession');

const apiId = 123456;
const apiHash = "123456abcdfg";
const pathToSessionFile = "./1234567890.session";
const sqliteSession = new SQLiteSession(pathToSessionFile);

(async () => {
  console.log("Loading interactive example...");
  const client = new TelegramClient(sqliteSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.connect();
  await client.sendMessage("me", { message: "Hello!" });
  await client.disconnect();
})();
```

> Note: It is not possible to create .session file for unauthorized user for now