var express = require('express');
var router = express.Router();
var connection  = require('../lib/db');


/* GET home page. */
router.get('/', function(req, res, next) {

 connection.query('SELECT * FROM Concert',function(err,rows)     {

        if(err){
         req.flash('error', err);
         res.render('concerts',{page_title:"concerts",data:''});
        }else{
              res.render('concerts',{page_title:"concerts",data:rows});
        }
         });

    });

// SHOW ADD PLAYLIST FORM
router.get('/add', function(req, res, next){
    // render to views/user/add.ejs
    res.render('concerts/add', {
        title: 'Add New Concert',
        concertId: '',
        concertName: '',
        concertLocation: '',
        concertYear: ''
    })
})

// ADD NEW USER POST ACTION
router.post('/add', function(req, res, next){
  var params  = req.body;
  console.log(params);
  connection.query('INSERT INTO Concert SET ?', params, function (err, results, fields) {
  //if (error) throw error;
   //res.redirect('/employees');
  //res.end(JSON.stringify(results));
   if (err) {
       req.flash('error', err)
       // redirect to users list page
       res.redirect('/concerts')
   } else {
       req.flash('success', 'Concert added successfully! = ' + req.params.concertId)
       // redirect to users list page
       res.redirect('/concerts')
   }

});
})

// SHOW EDIT USER FORM
router.get('/edit/(:concertId)', function(req, res, next){
var params  = req.body;
connection.query('SELECT * FROM Concert WHERE concertId = ' + req.params.concertId, function(err, rows, fields) {
            if(err) throw err;

            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'Concert not found with id = ' + req.params.concertId)
                res.redirect('/concerts')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                res.render('concerts/Edit', {
                    title: 'Edit Concert',
                    //data: rows[0],
                    concertId: rows[0].concertId,
                    concertName: rows[0].concertName,
                    concertLocation: rows[0].concertLocation,
                    concertYear:rows[0].concertYear
                })
            }
        })

})

// EDIT USER POST ACTION
router.post('/update/:concertId', function(req, res, next) {
  var params  = req.body;
    //req.assert('concertName', 'Name is required').notEmpty()
    //req.assert('concertLocation', 'Location is required').notEmpty()          //Validate nam           //Validate age
    console.log(params);
    var errors = req.validationErrors()

    if( !errors ) {

        var user = {
          concertId: req.params.concertId,
          concertName: req.params.concertName,
          concertLocation: req.params.concertLocation,
          concertYear: req.params.concertYear
        }

connection.query('UPDATE Concert SET ? WHERE concertId = ' + req.params.concertId, params, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    //res.render('Concert/edit', {
                      //concertId: req.params.concertId,
                      //concertName: req.params.concertName,
                      //concertLocation: req.params.concertLocation,
                      //concertYear: req.params.concertYear
                  //  })
                } else {
                    req.flash('success', 'Data updated successfully!');
                    res.redirect('/concerts');
                }
            })

    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)

        /**
         * Using req.body.name
         * because req.param('name') is deprecated
         */
    //    res.render('concerts/edit', {
      //      title: 'Edit Concert',
        //    concertId: req.params.concertId,
          //  concertName: req.params.concertName,
            //concertLocation: req.params.concertLocation,
            //concertYear: req.params.concertYear
      //  })
    }
})

// DELETE USER
router.get('/delete/(:concertId)', function(req, res, next) {
    var params  = req.body;
    var user = { concertId: req.params.concertId };
connection.query('DELETE FROM Concert WHERE concertId = ' + req.params.concertId, user, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to users list page
                res.redirect('/Concert')
            } else {
                req.flash('success', 'Concert deleted successfully! id = ' + req.params.concertId)
                // redirect to users list page
                res.redirect('/concerts')
            }
        })
   })


module.exports = router;
