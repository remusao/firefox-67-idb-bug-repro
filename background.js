import Dexie from 'dexie';

setTimeout(() => {
  const db = new Dexie('test_db');
  db.version(1).stores({ test_table: 'test_key' });
  db.transaction('rw', db.test_table, () => db.test_table.toArray().then(console.log).catch(console.error));
}, 8000);
