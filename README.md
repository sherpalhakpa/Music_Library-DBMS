# Music_Library-DBMS
### A  mySQL database designed to store detailed information about artists, albums, songs, concerts and labels

## An additional API is designed to interact with the Database
## The application will consider the following functionality:
### •CRUD for Concerts and Playlists
### •Show a table of Artists
### •Allow drill down from the Artist, to see its albums
### •Allow drill down from the Album, to see its songs
### •Search for songs and for artists
### •Search for Playlists, show the duration of a playlist
<<<<<<< HEAD
=======

Instruction
----------------------------------------------------------------------
### For MySql Songs Database:
- Go to your MySql Shell from your choice of command line interface.
- You can also use IDEs like Mysql WorkBench or DataGrip
- Go to MySql console and Run the following commands:
  - mysql> source createDB.sql 
  - mysql> source populationDB.sql
  
### For using DataGrip to Import SQL Database
- Go to https://www.jetbrains.com/datagrip/
- Download the program
- If you have issues with set up please use this link:
-https://www.jetbrains.com/help/datagrip/meet-the-product.html
-Login to Datasource by going to Database menu and clicking '+'
-Click Data Source then Click MySql
-Connect to database, make sure to test connection for it to work.
-Add Schema with respectful name 
-Then, right click by new Schema and click Import Data From File
-Find the .sql file that you saved from github (createTable.sql)
-Double click on file and then wait for contents to load
-To populate data, open populationDB.schema
-Copy all contents to clipboard.
-Right click on your schema that contains the createTable.sql
-Click New -> Console
-Paste populationDB.schema contents and press play
-Data will then be imported into database. 

### For CRUD API
- Go to project folder in your choice of command line interface
- Go to the App folder 
  - terminal> cd App
- Download node_modules
  - terminal> npm init
- Run the server 
  - terminal> node app.js
- If you get errors it is possible that you're computer doesn't have plugins follow error message to fix the problem
- Go to your choice of Web Browser to use the API at:
  - http://localhost:3000/


>>>>>>> 349296ea8d0e12f56f38b45c9609813daf6476e3
