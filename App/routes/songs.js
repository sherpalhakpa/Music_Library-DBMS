var express = require('express');
var router = express.Router();
var connection  = require('../lib/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * from employees',function(err,rows)     {

         if(err){
          req.flash('error', err);
          res.render('concert',{page_title:"concert",data:''});
         }else{
               res.render('concert',{page_title:"concert",data:rows});
         }
          });

});

router.get('/search', function(req, res, next){
    // render to views/user/add.ejs
    res.render('songs/search', {
        title: 'Search for a Song',
        emp_no: '',
        first_name: ''
    })
})

// ADD NEW USER POST ACTION
router.post('/search', function (req, res) {
   var params  = req.body;
   console.log(params);
   connection.query('SELECT emp_no, first_name from employees WHERE first_name LIKE ?', params.first_name, function (err, results, fields) {
	  //if (error) throw error;
    //res.redirect('/employees');
	  //res.end(JSON.stringify(results));
    if (err) {
        req.flash('error', err)
        // redirect to users list page
    } else {
        req.flash('success', 'Song with name'+ params.name +'found')
        // redirect to users list page
         res.render('concert',{page_title:"concert",data:rows});
    }

	});
});

module.exports = router;
