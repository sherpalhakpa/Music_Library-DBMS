var express = require('express');
var router = express.Router();
var connection  = require('../lib/db');


/* GET home page. */
router.get('/', function(req, res, next) {

 connection.query('SELECT artistId, artistName FROM Artist ORDER BY artistId desc',function(err,rows)     {

        if(err){
         req.flash('error', err);
         res.render('artists',{page_title:"Artists - Node.js",data:''});
        }else{
              res.render('artists',{page_title:"Artists - Node.js",data:rows});
        }

         });

    });


// SHOW ADD USER FORM
router.get('/add', function(req, res, next){
    // render to views/user/add.ejs
    res.render('artists/add', {
        title: 'Add New Artist',
        artistId: '',
        artistTitle: ''
    })
})

// ADD NEW USER POST ACTION
router.post('/add', function (req, res) {
   var params  = req.body;
   console.log(params);
   connection.query('INSERT INTO Artist SET ?', params, function (err, results, fields) {
	  //if (error) throw error;
    //res.redirect('/artists');
	  //res.end(JSON.stringify(results));
    if (err) {
        req.flash('error', err)
        // redirect to users list page
        res.redirect('/artists')
    } else {
        req.flash('success', 'Employee added successfully! artistId = ' + req.params.artistId)
        // redirect to users list page
        res.redirect('/artists')
    }

	});
});

// SHOW EDIT USER FORM
router.get('/edit/(:artistId)', function(req, res, next){

connection.query('SELECT songTitle FROM Song JOIN SongXArtist ON SongXArtist.songId=Song.songId JOIN Artist On Artist.artistId=SongXArtist.artistId WHERE Artist.artistId = ' + req.params.artistId, function(err, rows, fields) {
            if(err) throw err;

            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'Employees not found with artistId = ' + req.params.artistId)
                res.redirect('/artists')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                res.render('artists/edit',{data:rows});
                  //  songTitle: rows[0].songTitle
                }
          //  }
     });
   });
//})

// EDIT USER POST ACTION
router.post('/update/:artistId', function(req, res, next) {
    req.assert('artistId', 'Name is required').notEmpty()           //Validate nam           //Validate age
    req.assert('artistName', 'A valid email is required').notEmpty()  //Validate email

    var errors = req.validationErrors()

    if( !errors ) {

        var user = {
            artistId: req.sanitize('artistId').escape().trim(),
            first_name: req.sanitize('artistName').escape().trim()
        }

connection.query('UPDATE Artist SET ? WHERE artistId = ' + req.params.artistId, user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    res.render('artists/edit', {
                        title: 'Edit Customer',
                        artistId: req.params.artistId,
                        first_name: req.body.first_name,
                    })
                } else {
                    req.flash('success', 'Data updated successfully!');
                    res.redirect('/artists');
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
        res.render('artists/edit', {
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

connection.query('DELETE FROM Artist WHERE artistId = ' + req.params.id, user, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to users list page
                res.redirect('/artists')
            } else {
                req.flash('success', 'Customer deleted successfully! id = ' + req.params.id)
                // redirect to users list page
                res.redirect('/artists')
            }
        })
   })


module.exports = router;
