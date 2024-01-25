//login.js
var express = require('express');
var router = express.Router();
let dbCon = require('../lib/db');
const checkAuth = require('../middleware/checkAuth');

const checkmarket  = require('../middleware/Check_Employer');
const checkuser  = require('../middleware/Check_Emplyee');



router.get('/',(req, res) => {
    res.render('user/login', { user: "", password: "" });
});


// loginRoutes.js
router.post('/log', (req, res) => {
    const user = req.body.user;
    const password = req.body.password;

    if (!user || !password) {
        res.redirect('/login');
        return;
    }

    // Query the database
    dbCon.query('SELECT * FROM user WHERE username = ? AND password = ?', [user, password], (err, rows) => {
        
        if (err) {
            console.error(err);
            res.redirect('/login');
            return;
        }

        if (rows.length > 0) {
            // Set session variables
            req.session.user = user;
            req.session.password = password;
            req.session.userId = rows[0].user_id;
          

            // Check the role
            if (rows[0].role === 1) {
                req.session.isLoggedIn = true;
                req.session.isAdmin = true;
                res.redirect('/admin');
            } else if (rows[0].role === 2 ) {
                req.session.isEmployer = true;
                dbCon.query(`
  
                SELECT market.*
              FROM market
              INNER JOIN user ON market.market_id = user.market_id
              WHERE user.user_id = ?`,[req.session.userId],(err,rows) =>{
              
              
                  
                  res.render('market/feed_market', { 
                      market_name: rows[0].market_name,
                      userId: req.session.userId,
                      market_id: rows[0].market_id
                  
                  
                  });
                });
                
                 
            } else if (rows[0].role === 3) {
                req.session.isEmployee = true;
                res.render('user/feed_user',{ user : user}); 
                // Redirect to employee route
            } else {
                res.redirect('/login'); // Role does not match
            }
        } else {
            res.redirect('/login'); // User not found
        }
    });
});

//ถูกละ

router.use(checkAuth);
router.use(checkmarket);
router.use(checkuser);


module.exports = router;