var express = require('express');
var router = express.Router();
let dbCon = require('../lib/db');


router.get('/api', (req, res) => {
    const query = req.query.query;
    
  
    // ดำเนินการค้นหาข้อมูลในฐานข้อมูล MySQL
    dbCon.query('SELECT * FROM subdistricts WHERE name_in_thai LIKE ? LIMIT 5',[query + '%'], (err, results) => {
      if (err) {
        console.error('มีข้อผิดพลาดในการค้นหาข้อมูล: ' + err.message);
        return;
      }
  
      // ส่งข้อมูลผลลัพธ์กลับในรูปแบบ JSON
      res.json({ results });
      console.log(results);
    });
  });

  router.get('/api2', (req, res) => {
    const query = req.query.query;
    
  
    // ดำเนินการค้นหาข้อมูลในฐานข้อมูล MySQL
    dbCon.query('SELECT * FROM subdistricts WHERE zip_code LIKE ? LIMIT 5',[query + '%'], (err, results) => {
      if (err) {
        console.error('มีข้อผิดพลาดในการค้นหาข้อมูล: ' + err.message);
        return;
      }
  
      // ส่งข้อมูลผลลัพธ์กลับในรูปแบบ JSON
      res.json({ results });
      console.log(results);
    });
  });



module.exports = router;
