const express = require('express');
const app = express();
const PORT = 3000;
require('dotenv').config();
const dbRouter = require('./routes');

app.use('/db', dbRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
