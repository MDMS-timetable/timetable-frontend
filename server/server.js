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

const schoolFinder = (schoolName, region) => (schoolList) => {
const targetSchool = schoolList.find((school) => {
    return school.region === region && school.name.includes(schoolName);
});
return targetSchool;
};

timetable
.init({ cache: 1000 * 60 * 60 }) // 캐시 1시간동안 보관
.then(() => timetable.search('만덕중학교'))
.then(schoolFinder('만덕중학교', '만덕'))
.then((school) => timetable.setSchool(59955))
.then(() => {
    // 수업시간정보
    Promise.all([timetable.getTimetable()]).then((result) => {
      console.log(result);

      // result[학년][반][요일][교시]
      for (var i = 0; i < 8; i++) {
          if (result[0][1][1][0][i].subject !== '')
          console.log(result[0][1][1][0][i]);
      }

      app.get('/timetable', function(req, res) {
          // res.send(JSON.stringify(result[0][1][1][0]));
          // JSON.stringify(result, null, 2);
          // for (var i = 0; i < 8; i++) {
          // if (result[0][1][1][0][i].subject !== '')
          //     res.send(result[0][1][1][0][i]);
          // }
          res.json(result[0]);
      });
    });

    // 시간표
    Promise.all([timetable.getClassTime()]).then((result) => {
      console.log(result);
      app.get('/schedule', function(req, res) {
          res.json(result);
      });
    });


});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

