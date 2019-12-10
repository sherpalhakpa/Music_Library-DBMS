var express = require('express');
var router = express.Router();
var connection  = require('../lib/db');


/* GET home page. */
router.get('/', function(req, res, next) {

 connection.query('SELECT e.emp_no, e.first_name FROM employees e ORDER BY emp_no desc',function(err,rows)     {

        if(err){
         req.flash('error', err);
         res.render('employees',{page_title:"Employees - Node.js",data:''});
        }else{
              res.render('employees',{page_title:"Employees - Node.js",data:rows});
        }

         });

    });


// SHOW ADD USER FORM
router.get('/add', function(req, res, next){
    // render to views/user/add.ejs
    res.render('employees/add', {
        title: 'Add New Employees',
        emp_no: '',
        first_name: ''
    })
})

// ADD NEW USER POST ACTION
router.post('/add', function (req, res) {
   var params  = req.body;
   console.log(params);
   connection.query('INSERT INTO employees SET ?', params, function (err, results, fields) {
	  //if (error) throw error;
    //res.redirect('/employees');
	  //res.end(JSON.stringify(results));
    if (err) {
        req.flash('error', err)
        // redirect to users list page
        res.redirect('/employees')
    } else {
        req.flash('success', 'Employee added successfully! emp_no = ' + req.params.emp_no)
        // redirect to users list page
        res.redirect('/employees')
    }

	});
});

// SHOW EDIT USER FORM
router.get('/edit/(:emp_no)', function(req, res, next){

connection.query('SELECT * FROM employees WHERE emp_no = ' + req.params.emp_no, function(err, rows, fields) {
            if(err) throw err

            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'Employees not found with emp_no = ' + req.params.emp_no)
                res.redirect('/employees')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                res.render('employees/edit', {
                    title: 'Edit Customer',
                    //data: rows[0],
                    id: rows[0].emp_no,
                    name: rows[0].first_name
                })
            }
        })

})

// EDIT USER POST ACTION
router.post('/update/:emp_no', function(req, res, next) {
    req.assert('emp_no', 'Name is required').notEmpty()           //Validate nam           //Validate age
    req.assert('first_name', 'A valid email is required').notEmpty()  //Validate email

    var errors = req.validationErrors()

    if( !errors ) {

        var user = {
            emp_no: req.sanitize('emp_no').escape().trim(),
            first_name: req.sanitize('first_name').escape().trim()
        }

connection.query('UPDATE employees SET ? WHERE emp_no = ' + req.params.emp_no, user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    res.render('employees/edit', {
                        title: 'Edit Customer',
                        emp_no: req.params.emp_no,
                        first_name: req.body.first_name,
                    })
                } else {
                    req.flash('success', 'Data updated successfully!');
                    res.redirect('/employees');
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
        res.render('employees/edit', {
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

connection.query('DELETE FROM employees WHERE emp_no = ' + req.params.id, user, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to users list page
                res.redirect('/employees')
            } else {
                req.flash('success', 'Customer deleted successfully! id = ' + req.params.id)
                // redirect to users list page
                res.redirect('/employees')
            }
        })
   })


module.exports = router;
