const db = require('./dbConnect');
const Router = require('express-promise-router');

const router = new Router();

module.exports = router;

// Get table names
router.get('/tables', async (req, res) => {
  const displayTableNames =
    "SELECT table_name FROM information_schema.tables WHERE table_type='BASE TABLE' AND table_schema='public'";
  const { rows } = await db.query(displayTableNames);
  res.status(200).send(rows);
});

// Get table schemas
router.get('/schemas', async (req, res) => {
  const tableList = [];
  const displayTableNames =
    "SELECT table_name FROM information_schema.tables WHERE table_type='BASE TABLE' AND table_schema='public'";
  const { rows } = await db.query(displayTableNames);

  // add table names to array
  for (table of rows) {
    tableList.push(table);
  }

  // for each table, get all column details
  let schemaArray = [];
  for (let i = 0; i < tableList.length; i++) {
    const table = tableList[i].table_name;
    console.log(table);
    const displayTableData = `select table_name, column_name, data_type, column_default, character_maximum_length, is_nullable
    from INFORMATION_SCHEMA.COLUMNS where table_name = '${table}';`;
    schemaData = await db.query(displayTableData);
    schemaArray.push(schemaData.rows);
  }
  res.status(200).send(schemaArray);
});

// Returns list of primary and foreign keys
router.get('/fk', async (req, res) => {
  const displayfk = `SELECT conrelid::regclass AS table_from, conname, pg_get_constraintdef(oid) FROM pg_constraint WHERE  contype IN ('f', 'p ') AND connamespace = 'public'::regnamespace  -- your schema here ORDER  BY conrelid::regclass::text, contype DESC;`;
  const { rows } = await db.query(displayfk);
  res.status(200).send(rows);
});

module.exports = router;
