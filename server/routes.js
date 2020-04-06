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

  // for each table, query all the details
  let schemaArray = [];
  for (let i = 0; i < tableList.length; i++) {
    const table = tableList[i].table_name;
    console.log(table);
    const displayTableData = `select table_name, column_name, data_type, character_maximum_length, is_nullable
    from INFORMATION_SCHEMA.COLUMNS where table_name = '${table}';`;
    schemaData = await db.query(displayTableData);
    schemaArray.push(schemaData.rows);
  }
  res.status(200).send(schemaArray);
});

module.exports = router;
