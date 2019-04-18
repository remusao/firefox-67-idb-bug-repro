# IndexedDB Bug Firefox 67

In Firefox 67 we observed that opening dev tools (console) will *make
Dexie (IndexedDB) transactions fail*. The code to reproduce is very
simple but we just used Rollup + web-ext for convenience. The code to
reproduce the issue is this:

```js
import Dexie from 'dexie';

setTimeout(() => {
  const db = new Dexie('test_db');
  db.version(1).stores({ test_table: 'test_key' });
  db.transaction('rw', db.test_table, () => db.test_table.toArray().then(console.log).catch(console.error));
}, 8000);
```

Building and loading this as a temporary extension in Firefox 67, then opening
dev-tools will print a failed transaction error (the 8 seconds timeout is meant
to give time to open the dev-tools but the value itself is not important):

```js
{
  "_e": {},
  "name": "InvalidStateError",
  "message": "An attempt was made to use an object that is not, or is no longer, usable",
  "inner": {},
}
```

To reproduce locally:
```js
npm run repro
```

This will take care of downloading Firefox 67, installing deps and bundling the
extension into `background.bundle.js` then open the `about:debugging` page.

You then need to click `Debug` and open the `console` tab. After a few seconds,
you should see the exception.

If you do not open the dev tools, then the exception will not be raised, it
seems that starting the debugging of an extension is sufficient and necessary to
trigger the issue. Opening the browser console does not trigger the issue.

**Further observations**:

* This issue appears only in Firefox 67, and not in Firefox 66 or below
* This issue appears with both `Dexie` 2.0.7 as well as 3.0.0 alpha
* This issue appears only when dev tools for the extension are opened
* This issue does not appear when dev tools are closed
* This issue does not appear when browser console is open (only when the
  extension dev tool console is)
* We could not reproduce with a pure-IndexedDB example
* We did not try to reproduce with a web-page example (only webextension)
