var express = require('express');
var router = express.Router();
var connection  = require('../lib/db');


/* GET home page. */
router.get('/', function(req, res, next) {

 connection.query('SELECT concertID, concertName, concertLocation FROM Concert',function(err,rows)     {

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
        name: '',
        email: ''
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
       req.flash('success', 'Concert added successfully! emp_no = ' + req.params.emp_no)
       // redirect to users list page
       res.redirect('/concerts')
   }

});
})

// SHOW EDIT USER FORM
router.get('/edit/(:id)', function(req, res, next){

connection.query('SELECT * FROM Concert WHERE id = ' + req.params.id, function(err, rows, fields) {
            if(err) throw err

            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'Concert not found with id = ' + req.params.id)
                res.redirect('/concerts')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                res.render('Concert/edit', {
                    title: 'Edit Customer',
                    //data: rows[0],
                    id: rows[0].id,
                    name: rows[0].name,
                    email: rows[0].email
                })
            }
        })

})

// EDIT USER POST ACTION
router.post('/update/:id', function(req, res, next) {
    req.assert('name', 'Name is required').notEmpty()           //Validate nam           //Validate age
    req.assert('email', 'A valid email is required').isEmail()  //Validate email

    var errors = req.validationErrors()

    if( !errors ) {

        var user = {
            name: req.sanitize('name').escape().trim(),
            email: req.sanitize('email').escape().trim()
        }

connection.query('UPDATE Concert SET ? WHERE id = ' + req.params.id, user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    res.render('Concert/edit', {
                        title: 'Edit Customer',
                        id: req.params.id,
                        name: req.body.name,
                        email: req.body.email
                    })
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
        res.render('concerts/edit', {
            title: 'Edit Customer',
            id: req.params.id,
            name: req.body.name,
            email: req.body.email
        })
    }
})

// DELETE USER
router.get('/delete/(:id)', function(req, res, next) {
    var user = { id: req.params.id }

connection.query('DELETE FROM Concert WHERE id = ' + req.params.id, user, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to users list page
                res.redirect('/Concert')
            } else {
                req.flash('success', 'Concert deleted successfully! id = ' + req.params.id)
                // redirect to users list page
                res.redirect('/concerts')
            }
        })
   })


module.exports = router;
