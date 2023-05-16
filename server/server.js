const express = require('express');
const cors = require('cors');
const app = express();
const port = 2500;
const fs = require('fs');

const Timetable = require('comcigan-parser');
const timetable = new Timetable();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', function(req, res) {
  res.send('main');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
